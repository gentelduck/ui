import { escapeForRegEx, Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { init, SearchIndex } from 'emoji-mart'
import data from '@emoji-mart/data'
import { cn } from '@/lib'
import localFont from 'next/font/local'
import { TextSelection } from '@tiptap/pm/state'

type SearchEmojiArgs = {
  value: string
}

async function searchEmoji({ value }: SearchEmojiArgs) {
  // Initialize emoji-mart with the provided data
  init({ data })

  // Perform the search using SearchIndex
  const searchResults = await SearchIndex.search(value)
  console.log(searchResults, value)

  // Return the search results
  return searchResults
}

export const EmojiFont = localFont({ src: '../../../assets/fonts/font.ttf' })

const EmojiTooltip = ({ node }: any) => {
  const shortcode = node.attrs.shortcode || ''

  return (
    <NodeViewWrapper className={cn('inline-flex', EmojiFont.className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-lg h-fit leading-none">
            {/* @ts-ignore */}
            <em-emoji shortcodes={shortcode} />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-1">
            <span className="!text-lg leading-none">
              {/* @ts-ignore */}
              <em-emoji shortcodes={shortcode} />
            </span>
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

    // @ts-ignore
    const emojis_native = Object.values(data.emojis).map(emoji => {
      // @ts-ignore
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

  // @ts-ignore
  addKeyboardShortcuts() {
    return {
      Enter: async ({ editor }) => {
        const { state, view } = editor
        const { schema, selection } = state
        const { $from } = selection
        const cursorPos = $from.pos

        // Extract the text before the cursor position
        const lookBehindLength = 10 // Large enough value to cover typical shortcodes
        const startPos = Math.max(cursorPos - lookBehindLength, 0)
        const nodeText = state.doc.textBetween(startPos, cursorPos, ' ')

        // Find the position of the last `:` in the extracted text
        const lastColonIndex = nodeText.lastIndexOf(':')

        // Check if there's a `:` character
        if (lastColonIndex !== -1) {
          // Extract the text after the last `:`
          const shortcodeText = nodeText.substring(lastColonIndex + 1).trim()

          if (shortcodeText) {
            // Search for the emoji
            const searchResults = await searchEmoji({ value: shortcodeText })

            if (searchResults.length > 0) {
              const emoji = searchResults[0].skins[0].native // Get the native emoji
              const emojiShortcode = searchResults[0].skins[0].shortcodes // Get the shortcode

              // Calculate the actual positions in the document
              const shortcodeStart = startPos + lastColonIndex
              const shortcodeEnd = cursorPos

              // Ensure positions are within valid ranges
              if (shortcodeStart >= 0 && shortcodeEnd > shortcodeStart && shortcodeEnd <= state.doc.content.size) {
                // Create a transaction to replace the shortcode with the native emoji
                const tr = state.tr.replaceRangeWith(
                  shortcodeStart,
                  shortcodeEnd,
                  schema.nodes.emoji.create({
                    emoji: emoji,
                    shortcode: emojiShortcode,
                  })
                )

                // Apply the transaction
                view.dispatch(tr)

                // Move the cursor to the end of the emoji node
                const newPos = tr.mapping.map(cursorPos)
                view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, newPos)))

                // Scroll to the new position
                view.someProp('handleScrollToSelection', f => f(view))

                return true // Action completed successfully
              }
            }
          }
        }

        // Default behavior: insert a new paragraph and move the cursor to it
        const paragraph = schema.nodes.paragraph.create()
        const tr = state.tr.insert($from.pos, paragraph)

        // Apply the transaction
        view.dispatch(tr)

        // Move the cursor to the end of the newly created paragraph
        const newPos = $from.pos + paragraph.nodeSize
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, newPos)))

        // Scroll to the new position
        view.someProp('handleScrollToSelection', f => f(view))

        return true // Return true to indicate that the Enter key action has been handled
      },
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

  // @ts-ignore
  addCommands() {
    return {
      insertEmoji:
        (emoji: string, shortcode: string) =>
        // @ts-ignore
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { emoji, shortcode },
          })
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
