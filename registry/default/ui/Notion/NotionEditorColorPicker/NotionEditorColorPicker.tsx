import { cn } from '@/lib'
import { ColorWeelIcon } from '../../mdx-minimal-text-editor'
import { highlightButtons } from '../mdx-editor'
import { NotionEditorButtonPickerWrapper } from '../NotionEditorButtonPickerWrapper'
import { NotionMinimalTextEditorToolbarPick } from '../NotionMinimalTextEditorToolbarPick'
import { ToggleToolTipButtonWrapper } from '../ToggleToolTipButtonWrapper'
import { Button } from '../ui'
import { NotionEditorColorPickerProps } from './NotionEditorColorPicker.types'
import { Separator } from '../..'
import { CircleOff, Pencil } from 'lucide-react'

export const NotionEditorColorPicker = ({ currentColor, activeItem, commands, tip }: NotionEditorColorPickerProps) => {
  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={
          <ToggleToolTipButtonWrapper
            tip={tip}
            value={currentColor}
            children={<Pencil />}
          />
        }
        content={
          <div className="notion__minimal__text__editor__toolbar__pick__content__highlight">
            <NotionEditorButtonPickerWrapper
              description="Color"
              title="Color"
              onClick={commands.onChangeColor}
              trigger={<ColorWeelIcon className="opacity-60" />}
            />

            {highlightButtons.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={cn(
                  'notion__minimal__text__editor__toolbar__pick__content__button',
                  item.label === activeItem && 'active'
                )}
                onClick={() => commands.onChangeColor(item.color)}
              >
                <span className={cn('border border-solid', item.style)} />
              </Button>
            ))}
            <Separator
              orientation="vertical"
              className="h-[26px]"
            />
            <Button
              variant="ghost"
              className={cn('notion__minimal__text__editor__toolbar__pick__content__button')}
              onClick={() => commands.onClearColor()}
            >
              <CircleOff className="opacity-60" />
            </Button>
          </div>
        }
      />
    </>
  )
}
