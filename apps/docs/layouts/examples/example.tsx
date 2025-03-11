<<<<<<< HEAD
'use client'

import * as React from 'react'
import { Index } from '~/__ui_registry__'

import { cn } from '@duck/libs/cn'
import { useConfig } from '~/hooks/use-config'
import { Icons } from '~/components/icons'

interface ThemeComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: 'center' | 'start' | 'end'
}

export function ThemeComponent({ name, ...props }: ThemeComponentProps) {
  const [config] = useConfig()

  const Preview = React.useMemo(() => {
    //@ts-ignore
    const Component = Index[config.style][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{' '}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{' '}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, config.style])

  return (
    <div className={cn('relative')} {...props}>
      <React.Suspense
        fallback={
          <div className="flex items-center text-sm text-muted-foreground">
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </div>
        }
      >
        {Preview}
      </React.Suspense>
    </div>
  )
=======
export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const filteredObject = <T extends Record<string, any>>(
  keys: string[],
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key)),
  ) as Partial<T>
}

export function groupDataByNumbers<T>(
  strings: T[],
  groupSizes: number[],
): T[][] {
  const result: T[][] = []
  let index = 0

  for (const size of groupSizes) {
    const group = strings.slice(index, index + size)
    result.push(group)
    index += size
  }

  return result
}

export function groupArrays<T>(numbers: number[], arr: T[]): T[][] {
  const result: T[][] = []
  let index = 0

  for (const num of numbers) {
    const headerGroup = arr.slice(index, index + num)
    result.push(headerGroup)
    index += num
  }

  return result
>>>>>>> main
}
