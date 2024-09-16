'use client'
import React from 'react'

import { Editor, EditorContent, mergeAttributes, useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
// import Mention from '@tiptap/extension-mention'
// import Ai from '@tiptap-pro/extension-ai'
import { Mention, CustomSuggestion } from './mdx-mention'

import data from '@emoji-mart/data'
import { useDebounceCallback } from '@/hooks'
import { cn } from '@/lib'
import { ScrollArea } from './scroll-area'
import { EmojiFont, EmojiReplacer } from './mdx-emoji'
import { init, SearchIndex } from 'emoji-mart'
import { SpaceNode } from './space-node'
import { z } from 'zod'
import { Separator } from './ShadcnUI'
import { Command, CommandGroup, CommandItem, CommandList } from './command'
import { MDXTextEditorToolbar } from './mdx-toolbar'
import { count } from 'console'

const emojiShortcodeSchema = z
  .string()
  .min(2)
  .regex(/^[a-zA-Z0-9_]+$/)

interface SearchEmojiArgs {
  value: string
  setData: React.Dispatch<React.SetStateAction<DataState>>
}

type DataState = { data: Emoji[]; q: string }

interface Emoji {
  id: string
  skins: Skin[]
}

interface Skin {
  unified: string
  native: string
  shortcodes: string
}

// Mocked search function for demo purposes
async function searchEmoji({ value, setData }: SearchEmojiArgs) {
  init({ data })
  const searchResults = await SearchIndex.search(value ?? '')
  setData({ data: searchResults || [], q: value })
}

export type MDXMinimalTextEditorProps = {
  valid: boolean
  name: string
  className?: string
  content?: string
  type?: string
  //FIX: TYPE ANY
  setEditorContent?: React.Dispatch<React.SetStateAction<any>>
  editorContentRef?: React.MutableRefObject<string>
  editorFocus?: boolean
  onChange?: (html: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  cb?: (editor: Editor) => void
}

export const MDXMinimalTextEditor = ({
  valid,
  name,
  className,
  content,
  type,
  editorContentRef,
  setEditorContent,
  editorFocus,
  onKeyDown,
  onChange,
  cb,
}: MDXMinimalTextEditorProps) => {
  const [data, setData] = React.useState<DataState>({ data: [], q: '' })
  const [inputValue, setInputValue] = React.useState<string>('')

  const editor = useEditor(
    {
      extensions: [
        TextStyle,
        Color.configure({
          types: ['textStyle'],
        }),
        Highlight.configure({ multicolor: true }),
        StarterKit.configure({}),
        Link.configure({
          openOnClick: true,
          autolink: true,
        }),
        Underline,
        FontFamily,
        ListKeymap,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder: 'Type something...',
        }),
        Image,
        SpaceNode,
        EmojiReplacer.configure({
          shouldUseExtraLookupSpace: false,
          shouldUseExtraReplacementSpace: false,
        }),
        Mention.configure({
          HTMLAttributes: {
            class: 'mention',
          },
          suggestion: {
            ...CustomSuggestion,
            items: ({ query }) => {
              return [
                'duckasdf asdf',
                'Lea Thompson',
                'Cory House',
                'Marisa Solace',
                'Huck Finn',
                'Bugs Bunny',
                'LeBron James',
                'Kobe Bryant',
                'Michael Jordan',
                'Cyndi Lauper',
                'Tom Cruise',
                'Madonna',
                // more items...
              ]
                .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
                .slice(0, 5)
            },
          },
        }),
      ],
      content: `
    <p>Hi everyone! Don’t forget the daily stand up at 8 AM.</p>
        <p><span data-type="mention" data-id="Jennifer Grey"></span> Would you mind to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.
        <p><span data-type="mention" data-id="Winona Ryder"></span> <span data-type="mention" data-id="Axl Rose"></span> Let’s go through your most important points quickly.</p>
        <p>I have a meeting with <span data-type="mention" data-id="Christina Applegate"></span> and don’t want to come late.</p>
        <p>– Thanks, your big boss</p>
`,
      editorProps: {
        attributes: {
          autocomplete: 'on',
          autocorrect: 'on',
          autocapitalize: 'on',
          class: cn(!valid && 'opacity-50 pointer-events-none', className),
        },
      },
    },
    [valid, name]
  )

  const updateEditorContent = useDebounceCallback((html: string) => {
    return setEditorContent && setEditorContent(html)
  }, 300)

  React.useEffect(() => {
    if (editor && content === '') {
      editor.commands.clearContent()
    }
  }, [content])

  React.useEffect(() => {
    if (editor) {
      editor.commands.focus()
    }
  }, [editorFocus])

  React.useEffect(() => {
    if (editor) {
      editor.on('update', ({ editor }) => {
        const text = editor.getText()
        const html = editor.getHTML()
        editorContentRef && (editorContentRef.current = html)
        handleInputChange(text)
        updateEditorContent(html)
      })
    }
  }, [editor, type, updateEditorContent])

  const handleInputChange = useDebounceCallback(async (value: string) => {
    setInputValue(value)

    if (value.trim() === '') {
      setData({ data: [], q: '' })
      return
    }

    const match = value.match(/(?:\s|^):([a-zA-Z0-9_]{2,})$/)
    if (match) {
      const shortcode = match[1]
      if (emojiShortcodeSchema.safeParse(shortcode).success) {
        await searchEmoji({ value: shortcode, setData })
      }
    } else {
      setData({ data: [], q: '' })
    }
  }, 300)

  const handleEmojiClick = React.useCallback(
    (emoji: Emoji) => {
      const regex = /:[a-zA-Z0-9_]+$/
      const newValue = inputValue.replace(regex, emoji.skins[0].native)
      if (editor) {
        // @ts-ignore
        editor.chain().focus().insertEmoji(emoji.skins[0].native, emoji.skins[0].shortcodes).run()
      }
      setInputValue(newValue)
      setData({ data: [], q: '' })
    },
    [editor, inputValue, editor, data]
  )

  if (!editor) {
    return null
  }

  return (
    <>
      <MDXTextEditorToolbar editor={editor} />
      <ScrollArea
        className={cn(
          'mdx__minimal__text__editor max-h-[4.5rem] rounded-sm text-[0.7rem] py-[5px] px-2 overflow-x-hidden overflow-y-scroll',
          valid && 'disabled'
        )}
      >
        {data?.data.length > 0 && (
          <Command className="fixed bottom-[50px] left-0 right-0 w-[221px] h-auto">
            <div className="text-sm font-medium px-3 pt-2 pb-1">
              EMOJI MATCHING <span className="text-sky-500">:{data.q}</span>
            </div>
            <Separator />
            <CommandList>
              <CommandGroup>
                {data?.data.map(emoji => (
                  <CommandItem
                    key={emoji.id}
                    value={emoji.skins[0].native}
                    onSelect={_ => {
                      handleEmojiClick(emoji)
                    }}
                    className="flex items-center justify-start gap-1"
                  >
                    <span className={cn('text-xl', EmojiFont.className)}>{emoji.skins[0].native}</span>
                    <span className="text-muted-foreground">{emoji.skins[0].shortcodes}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}

        <EditorContent editor={editor} />
      </ScrollArea>
    </>
  )
}
