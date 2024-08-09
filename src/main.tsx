import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { ThemeProvider, Toaster, TooltipProvider } from './ui/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <TooltipProvider delayDuration={0}>
        <Toaster />
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
