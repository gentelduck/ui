import { useTextmenuCommands, useTextmenuStates } from '@/hooks'

export type NotionEditorAlignPickerProps = {
  states: ReturnType<typeof useTextmenuStates>
  commands: ReturnType<typeof useTextmenuCommands>
  tip: string
}
