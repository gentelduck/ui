import ReactDOM from 'react-dom/client'
import './global.css'
import { TooltipButton, TooltipProvider } from '@/ui'
import { Icon } from './assets/svgs'
import React from 'react'

export const App = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="h-screen grid place-content-center">
      <TooltipProvider>
        <TooltipButton
          button={{
            title: 'Idnbox',
            label: '12',
            icon: Icon.inbox,
            onClick: () => {
              setOpen(!open)
            },
          }}
          isCollapsed={open}
        />
      </TooltipProvider>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
