import * as React from 'react'

import { type ColorPalette } from '~/lib/colors'
import { Color } from '~/components/color'
import {
  ColorFormatSelector,
  ColorFormatSelectorSkeleton,
} from '~/components/color-format-selector'

export function ColorPalette({ colorPalette }: { colorPalette: ColorPalette }) {
  return (
    <div
      id={colorPalette.name}
      className='rounded-lg shadow-sm ring-1 ring-border'
    >
      <div className='flex items-center p-2 pb-0'>
        <div className='flex-1 pl-1 text-sm font-medium'>
          <h2 className='capitalize'>{colorPalette.name}</h2>
        </div>
        <React.Suspense fallback={<ColorFormatSelectorSkeleton />}>
          <ColorFormatSelector
            color={
              colorPalette.colors[0] ?? {
                className: '',
                id: '',
                name: '',
                scale: 0,
                hex: '',
                rgb: '',
                hsl: '',
                foreground: '',
              }
            }
            className='ml-auto'
          />
        </React.Suspense>
      </div>
      <div className='flex flex-col gap-1 p-2 sm:flex-row sm:gap-2'>
        {colorPalette.colors.map((color) => (
          <Color key={color.hex} color={color} />
        ))}
      </div>
    </div>
  )
}
      className={cn(
        'flex items-center max-w-[600px] lg:max-w-none hide-scroll',
        className,
      )}
      {...props}
    >
      {links.map((example, index) => (
        <Link
          href={example.href}
          key={example.href}
          className={cn(
            'flex h-7 shrink-0 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
            pathname?.startsWith(example.href) ||
              (index === 0 && pathname === '/')
              ? 'bg-muted font-medium text-primary'
              : 'text-muted-foreground',
          )}
        >
          {example.name}
        </Link>
      ))}
    </div>
  )
}
