import { escapeForRegEx, mergeAttributes, Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { init } from 'emoji-mart'
import data from '@emoji-mart/data'
import { cn } from '@/lib'
import localFont from 'next/font/local'

export const EmojiFont = localFont({ src: '../../../assets/fonts/font.ttf' })
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
  atom: true,

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
    return ['span', { ...HTMLAttributes, 'data-emoji': HTMLAttributes.emoji }]
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
      const basePattern = this.options.shouldUseExtraLookupSpace
        ? `${lookupSpace}${escapeForRegEx(inputRule.find.trim())}`
        : `${escapeForRegEx(inputRule.find.trim())}${lookupSpace}`

      return {
        find: new RegExp(`${basePattern}$`),
        handler: ({ state, range }: any) => {
          const { tr } = state
          const emoji = inputRule.replace.trim()

          tr.replaceWith(
            range.from,
            range.to,
            this.type.create({
              emoji: emoji,
              shortcode: inputRule.find.trim(),
            })
          )

          const newPos = tr.selection.from
          if (replacementSpace && newPos <= tr.doc.content.size) {
            const spaceTextNode = state.schema.text(replacementSpace)
            if (this.options.shouldUseExtraReplacementSpace) {
              tr.insert(newPos, spaceTextNode)
            } else {
              tr.insert(newPos - 1, spaceTextNode)
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

        if (nodeBefore?.type.name === 'text' && nodeBefore.text === ' ') {
          const pos = $from.pos - nodeBefore.nodeSize
          const tr = state.tr.delete(pos, $from.pos)

          view.dispatch(tr)

          return true
        }

        if (nodeBefore?.type.name === 'emojiReplacer') {
          const pos = $from.pos - nodeBefore.nodeSize
          const tr = state.tr.delete(pos, $from.pos)

          if (this.options.shouldUseExtraReplacementSpace) {
            const spaceTextNode = state.schema.text(' ')
            if (this.options.shouldUseExtraReplacementSpace) {
              tr.insert($from.pos - nodeBefore.nodeSize, spaceTextNode)
            } else {
              tr.insert($from.pos, spaceTextNode)
            }
          }

          view.dispatch(tr)

          return true
        }

        return false
      },
    }
  },

  // New method to allow external emoji insertion
  insertEmoji(editor: any, emoji: string, shortcode: string) {
    const { state, view } = editor
    const { tr } = state
    tr.replaceSelectionWith(
      this.type.create({
        emoji,
        shortcode,
      })
    )
    view.dispatch(tr)
  },
})
