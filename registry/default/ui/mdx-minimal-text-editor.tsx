'use client'
import React from 'react'

import { EditorContent, useEditor } from '@tiptap/react'
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
// import Ai from '@tiptap-pro/extension-ai'

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
  onChange?: (html: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const MDXMinimalTextEditor = ({
  valid,
  name,
  className,
  content,
  type,
  editorContentRef,
  setEditorContent,
  onKeyDown,
  onChange,
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
          placeholder: `Reply to ${name}....`,
        }),
        Image,
        SpaceNode,
        EmojiReplacer.configure({
          shouldUseExtraLookupSpace: false,
          shouldUseExtraReplacementSpace: false,
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'on',
          autocorrect: 'on',
          autocapitalize: 'on',
          class: cn(!valid && 'opacity-50 pointer-events-none', className),
        },
      },
      content,
      autofocus: true,
      onUpdate: ({ editor }) => {
        const text = editor.getText()
        handleInputChange(text)
      },
    },
    [valid, name]
  )

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
