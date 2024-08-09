import type { Meta, StoryObj } from '@storybook/react'
import { TooltipButton } from '../TooltipButton'
import { TooltipProvider } from '@/ui/ShadcnUI'
import '../../../../global.css'
import { Icon } from '@/assets/svgs'

const meta: Meta<typeof TooltipButton> = {
  title: 'Components/TooltipButton',
  component: TooltipButton,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isCollapsed: {
      control: 'boolean',
      description: 'Toggle to collapse the button.',
      defaultValue: false,
    },
    button: {
      control: 'object',
      description: 'Object containing the title, label, and icon for the button.',
    },
  },
}

export default meta

type Story = StoryObj<typeof TooltipButton>

export const Default: Story = {
  args: {
    isCollapsed: false,
    button: {
      title: 'Button',
      label: '12',
      icon: Icon.inbox,
    },
  },
}
