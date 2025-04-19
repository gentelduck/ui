// import {
//   Dialog,
//   DialogClose,
//   DialogCloseProps,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
// } from '@radix-ui/react-dialog'
// import { UseDuckAlertReturnType } from '../alert-dialog/alert-dialog.types'
// import { DialogFooter, DialogHeader } from './dialog'
//
// /**
//  * DialogResponsiveProps
//  */
// export interface DialogResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof Dialog> {}
//
// /**
//  * DialogTriggerResponsiveProps
//  */
// export interface DialogTriggerResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogTrigger> {}
//
// /**
//  * DialogContentResponsiveProps
//  */
// export interface DialogContentResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogContent> {}
//
// /**
//  * DialogHeaderResponsiveProps
//  */
// export interface DialogHeaderResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogHeader> {}
//
// /**
//  * DialogFooterResponsiveProps
//  */
// export interface DialogFooterResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogFooter> {}
//
// /**
//  * DialogTitleResponsiveProps
//  */
// export interface DialogTitleResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogTitle> {}
//
// /**
//  * DialogDescriptionResponsiveProps
//  */
// export interface DialogDescriptionResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogDescription> {}
//
// /**
//  * DialogCloseResponsiveProps
//  */
// export interface DialogCloseResponsiveProps
//   extends React.ComponentPropsWithoutRef<typeof DialogClose> {}
//
// /**
//  * DialogWrapper Props
//  */
// export interface DialogWrapperProps extends DialogResponsiveProps {
//   trigger?: DialogTriggerResponsiveProps
//   content: DialogContentResponsiveProps & {
//     _header?: DialogHeaderResponsiveProps & {
//       _title?: DialogTitleResponsiveProps
//       _description?: DialogDescriptionResponsiveProps
//     }
//     _footer?: DialogFooterResponsiveProps & {
//       _cancel?: DialogCloseProps
//       _submit?: React.HTMLProps<HTMLDivElement>
//     }
//   }
//   duckHook?: UseDuckAlertReturnType
// }
