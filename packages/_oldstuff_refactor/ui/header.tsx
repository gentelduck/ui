// // export * from './shadcn'
// export * from './nav-group'
// export * from './header'
// export * from './command'
// export * from './combobox'
// // export * from './badge'
// export * from './swapy'
//
// export * from './select-switcher'
// export * from './checkbox'
// export * from './context-menu'
// export * from './input'
// export * from './scroll-area'
// export * from './pagination'
// export * from './avatar'
// export * from './image'
// export * from './hover-card'
// export * from './mdx-minimal-text-editor'
//
// // export * from './ShadcnUI'
// type FooterType = {
//   buttons: React.ReactNode[]
// }
//
// const Header = <T extends boolean>({
//   nav,
//   header,
//   logo,
//   footer,
// }: HeaderProps<T>) => {
//   const { className, position, ...props } = header
//   const navIsCollabsed = (header as NavCollabsedType).isCollabsed || false
//   const filteredKeys = filteredObject(['isCollabsed'], header)
//
//   return (
//     <header
//       {...filteredKeys}
//       className={cn(
//         'py-2 flex',
//         position === 'side'
//           ? 'flex-col h-full'
//           : position === 'top'
//             ? 'items-center'
//             : '',
//         className,
//       )}
//       {...props}
//     >
//       {logo && logo}
//       {position === 'side' && <Separator className="my-1" />}
//       <NavGroup<T>
//         position={position}
//         nav={{ ...nav.nav, isCollabsed: navIsCollabsed } as NavType<true>}
//         navigationKeys={nav.navigationKeys}
//       />
//
//       {position === 'side' && <Separator className="my-1" />}
//       <div>
//         {footer &&
//           footer.buttons.map((button, idx) => (
//             <React.Fragment key={idx}>{button}</React.Fragment>
//           ))}{' '}
//       </div>
//     </header>
//   )
// }
//
// Header.displayName = 'Header'
//
// export { Header, type HeaderProps, type HeaderType, type FooterType }
