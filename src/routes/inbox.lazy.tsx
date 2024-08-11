import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/inbox')({
  component: () => <>Inbox</>,
})
