import { useTextmenuCommands } from '@/hooks'

export type NotionEditorColorPickerProps = {
  activeItem: string
  currentColor: boolean
  tip: string
  commands: ReturnType<typeof useTextmenuCommands>
}
