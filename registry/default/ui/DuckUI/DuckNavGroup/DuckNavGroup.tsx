// 'use client'
// import { DuckButton, DuckButtonProps } from ''
// import { cn, filteredObject } from '@/lib'
// import { DuckNavGroupProps, NavCollabsedType } from './DuckNavGroup.types'
// import React from 'react'
//
// export const DuckNavGroup = <T extends boolean>({ navigationKeys, nav }: DuckNavGroupProps<T>) => {
//   const grouped = generateHeaderArrays<DuckButtonProps>(nav.group, navigationKeys)
//   const navIsCollabsed = (nav as NavCollabsedType).isCollabsed
//   const filteredKeys = filteredObject(['group', 'router', 'location', 'isCollabsed'], nav)
//
//   const variants = {
//     default: 'grid items-center',
//   }
//
//   return (
//     <div
//       className={cn('w-fit h-full', nav.className)}
//       {...filteredKeys}
//     >
//       {
//         <div className={variants.default}>
//           {grouped.map((keyGroup, idx) => (
//             <React.Fragment key={idx}>
//               <ul className={cn(variants.default, 'px-2 py-1')}>
//                 {keyGroup.map((key, idx) => (
//                   <li key={idx}>
//                     <DuckButton
//                       isCollapsed={navIsCollabsed ? navIsCollabsed : false}
//                       button={{
//                         ...key.button,
//                         className: cn(
//                           nav.pathname === key.button.route &&
//                             'bg-primary text-white hover:bg-primary/90 hover:text-white h-10',
//                           key.button.className,
//                         ),
//                         onClick: () => nav.router.push(key.button.route || ''),
//                       }}
//                       command={key.command}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </React.Fragment>
//           ))}
//         </div>
//       }
//     </div>
//   )
// }
//
// function generateHeaderArrays<T>(numbers: number[], headers: T[]): T[][] {
//   const result: T[][] = []
//   let index = 0
//
//   for (const num of numbers) {
//     const headerGroup = headers.slice(index, index + num)
//     result.push(headerGroup)
//     index += num
//   }
//
//   return result
// }
