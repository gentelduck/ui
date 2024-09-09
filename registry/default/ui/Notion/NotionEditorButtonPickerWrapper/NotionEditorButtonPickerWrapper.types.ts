import { ReactElement } from 'react'

export type NotionEditorButtonPickerWrapperProps = {
  trigger: ReactElement
  onClick: (color: string) => boolean
  title: string
  description: string
}
