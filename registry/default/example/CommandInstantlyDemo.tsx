import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/registry/default/ui'

export default function App() {
  return (
    <TooltipProvider
      delayDuration={800}
      skipDelayDuration={500}
    >
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>Hover me too</TooltipTrigger>
        <TooltipContent>Another Tooltip Content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
