import { Popover, PopoverContent, PopoverTrigger } from '../..'
import { NotionMinimalTextEditorToolbarPickProps } from './NotionMinimalTextEditorToolbarPick.types'

export const NotionMinimalTextEditorToolbarPick = ({ trigger, content }: NotionMinimalTextEditorToolbarPickProps) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="notion__minimal__text__editor__toolbar__pick__trigger"
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="notion__minimal__text__editor__toolbar__pick__content"
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}
