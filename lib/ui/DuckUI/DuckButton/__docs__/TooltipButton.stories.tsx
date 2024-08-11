// import type { Meta, StoryObj } from '@storybook/react'
// import { DuckButton } from '../DuckButton'
// import { TooltipProvider } from '@/ui/ShadcnUI'
// import '../../../../global.css'
// import { Icon } from '@/assets'
//
// const meta: Meta<typeof DuckButton> = {
//   title: 'Components/TooltipButton',
//   component: DuckButton,
//   decorators: [
//     (Story) => (
//       <TooltipProvider>
//         <Story />
//       </TooltipProvider>
//     ),
//   ],
//   parameters: {
//     layout: 'centered',
//   },
//   argTypes: {
//     isCollapsed: {
//       control: 'boolean',
//       description: 'Toggle to collapse the button.',
//       defaultValue: false,
//     },
//     button: {
//       control: 'object',
//       description: 'Object containing the title, label, and icon for the button.',
//     },
//   },
// }
//
// export default meta
//
// type Story = StoryObj<typeof DuckButton>
//
// export const Default: Story = {
//   args: {
//     isCollapsed: false,
//     button: {
//       title: 'Button',
//       label: '12',
//       icon: Icon.inbox,
//     },
//   },
// }
