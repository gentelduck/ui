import React, { useState, useCallback, useEffect } from 'react'
import { init, SearchIndex } from 'emoji-mart'
import data from '@emoji-mart/data'
import { z } from 'zod'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { Separator } from './ShadcnUI'
import { cn } from '@/lib'
import { ScrollArea } from './scroll-area'

const emojiShortcodeSchema = z
  .string()
  .min(2)
  .regex(/^[a-zA-Z0-9_]+$/)

interface Emoji {
  id: string
  skins: { unified: string; native: string; shortcodes: string }[]
}

interface DataState {
  data: Emoji[]
  q: string
}

async function searchEmoji(value: string): Promise<DataState> {
  init({ data })
  const searchResults = await SearchIndex.search(value ?? '')
  return { data: searchResults || [], q: value }
}

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  inputValue: string
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, inputValue }) => {
  const [emojiData, setEmojiData] = useState<DataState>({ data: [], q: '' })
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const handleInputChange = useCallback(async (value: string) => {
    const match = value.match(/(?:\s|^):([a-zA-Z0-9_]{2,})$/)
    if (match) {
      const shortcode = match[1]
      if (emojiShortcodeSchema.safeParse(shortcode).success) {
        const result = await searchEmoji(shortcode)
        setEmojiData(result)
        setSelectedIndex(0)
      }
    } else {
      setEmojiData({ data: [], q: '' })
    }
  }, [])

  useEffect(() => {
    handleInputChange(inputValue)
  }, [inputValue, handleInputChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (emojiData.data.length > 0) {
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : emojiData.data.length - 1))
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => (prev < emojiData.data.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          const selectedEmoji = emojiData.data[selectedIndex]
          if (selectedEmoji) {
            onEmojiSelect(selectedEmoji.skins[0].native)
          }
        }
      }
    },
    [emojiData, selectedIndex, onEmojiSelect]
  )

  const handleEmojiClick = useCallback(
    (emoji: Emoji) => {
      onEmojiSelect(emoji.skins[0].native)
    },
    [onEmojiSelect]
  )

  if (emojiData.data.length === 0) {
    return null
  }

  return (
    <Tooltip open={true}>
      <TooltipTrigger className="sr-only" />
      <TooltipContent
        className="w-fit py-2 pr-2"
        side="top"
        align="center"
      >
        <div className="flex items-start justify-start gap-1 bg-background rounded-md flex-col">
          <div className="text-sm font-medium">
            EMOJI MATCHING <span className="text-sky-500">:{emojiData.q}</span>
          </div>
          <Separator />
          <ScrollArea className="h-[200px] w-full">
            <div className="flex flex-col gap-2 pr-1">
              {emojiData.data.map((emoji, index) => (
                <div
                  key={emoji.id}
                  className={cn(
                    'flex justify-start gap-2 whitespace-nowrap cursor-pointer p-1 hover:bg-foreground/10 rounded-md',
                    selectedIndex === index ? 'bg-foreground/15 text-white' : ''
                  )}
                  onClick={() => handleEmojiClick(emoji)}
                >
                  <span className="text-xl">{emoji.skins[0].native}</span>
                  <span className="text-muted-foreground">{emoji.skins[0].shortcodes}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
