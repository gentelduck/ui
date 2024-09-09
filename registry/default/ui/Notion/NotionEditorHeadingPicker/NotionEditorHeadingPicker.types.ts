import { useTextmenuCommands } from '@/hooks'
import { ReactElement } from 'react'

export type NotionEditorHeadingPickerWrapperProps = {
  commands: ReturnType<typeof useTextmenuCommands>
  activeItem: string
  trigger: ReactElement
}
