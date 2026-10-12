'use client'

import { cn } from '@gentleduck/libs/cn'
import type { IDirection } from '@gentleduck/primitives/direction'
import { useDirection } from '@gentleduck/primitives/direction'
import * as React from 'react'
import { toDirection } from '../direction/direction.libs'

export interface ITabsContextProps {
  activeItem: string
  dir: IDirection.Kind
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
  tabsId: string
}

const TabsContext = React.createContext<ITabsContextProps | null>(null)

export function useTabs() {
  const context = React.useContext(TabsContext)
  if (context === null) {
    throw new Error('useTabs must be used within a TabsList')
  }
  return context
}

export interface ITabsProps extends Omit<React.HTMLProps<HTMLDivElement>, 'defaultValue' | 'ref'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, ITabsProps>(
  ({ value, defaultValue, onValueChange, dir, ...props }, ref) => {
    const direction = useDirection(toDirection(dir))
    const [activeItem, setActiveItem] = React.useState<string>(defaultValue ?? value ?? '')
    const tabsId = React.useId()

    React.useEffect(() => {
      if (onValueChange) onValueChange(activeItem)
    }, [activeItem, onValueChange])

    return (
      <TabsContext.Provider value={{ activeItem, dir: direction, setActiveItem, tabsId }}>
        <div {...props} data-slot="tabs" dir={direction} ref={ref} />
      </TabsContext.Provider>
    )
  },
)
Tabs.displayName = 'Tabs'

/** Index of the tab an arrow/Home/End key moves to; arrows follow the visual order, so they swap in RTL. */
export function getTabsKeyTarget(key: string, index: number, count: number, dir: IDirection.Kind): number | null {
  const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
  const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft'
  if (key === forward) return (index + 1) % count
  if (key === backward) return (index - 1 + count) % count
  if (key === 'Home') return 0
  if (key === 'End') return count - 1
  return null
}

/** Roving focus for a tablist: moves focus to the next enabled tab and selects it. */
export function useTabsListKeyDown(onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>) {
  const context = React.useContext(TabsContext)
  return (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented || !context) return
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not(:disabled):not([aria-disabled="true"])'),
    )
    const index = tabs.indexOf(event.target as HTMLElement)
    if (index === -1) return
    const target = getTabsKeyTarget(event.key, index, tabs.length, context.dir)
    const tab = target === null ? undefined : tabs[target]
    if (!tab?.dataset.value) return
    event.preventDefault()
    tab.focus()
    context.setActiveItem(tab.dataset.value)
  }
}

export interface ITabsListProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'role'> {}

const TabsList = React.forwardRef<HTMLDivElement, ITabsListProps>(({ className, onKeyDown, ...props }, ref) => {
  const handleKeyDown = useTabsListKeyDown(onKeyDown)
  return (
    <div
      className={cn(
        'inline-flex w-fit items-center justify-center gap-2 rounded-md bg-muted p-1 text-muted-foreground',
        className,
      )}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
      {...props}
      data-slot="tabs-list"
    />
  )
})
TabsList.displayName = 'TabsList'

export interface ITabsTriggerProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'value'> {
  value: string
  defaultChecked?: boolean
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, ITabsTriggerProps>(
  ({ className, children, defaultChecked, onClick, value, disabled, ...props }, ref) => {
    const { setActiveItem, activeItem, tabsId } = useTabs()
    const isActive = value === activeItem

    React.useEffect(() => {
      if (defaultChecked) setActiveItem(value)
    }, [defaultChecked, setActiveItem, value])

    return (
      <button
        aria-controls={`${tabsId}-content-${value}`}
        aria-selected={isActive}
        className={cn(
          'relative inline-flex h-[29.04px] select-none items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 font-medium text-sm ring-offset-background transition-[color,background-color,border-color,box-shadow] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isActive && 'bg-background text-foreground shadow-sm',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        data-value={value}
        disabled={disabled}
        id={`${tabsId}-trigger-${value}`}
        onClick={(e) => {
          setActiveItem(value)
          onClick?.(e as React.MouseEvent<HTMLButtonElement>)
        }}
        ref={ref}
        role="tab"
        tabIndex={isActive ? 0 : -1}
        {...props}
        type="button"
        data-slot="tabs-trigger">
        {children}
      </button>
    )
  },
)
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLProps<HTMLDivElement>, 'ref'> & {
    value: string
    /** Keep the panel mounted from the start, even before its tab is opened. */
    forceMount?: boolean
    /** Mount the panel the first time its tab opens, then keep it mounted so its state survives tab switches. */
    renderOnce?: boolean
  }
>(({ children, forceMount = false, renderOnce = false, className, value, ...props }, ref) => {
  const { activeItem, tabsId } = useTabs()
  const localRef = React.useRef<HTMLDivElement>(null)
  const isActive = activeItem === value
  const [hasOpened, setHasOpened] = React.useState(isActive)
  if (isActive && !hasOpened) setHasOpened(true)
  const shouldRender = forceMount || isActive || (renderOnce && hasOpened)

  return (
    <div
      aria-labelledby={`${tabsId}-trigger-${value}`}
      className={cn(
        'mt-2 shrink-0 list-none ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive ? 'opacity-100' : 'hidden opacity-0',
        className,
      )}
      data-value={value}
      aria-hidden={!isActive}
      id={`${tabsId}-content-${value}`}
      ref={(node) => {
        ;(localRef as React.RefObject<HTMLDivElement | null>).current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      role="tabpanel"
      tabIndex={-1}
      {...props}
      data-slot="tabs-content">
      {shouldRender && children}
    </div>
  )
})
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsContent, TabsContext, TabsList, TabsTrigger }
