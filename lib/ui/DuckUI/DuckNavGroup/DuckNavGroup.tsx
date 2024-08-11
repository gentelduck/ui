import { DuckButton, DuckButtonProps } from '../DuckButton'
import { cn, filteredObject } from '@/utils'
import { DuckNavGroupProps, NavCollabsedType } from './DuckNavGroup.types'
import { Separator } from '@/ui/ShadcnUI'
import React from 'react'

export const DuckNavGroup = <T extends boolean>({ navigationKeys, nav }: DuckNavGroupProps<T>) => {
  const grouped = generateHeaderArrays<DuckButtonProps>(nav.group, navigationKeys)
  const navIsCollabsed = (nav as NavCollabsedType).isCollabsed
  const filteredKeys = filteredObject(['group', 'router', 'location', 'isCollabsed'], nav)

  const variants = {
    default: 'grid items-center',
  }

  return (
    <div
      className={cn(' w-fit h-full', nav.className)}
      {...filteredKeys}
    >
      <div className={variants.default}>
        {grouped.map((keyGroup, idx) => (
          <React.Fragment key={idx}>
            <ul className={cn(variants.default, 'px-2 py-1')}>
              {keyGroup.map((key, idx) => (
                <li key={idx}>
                  <DuckButton
                    isCollapsed={navIsCollabsed ? navIsCollabsed : false}
                    button={{
                      ...key.button,
                      className: cn(
                        nav.location.href === key.button.route &&
                          'bg-primary text-white hover:bg-primary/90 hover:text-white',
                      ),
                      onClick: () => nav.router({ to: key.button.route }),
                    }}
                    command={key.command}
                  />
                </li>
              ))}
            </ul>
            {idx !== grouped.length - 1 && <Separator className="my-1" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function generateHeaderArrays<T>(numbers: number[], headers: T[]): T[][] {
  const result: T[][] = []
  let index = 0

  for (const num of numbers) {
    const headerGroup = headers.slice(index, index + num)
    result.push(headerGroup)
    index += num
  }

  return result
}
