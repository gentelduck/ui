import { Command, CommandInput, CommandListGroup, CommandShortcut } from '../ui'

import { Archive, CalendarMinus2, Handshake, MessageCircleMore, Settings } from 'lucide-react'

const data = [
  {
    label: 'Archive',
    element: (
      <>
        <Archive className="mr-2 h-4 w-4" />
        <span>Archive</span>
      </>
    ),
  },
  {
    label: 'Schaduling',
    element: (
      <>
        <CalendarMinus2 className="mr-2 h-4 w-4" />
        <span>Schaduling</span>
      </>
    ),
  },
  {
    label: 'Deals',
    element: (
      <>
        <Handshake className="mr-2 h-4 w-4" />
        <span>Deals</span>
      </>
    ),
  },
  {
    label: 'Messages',
    element: (
      <>
        <MessageCircleMore className="mr-2 h-4 w-4" />
        <span>Messages</span>
        <CommandShortcut>⌘M</CommandShortcut>
      </>
    ),
  },
  {
    label: 'Settings',
    element: (
      <>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>⌘T</CommandShortcut>
      </>
    ),
  },
  {
    label: 'Profile',
    element: (
      <>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </>
    ),
  },
]

export default function CommandGroupDemo() {
  return (
    <Command className="rounded-lg border shadow-md w-96">
      <CommandInput placeholder="Type a command or search..." />
      <CommandListGroup
        data={data}
        group={[3, 3]}
        groupheading={['Suggestions', 'Settings']}
        selected={['']}
      />
    </Command>
  )
}
