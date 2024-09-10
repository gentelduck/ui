import { escapeForRegEx, mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { init } from 'emoji-mart'
import data from '@emoji-mart/data'

// EmojiTooltip.js
import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import localFont from 'next/font/local'
import { cn } from '@/lib'

const EmojiFont = localFont({ src: '../../../assets/fonts/font.ttf' })
const EmojiTooltip = ({ node }: any) => {
  const emoji = node.attrs.emoji || ''
  const shortcode = node.attrs.shortcode || ''

  return (
    <NodeViewWrapper className={cn('inline-flex', EmojiFont.className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-lg h-fit leading-none">{emoji}</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-1">
            <p className="!text-lg leading-none">{emoji}</p>
            <p className="text-muted-foreground font-semibold font-mono">{shortcode}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </NodeViewWrapper>
  )
  // <NodeViewContent />
}

type InputRuleOptions = { find: string; replace: string }
export type EmojiReplacerOptions = {
  ruleConfigs: InputRuleOptions[]
  shouldUseExtraLookupSpace: boolean
  shouldUseExtraReplacementSpace: boolean
}

export const EmojiReplacer = Node.create<EmojiReplacerOptions>({
  name: 'emojiReplacer',

  group: 'inline',
  inline: true,
  atom: true, // Atom makes this node indivisible, i.e., acts as one unit in the editor

  addOptions() {
    return {
      ruleConfigs: [],
      shouldUseExtraLookupSpace: false,
      shouldUseExtraReplacementSpace: true,
    }
  },

  addAttributes() {
    return {
      emoji: {
        default: null,
      },
      shortcode: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-emoji]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    // Render HTML attributes, but the actual emoji rendering is handled by the React component
    return [
      'span',
      { ...HTMLAttributes, 'data-emoji': HTMLAttributes.emoji },
      // The actual rendering of the emoji and tooltip is handled in the React component
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmojiTooltip)
  },

  addInputRules() {
    init({ data })

    const emojis_native = Object.values(data.emojis).map(emoji => {
      return { find: emoji.skins[0].shortcodes, replace: emoji.skins[0].native }
    })

    const lookupSpace = this.options.shouldUseExtraLookupSpace ? ' ' : ''
    const replacementSpace = this.options.shouldUseExtraReplacementSpace ? ' ' : ''

    const createRule = (inputRule: InputRuleOptions) => {
      // Adjust to add the lookup space either before or after based on the option
      const basePattern = this.options.shouldUseExtraLookupSpace
        ? `${lookupSpace}${escapeForRegEx(inputRule.find.trim())}`
        : `${escapeForRegEx(inputRule.find.trim())}${lookupSpace}`

      return {
        find: new RegExp(`${basePattern}$`),
        handler: ({ state, range }: any) => {
          const { tr } = state
          const emoji = inputRule.replace.trim()

          // Replace the shortcode with the emoji node
          tr.replaceWith(
            range.from,
            range.to,
            this.type.create({
              emoji: emoji,
              shortcode: inputRule.find.trim(),
            })
          )

          // Insert the replacement space either before or after the emoji node, based on the option
          const newPos = tr.selection.from
          if (replacementSpace && newPos <= tr.doc.content.size) {
            const spaceTextNode = state.schema.text(replacementSpace)
            if (this.options.shouldUseExtraReplacementSpace) {
              tr.insert(newPos, spaceTextNode)
            } else {
              tr.insert(newPos - 1, spaceTextNode) // Insert before the emoji
            }
          }

          return tr
        },
      }
    }

    const rules = [...this.options.ruleConfigs, ...emojis_native].map(createRule)

    return rules
  },

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { state, view } = editor
        const { selection } = state
        const { $from } = selection
        const nodeBefore = $from.nodeBefore

        // Check if the node before the cursor is a space node or emoji node
        if (nodeBefore?.type.name === 'text' && nodeBefore.text === ' ') {
          // Delete the space node
          const pos = $from.pos - nodeBefore.nodeSize
          const tr = state.tr.delete(pos, $from.pos)

          // Apply the transaction
          view.dispatch(tr)

          return true // Indicate that the event was handled
        }

        // If the node before is an emoji node
        if (nodeBefore?.type.name === 'emojiReplacer') {
          const pos = $from.pos - nodeBefore.nodeSize
          const tr = state.tr.delete(pos, $from.pos)

          // Optionally insert the replacement space before or after the emoji
          if (this.options.shouldUseExtraReplacementSpace) {
            const spaceTextNode = state.schema.text(' ')
            if (this.options.shouldUseExtraReplacementSpace) {
              tr.insert($from.pos - nodeBefore.nodeSize, spaceTextNode)
            } else {
              tr.insert($from.pos, spaceTextNode)
            }
          }

          // Apply the transaction
          view.dispatch(tr)

          return true // Indicate that the event was handled
        }

        return false // Let other handlers process the event
      },
    }
  },
})
