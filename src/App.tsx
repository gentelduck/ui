import { Icon } from './assets/svgs'
import { TooltipProvider } from './ui'
import { TooltipButton } from './ui/Duck-UI/TooltipButton'

function App() {
  return (
    <div className="grid place-items-center h-screen">
      <TooltipButton
        delayDuration={0}
        isCollapsed={true}
        button={{ title: 'Inbox', label: '12', icon: Icon.inbox }}
      />
    </div>
  )
}

export default App
