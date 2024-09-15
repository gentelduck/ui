import React from 'react'
import { HexColorPicker } from 'react-colorful'
import {
  Button,
  ColorWeelIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/default/ui/'
import {
  bubbleMenuIconsData,
  emailToolbarEditor,
  emailToolbarEditorAlign,
  highlightButtons,
  useTextmenuCommands,
  useTextmenuContentTypes,
  useTextmenuStates,
} from './Notion/mdx-editor'
import { AlignCenter, CircleOff, Heading, Highlighter, Link2, LucideIcon, Pencil } from 'lucide-react'
import { cn } from '@/lib'
import { Editor } from '@tiptap/core'

export type NotionEditorButtonPickerWrapperProps = {
  trigger: React.ReactElement
  onClick: (color: string) => boolean
  title: string
  description: string
}

export const NotionEditorButtonPickerWrapper = ({
  trigger,
  onClick,
  title,
  description,
}: NotionEditorButtonPickerWrapperProps) => {
  const [color, setColor] = React.useState('#fff')

  const handleChangeComplete = (color: string) => {
    setColor(color)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="editor_button"
        >
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Pick color down to {description} the text with. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full  [&>div]:w-full">
          <HexColorPicker
            color={color}
            onChange={color => handleChangeComplete(color)}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
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
  )
}

export type NotionEditorAlignPickerProps = {
  states: ReturnType<typeof useTextmenuStates>
  commands: ReturnType<typeof useTextmenuCommands>
}

export const NotionEditoerAlignPicker = ({ commands, states }: NotionEditorAlignPickerProps) => {
  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={{
          trigger: AlignCenter,
          label: 'Align',
        }}
        content={
          <div className="notion__minimal__text__editor__toolbar__pick__content__highlight align flex items justify-start gap-1 shrink-0">
            {emailToolbarEditorAlign.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={cn('editor_button p-0', states[item.value] && 'active')}
                label={{
                  children: item.label,
                  showLabel: true,
                  side: 'top',
                }}
                onClick={commands[item.action] as React.MouseEventHandler<HTMLButtonElement>}
              >
                <item.icon />
              </Button>
            ))}
          </div>
        }
      />
    </>
  )
}

export type NotionEditorColorPickerProps = {
  currentColor: string
  commands: ReturnType<typeof useTextmenuCommands>
}
export const NotionEditorColorPicker = ({ currentColor, commands }: NotionEditorColorPickerProps) => {
  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={{
          trigger: Pencil,
          label: 'Color',
        }}
        content={
          <div className="flex items-center justify-start gap-2">
            <NotionEditorButtonPickerWrapper
              description="Highlight"
              title="Highlight"
              onClick={commands.onChangeHighlight}
              trigger={<ColorWeelIcon className="opacity-60 !w-[1.18rem] !h-[1.18rem] " />}
            />

            {highlightButtons.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={cn('editor_button', item.color === currentColor && 'active')}
                onClick={() => commands.onChangeColor(item.color)}
              >
                <span className={cn('border border-solid w-[1.18rem] h-[1.18rem] rounded-full', item.style)} />
              </Button>
            ))}
            <Separator
              orientation="vertical"
              className="h-[26px]"
            />
            <Button
              variant="ghost"
              className={cn('editor_button')}
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

export type NotionEditorHeadingPickerWrapperProps = {
  commands: ReturnType<typeof useTextmenuCommands>
  activeItem: string
  trigger: React.ReactElement
}

export const NotionEditorHeadingPickerWrapper = ({ commands, activeItem }: NotionEditorHeadingPickerWrapperProps) => {
  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={{
          trigger: Heading,
          label: 'Heading',
        }}
        content={
          <>
            <span>Turn into</span>
            <Separator className="mb-1" />
            {emailToolbarEditor.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={cn('editor_button !w-full !px-2 rounded-md', item.label === activeItem && 'active')}
                onClick={commands[item.action] as React.MouseEventHandler<HTMLElement>}
              >
                <item.icon />
                <span>{item.label}</span>
              </Button>
            ))}
          </>
        }
      />
    </>
  )
}

export interface NotionEditorLinkManagerProps {
  states: ReturnType<typeof useTextmenuStates>
  commands: ReturnType<typeof useTextmenuCommands>
  editor: Editor
}

export const NotionEditorLinkManager: React.FC<NotionEditorLinkManagerProps> = ({
  states,
  commands,
  editor,
}: NotionEditorLinkManagerProps) => {
  const [url, setUrl] = React.useState('')

  const openDialog = () => {
    const previousUrl = editor.getAttributes('link').href
    setUrl(previousUrl || '')
  }

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className={cn('editor_button', states.isLink ? 'bg-red-500' : '')}
        onClick={openDialog}
      >
        <ToggleToolTipButtonWrapper
          tip={'Link'}
          children={<Link2 />}
        />
      </DialogTrigger>
      <DialogContent className="flex flex-col center">
        <DialogHeader>
          <DialogTitle>Set Link</DialogTitle>
        </DialogHeader>
        <DialogDescription> Set the link here. Click save when you're done.</DialogDescription>
        <div>
          <Input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                url.length > 0 ? commands.onLink(url, true) : editor.commands.unsetLink()
              }}
            >
              Apply
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export type NotionMinimalTextEditorToolbarPickProps = {
  trigger: {
    label?: string
    trigger?: LucideIcon
    children?: React.ReactElement
  }
  content: React.ReactElement
}

export const NotionMinimalTextEditorToolbarPick = ({ trigger, content }: NotionMinimalTextEditorToolbarPickProps) => {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        asChild
        className={cn('!place-content-center editor_button', open && 'active')}
      >
        {trigger.children ? (
          trigger.children
        ) : (
          <Button
            label={{
              children: trigger.label,
              showLabel: true,
              side: 'top',
              className: cn(open && 'sr-only'),
            }}
            icon={{ children: trigger.trigger }}
            variant="ghost"
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="grid items-center gap-[.2rem] bg-background p-2 rounded-[.5rem] border border-border border-solid text-[.7rem] m-[.3rem] w-fit"
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}

export type MouseEvent = React.MouseEventHandler<HTMLButtonElement>

export interface ToggleToolTipWrapperButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tip?: string
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  side?: 'top' | 'left' | 'right' | 'bottom'
  children?: React.ReactNode
  onClick?: MouseEvent | keyof typeof useTextmenuCommands
  disabled?: boolean
}
export const ToggleToolTipButtonWrapper = React.forwardRef<HTMLButtonElement, ToggleToolTipWrapperButtonProps>(
  ({ variant, className, onMouseUp, onMouseMove, children, onClick, side, tip, disabled }, ref) => {
    const [value, setValue] = React.useState<boolean>(false)

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseDown={() => setValue(!value)}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            <Button
              type="button"
              variant={variant || 'ghost'}
              disabled={disabled}
              className={cn('toggle__tool__tip__trigger', className)}
              ref={ref}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            className="toggle__tool__tip__content"
            side={side || 'top'}
          >
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

ToggleToolTipButtonWrapper.displayName = 'ToggleToolTipButtonWrapper'

export type ToolBarToggleButtonsProps = {
  commands: ReturnType<typeof useTextmenuCommands>
  states: ReturnType<typeof useTextmenuStates>
}
export const ToolBarToggleButtons = ({ commands, states }: ToolBarToggleButtonsProps) => {
  return (
    <>
      <div className="flex items-center justify-start gap-1 shrink-0">
        {bubbleMenuIconsData.map((item, idx) => (
          <ToggleToolTipButtonWrapper
            key={idx}
            tip={item.label}
            className="editor_button"
            value={states[item.value]}
            onClick={commands[item.action] as MouseEvent}
            children={<item.icon />}
          />
        ))}
      </div>
    </>
  )
}
export type NotionMinimalTextEditorToolbarProps = {
  editor: Editor
}

export type NotionMinimalTextEditorToolbarHighlightType = {
  currentHighlight: string
  commands: ReturnType<typeof useTextmenuCommands>
}

export const NotionMinimalTextEditorToolbarHighlight = ({
  currentHighlight,
  commands,
}: NotionMinimalTextEditorToolbarHighlightType) => {
  return (
    <>
      <NotionMinimalTextEditorToolbarPick
        trigger={{
          trigger: Highlighter,
          label: 'Highlight',
        }}
        content={
          <div className="flex items-center justify-start gap-2">
            <NotionEditorButtonPickerWrapper
              description="Highlight"
              title="Highlight"
              onClick={commands.onChangeHighlight}
              trigger={<ColorWeelIcon className="opacity-60 !w-[1.18rem] !h-[1.18rem] " />}
            />

            {highlightButtons.map((item, idx) => (
              <Button
                key={idx}
                variant="ghost"
                className={cn('editor_button', item.color === currentHighlight && 'active')}
                onClick={() => commands.onChangeHighlight(item.color)}
              >
                <span className={cn('border border-solid w-[1.18rem] h-[1.18rem] rounded-full', item.style)} />
              </Button>
            ))}
            <Separator
              orientation="vertical"
              className="h-[26px]"
            />
            <Button
              variant="ghost"
              className={cn('editor_button')}
              onClick={() => commands.onClearHighlight()}
            >
              <CircleOff className="opacity-60" />
            </Button>
          </div>
        }
      />
    </>
  )
}

//NOTE: We memorize the button so each button is not rerendered
// on every editor state change
const ToolBarToggleButtonsMemo = React.memo(ToolBarToggleButtons)
const MDXEditorHeadingPickerMemo = React.memo(NotionEditorHeadingPickerWrapper)
const MDXMinimalTextEditorToolbarHighlightMemo = React.memo(NotionMinimalTextEditorToolbarHighlight)
const MDXEditorColorPickerMemo = React.memo(NotionEditorColorPicker)
const MDXEditorLinkManagerMemo = React.memo(NotionEditorLinkManager)
const MDXEditoerAlignPickerMemo = React.memo(NotionEditoerAlignPicker)

export const NotionMinimalTextEditorToolbar = ({ editor }: NotionMinimalTextEditorToolbarProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  const activeItem = React.useMemo(
    () => blockOptions.find(option => option.type === 'option' && option.isActive()),
    [blockOptions]
  )

  //
  //
  // <BubbleMenu
  //   editor={editor}
  //   tippyOptions={{ duration: 100 }}
  //   className="flex items-center"
  // >
  //         </BubbleMenu>
  //   {
  //     // <MemoContentTypePicker options={blockOptions} />
  //     // <MemoFontFamilyPicker
  //     //   onChange={commands.onSetFont}
  //     //   value={states.currentFont || ''}
  //     // />
  //     // <MemoFontSizePicker
  //     //   onChange={commands.onSetFontSize}
  //     //   value={states.currentSize || ''}
  //     // />
  //   }
  return (
    <div className="flex items-center gap-[.325rem] h-full p-1 border border-border border-solid ronded-[.5rem] bg-background fixed ">
      <MDXEditoerAlignPickerMemo
        commands={commands}
        states={states}
      />
      <MDXEditorHeadingPickerMemo
        trigger={<Heading />}
        activeItem={activeItem?.label || ''}
        commands={commands}
      />
      <Separator
        orientation="vertical"
        className="h-[26px]"
      />
      <ToolBarToggleButtonsMemo
        commands={commands}
        states={states}
      />
      <Separator
        orientation="vertical"
        className="h-[26px]"
      />
      <MDXEditorLinkManagerMemo
        editor={editor}
        commands={commands}
        states={states}
      />
      <MDXMinimalTextEditorToolbarHighlightMemo
        currentHighlight={states.currentHighlight}
        commands={commands}
      />
      <MDXEditorColorPickerMemo
        currentColor={states.currentColor}
        commands={commands}
      />
    </div>
  )
}
