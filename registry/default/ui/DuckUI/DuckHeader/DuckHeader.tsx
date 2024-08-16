// 'use client'
// import { cn, filteredObject } from '@/lib'
// import { DuckNavGroup, NavCollabsedType, NavType } from '../DuckNavGroup'
// import { DuckHeaderProps } from './DuckHeader.types'
// import { DuckSwitcher } from '../DuckSwitcher/DuckSwitcher'
// import { Separator } from '@/registry/default/ui'
// import React from 'react'
//
// export const DuckHeader = <T extends boolean>({ nav, header, switcher, footer }: DuckHeaderProps<T>) => {
//   const navIsCollabsed = (header as NavCollabsedType).isCollabsed || false
//   const filteredKeys = filteredObject(['isCollabsed'], header)
//
//   return (
//     <header
//       {...filteredKeys}
//       className={cn('py-2 flex flex-col h-full', header.className)}
//     >
//       {switcher && (
//         <DuckSwitcher
//           isCollapsed={navIsCollabsed}
//           accounts={switcher.accounts}
//           className="mx-2 mb-2"
//         />
//       )}
//       <Separator className="my-1" />
//       <DuckNavGroup<T>
//         nav={{ ...nav.nav, isCollabsed: navIsCollabsed } as NavType<T | true>}
//         navigationKeys={nav.navigationKeys}
//       />
//       <div>{footer && footer.buttons.map((button, idx) => <React.Fragment key={idx}>{button}</React.Fragment>)} </div>
//     </header>
//   )
// }
