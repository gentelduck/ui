import { AlertDialogDrawer, Button } from '../ui'

export default function AlertDialogDrawerDemo() {
  return (
    <AlertDialogDrawer
      trigger={<Button variant="outline">Open</Button>}
      threads={<div>Threads</div>}
    />
  )
}
