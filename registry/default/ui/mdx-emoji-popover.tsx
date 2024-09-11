import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface PopoverEmojiPickerProps {
  position: { left: number; top: number }
  editor: any
  onClose: () => void
}

const PopoverEmojiPicker: React.FC<PopoverEmojiPickerProps> = ({ position, editor, onClose }) => {
  const handleSelectEmoji = (emoji: any) => {
    editor.commands.insertEmoji(emoji.native, emoji.shortcodes[0])
    onClose()
  }

  return (
    <Popover>
      <PopoverTrigger className="p-2 text-gray-600 bg-gray-200 rounded">Open Emoji Picker</PopoverTrigger>
      <PopoverContent className="bg-white border rounded-lg shadow-lg p-2">
        <div className="relative">
          <Picker
            data={data}
            onSelect={handleSelectEmoji}
            emojiSize={24}
            title="Pick your emoji"
            emoji="point_up"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverEmojiPicker
