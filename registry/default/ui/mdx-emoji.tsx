import { escapeForRegEx, mergeAttributes, Node } from '@tiptap/core'
import { init } from 'emoji-mart'
import data from '@emoji-mart/data'
// import { Tooltip, TooltipTrigger, TooltipContent } from 'your-tooltip-library' // Replace with actual import

type InputRuleOptions = { find: string; replace: string }
export type EmojiReplacerOptions = {
  ruleConfigs: InputRuleOptions[]
  shouldUseExtraLookupSpace: boolean
  shouldUseExtraReplacementSpace: boolean
}

// Define a custom Emoji node to render the emoji inside a tooltip
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
    // Ensure the emoji and shortcode attributes are present
    const emoji = HTMLAttributes.emoji || ''
    const shortcode = HTMLAttributes.shortcode || ''

    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-emoji': emoji, class: 'emoji' }),
      [
        'span',

        { style: 'position: relative;' },
        ['span', { class: 'tooltip-trigger' }, emoji],
        [
          'div',
          { class: 'tooltip' },
          ['div', { class: 'tooltip-content' }, ['p', {}, `${emoji}`], ['p', {}, `${shortcode}`]],
        ],
      ],
    ]
  },

  addInputRules() {
    init({ data })

    const emojis_native = Object.values(data.emojis).map(emoji => {
      return { find: emoji.skins[0].shortcodes, replace: emoji.skins[0].native }
    })

    const lookupSpace = this.options.shouldUseExtraLookupSpace ? ' ' : ''
    const replacementSpace = this.options.shouldUseExtraReplacementSpace ? ' ' : ''

    const createRule = (inputRule: InputRuleOptions) => {
      const basePattern = escapeForRegEx(`${inputRule.find.trim()}${lookupSpace}`)
      return {
        find: new RegExp(`${basePattern}$`),
        handler: ({ state, range }) => {
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

          // Insert a space text node directly after the emoji if needed
          const newPos = tr.selection.from
          if (replacementSpace && newPos <= tr.doc.content.size) {
            const textNode = state.schema.text(' ')
            tr.insert(newPos, textNode)
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

          // Optionally insert a space text node after deleting the emoji
          if (this.options.shouldUseExtraReplacementSpace) {
            const spaceTextNode = state.schema.text(' ')
            tr.insert($from.pos - nodeBefore.nodeSize, spaceTextNode)
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
