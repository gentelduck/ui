import { useTextmenuCommands, useTextmenuStates } from '@/hooks'
import { Editor } from '@tiptap/react'

export interface NotionEditorLinkManagerProps {
  states: ReturnType<typeof useTextmenuStates>
  commands: ReturnType<typeof useTextmenuCommands>
  editor: Editor
}
