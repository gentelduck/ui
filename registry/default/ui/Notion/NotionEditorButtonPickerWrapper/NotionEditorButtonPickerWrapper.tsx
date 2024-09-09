import { HexColorPicker } from 'react-colorful'
import { NotionEditorButtonPickerWrapperProps } from './NotionEditorButtonPickerWrapper.types'
import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../..'
import React from 'react'

export const useDebounce = <T extends (...args: unknown[]) => void>(cb: T, delay = 500) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  ;(function () {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      cb()
    }, delay)
  })()
}

export const NotionEditorButtonPickerWrapper = ({
  trigger,
  onClick,
  title,
  description,
}: NotionEditorButtonPickerWrapperProps) => {
  const [color, setColor] = useState('#fff')

  const handleChangeComplete = (color: string) => {
    setColor(color)
  }

  return (
    <div className="notion__editor__highlight__color__picker">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="notion__editor__highlight__color__picker__trigger"
          >
            {trigger}
          </Button>
        </DialogTrigger>
        <DialogContent className="notion__editor__highlight__color__picker__content">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Pick color down to {description} the text with. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <HexColorPicker
            color={color}
            onChange={() => useDebounce(handleChangeComplete)}
          />
          <div className="notion__editor__highlight__color__picker__content__bottom">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  onClick(color)
                }}
              >
                Apply
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
