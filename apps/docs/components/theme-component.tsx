'use client'

import * as React from 'react'
import { Index } from '~/__ui_registry__'

import { cn } from '@gentleduck/libs/cn'
import { Icons } from '~/components/icons'
import { useConfig } from '~/hooks/use-config'

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
          <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code> not
          found in registry.
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
        }>
        {Preview}
      </React.Suspense>
    </div>
  )
}
