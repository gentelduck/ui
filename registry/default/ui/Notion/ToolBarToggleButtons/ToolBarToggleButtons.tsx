import { MouseEvent, ToggleToolTipButtonWrapper, ToolBarToggleButtonsProps } from '..'
import { bubbleMenuIconsData } from '../mdx-editor'

export const ToolBarToggleButtons = ({ commands, states }: ToolBarToggleButtonsProps) => {
  return (
    <>
      <div className="toolbar__toggle__buttons">
        {bubbleMenuIconsData.map((item, idx) => (
          <ToggleToolTipButtonWrapper
            key={idx}
            tip={item.label}
            value={states[item.value]}
            onClick={commands[item.action] as MouseEvent}
            children={<item.icon />}
          />
        ))}
      </div>
    </>
  )
}
