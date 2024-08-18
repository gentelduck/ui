// 'use client'
//
// export type HeaderProps<T extends boolean> = {
//   header: HeaderType
//   nav: NavGroupProps<T>
//   switcher?: SwitcherType
//   footer?: FooterType
// }
//
// export interface HeaderType extends React.HtmlHTMLAttributes<HTMLDivElement> {
//   isCollabsed?: boolean
// }
//
// export type NavType = {
//   isCollabsed?: boolean
//   router: UseNavigateResult<string>
//   location: ParsedLocation<{}>
//   navigationKeys: DuckButtonProps[]
// }
//
// export type SwitcherType = {
//   accounts: AccountType[]
// }
//
// export type FooterType = {
//   buttons: React.ReactNode[]
// }
//
// export const DuckHeader = <T extends boolean>({ nav, header, switcher, footer }: HeaderProps<T>) => {
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
