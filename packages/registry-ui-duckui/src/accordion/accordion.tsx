'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@gentleduck/libs/cn'

const AccordionContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  wrapperRef: React.RefObject<HTMLDivElement | null>
} | null>(null)

function Accordion({
  className,
  children,
  defaultValue,
  ref,
  type = 'single',
  value,
  collapsible = true,
  onValueChange,
  ...props
}: Omit<React.HTMLProps<HTMLDivElement>, 'value'> & {
  collapsible?: boolean
  type?: 'single' | 'multiple'
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const itemsRef = React.useRef<HTMLDetailsElement[]>([])

  React.useEffect(() => {
    itemsRef.current = Array.from(
      wrapperRef.current?.querySelectorAll('[duck-accordion-item]') as never as HTMLDetailsElement[],
    )
  }, [])

  React.useEffect(() => {
    if (defaultValue) {
      onValueChange?.(defaultValue)
    }
    function setOpen(value: boolean, trigger?: HTMLDivElement, content?: HTMLDivElement) {
      trigger?.setAttribute('data-open', String(value))
      content?.setAttribute('data-open', String(value))
    }

    for (let i = 0; i < itemsRef.current.length; i++) {
      const item = itemsRef.current[i] as HTMLDetailsElement
      const content = item.querySelector('[duck-accordion-content]') as HTMLDivElement
      const trigger = item.querySelector('[duck-accordion-trigger]') as HTMLDivElement

      if (item.id === defaultValue) {
        item.open = true
        setOpen(true, trigger, content)
      }

      trigger.addEventListener('click', () => {
        if (type === 'single') {
          for (let i = 0; i < itemsRef.current.length; i++) {
            const _item = itemsRef.current[i] as HTMLDetailsElement
            const content = _item.querySelector('[duck-accordion-content]') as HTMLDivElement
            const trigger = _item.querySelector('[duck-accordion-trigger]') as HTMLDivElement

            if (!collapsible) {
              _item.open = false
              setOpen(false, trigger, content)
            }

            if (_item.id === item.id) {
              _item.open = item.open
              setOpen(!item.open, trigger, content)
            }
          }
        } else {
        }
        if (!collapsible) item.open = false
        setOpen(!item.open, trigger, content)
        onValueChange?.(item.id)
      })
    }
  }, [defaultValue, onValueChange])

  return (
    <AccordionContext.Provider
      value={{
        value,
        onValueChange,
        wrapperRef,
      }}>
      <div className={cn('w-[400px]')} {...props} ref={wrapperRef}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  className,
  ref,
  value,
  ...props
}: React.HTMLProps<HTMLDetailsElement> & {
  value?: string
}) {
  return (
    <details
      ref={ref}
      id={value}
      aria-labelledby={value}
      className={cn('border-b', className)}
      {...props}
      duck-accordion-item=""
    />
  )
}

function AccordionTrigger({
  className,
  children,
  icon,
  value,
  ref,
  ...props
}: React.HTMLProps<HTMLMapElement> & {
  icon?: React.ReactNode
  value?: string
}) {
  return (
    <summary
      id={value}
      aria-controls={value}
      aria-describedby={value}
      ref={ref}
      className={cn(
        'flex items-center justify-between flex-1 py-4 font-medium transition-all hover:underline [&[data-open=true]_svg]:rotate-180 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
      duck-accordion-trigger="">
      {children}
      <span className={cn('[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200')}>
        {icon ? icon : <ChevronDown />}
      </span>
    </summary>
  )
}

const AccordionContent = ({ className, children, ref, ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all',
      'grid overflow-hidden text-sm transition-[grid-template-rows] duration-300 ease-in-out',
      '[data-open=true]:grid-rows-[1fr]',
      '[data-open=false]:grid-rows-[0fr]',
      className,
    )}
    {...props}
    duck-accordion-content="">
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </div>
)

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
