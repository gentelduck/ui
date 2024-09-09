import { useTextmenuCommands, useTextmenuStates } from '@/hooks'

export type ToolBarToggleButtonsProps = {
  commands: ReturnType<typeof useTextmenuCommands>
  states: ReturnType<typeof useTextmenuStates>
}
