'use client'

import * as React from 'react'

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/default/ui'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/default/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/default/ui/dropdown-menu'
import { Input } from '@/registry/default/ui/input'
import { ScrollArea } from '@/registry/default/ui/scroll-area'
import { Button, buttonVariants } from '../button'
import {
  FileType,
  FolderType,
  SelectedFolderType,
  UploadAlertDeleteActionProps,
  UploadAlertMoveActionProps,
  UploadAttachmentsTreeItemProps,
  UploadDownloadAttachmentsProps,
  UploadRenameAttachmentButtonProps,
} from './upload.types'
import {
  CONTENT_POILERPLATE,
  FILE_TYPE_ICONS,
  ITEMS_TO_DISPLAY_BREADCRUMB,
  TREE_HEIGHT,
  TREE_WIDTH,
} from './upload.constants'
import {
  addFolderToPath,
  advancedUploadAttachments,
  deleteAttachmentById,
  folderOpen,
  getFileType,
  moveAttachmentsToPath,
  renameAttachmentById,
  selectAttachmentFromFolderContent,
} from './upload.lib'
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/registry/default/ui'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/registry/default/ui'
import { DuckDropdownMenuItem } from '../dropdown-menu'
import { useUploadAdvancedContext } from './upload-advanced'
import { UploadOrDragSvg } from './upload.assets'
import { cn } from '@/lib/utils'
import {
  X,
  Download,
  Ellipsis,
  Folder,
  FolderOpen,
  Rows2,
  Search,
  FolderPlusIcon,
  AlertCircle,
  Trash,
  Move,
  RefreshCw,
  UploadIcon,
  Pencil,
} from 'lucide-react'
import { Checkbox, Separator } from '@/registry/default/ui'
import { debounceCallback } from '@/hooks'
import { useMediaQuery } from '@/hooks/use-media-query'

/**
 * A button to reload the upload view.
 *
 * TODO: Implement reload functionality.
 * @returns {JSX.Element} The reload button.
 */
export const UploadReloadButton = (): JSX.Element => {
  // TODO: Implement reload functionality.
  return (
    <Button
      size={'xs'}
      icon={{ children: RefreshCw }}
      onClick={() => {}}
    >
      Reload
    </Button>
  )
}

/**
 * A dropdown menu button to view and sort the uploads.
 *
 * This component will render a dropdown menu with three sub-items:
 * - View: A radio button group to select the view type.
 * - Sort By: A radio button group to sort the uploads by a specific column.
 * - Sort Order: A radio button group to sort the uploads in ascending or descending order.
 *
 * @returns {JSX.Element} The dropdown menu button.
 */
export const UploadViewButton = (): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'xs'}
          icon={{ children: Rows2 }}
        >
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DuckDropdownMenuItem
          title="View"
          content={CONTENT_POILERPLATE.view}
        />
        <DuckDropdownMenuItem
          title="Sort By"
          subgroup={true}
          content={CONTENT_POILERPLATE.sort}
        />
        <DuckDropdownMenuItem
          title="Sort Order"
          subgroup={true}
          content={CONTENT_POILERPLATE.order}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * A button component for advanced file uploads.
 *
 * Provides a file input for uploading multiple files with advanced handling.
 * Utilizes the `UploadManager.advancedUploadAttachments` function to manage
 * the upload process, including file validation and attachment state updates.
 *
 * @returns {JSX.Element} The upload button component.
 */

export const UploadAdvancedButton = (): JSX.Element => {
  const { setAttachments, selectedFolder, setSelectedFolder } = useUploadAdvancedContext() ?? {}

  return (
    <Button
      className="relative"
      variant={'default'}
      size={'xs'}
      icon={{ children: UploadIcon }}
    >
      <Input
        placeholder="Filter files..."
        type="file"
        className="absolute w-full h-full opacity-0 cursor-pointer"
        multiple={true}
        onChange={e => advancedUploadAttachments({ e, selectedFolder, setSelectedFolder, setAttachments })}
      />
      Upload file
    </Button>
  )
}

/**
 * A button component for creating a new folder.
 *
 * Provides a button and a dialog with an input field for creating a new folder.
 * Utilizes the `UploadManager.addFolderToPath` function to create the folder
 * and add it to the specified path.
 *
 * @returns {JSX.Element} The upload folder button component.
 */
export const UploadAddFolderButton = (): JSX.Element => {
  const { selectedFolder, setAttachments, setSelectedFolder } = useUploadAdvancedContext()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const Trigger = (
    <Button
      className="relative w-[1.625rem]"
      size={'xs'}
      icon={{ children: FolderPlusIcon }}
    >
      <span className="sr-only">Upload attachments</span>
    </Button>
  )

  return isDesktop ? (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent>
        <div>
          <DialogHeader className="p-2">
            <DialogTitle className="text-lg font-medium pb-0">Create a new folder</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter the name of the folder you'd like to create.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Enter folder name..."
            defaultValue={'New_folder' + Math.random().toString(36).slice(2)}
            className="h-[35px]"
            ref={inputRef}
          />
        </div>
        <DialogFooter>
          <DialogClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm', variant: 'outline' }))}
            onClick={() => inputRef.current && (inputRef.current.value = '')}
          >
            Cancel
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
            onClick={() =>
              addFolderToPath({
                selectedFolder,
                setAttachments,
                setSelectedFolder,
                folderName: inputRef.current?.value ?? '',
              })
            }
          >
            Submit
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent className="p-4">
        <div>
          <DrawerHeader className="p-2 text-start">
            <DrawerTitle className="text-lg font-medium pb-0">Create a new folder</DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Enter the name of the folder you'd like to create.
            </DrawerDescription>
          </DrawerHeader>
          <Input
            placeholder="Enter folder name..."
            defaultValue={'New_folder' + Math.random().toString(36).slice(2)}
            ref={inputRef}
          />
        </div>
        <DrawerFooter className="px-0">
          <DrawerClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm', variant: 'outline' }))}
            onClick={() => inputRef.current && (inputRef.current.value = '')}
          >
            Cancel
          </DrawerClose>
          <DrawerClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
            onClick={() =>
              addFolderToPath({
                selectedFolder,
                setAttachments,
                setSelectedFolder,
                folderName: inputRef.current?.value ?? '',
              })
            }
          >
            Submit
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/**
 * @description A component to rename a single attachment.
 * @param {{ attachment: FileType | FolderType }} props
 * @returns {JSX.Element} The rename attachment button component.
 */
export const UploadRenameAttachments = ({ attachment }: UploadRenameAttachmentButtonProps): JSX.Element => {
  const { setAttachments } = useUploadAdvancedContext()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const Trigger = (
    <Button
      className="relative w-[1.625rem]"
      size={'xs'}
      variant={'ghost'}
      icon={{ children: Pencil }}
    >
      <span className="">Rename </span>
    </Button>
  )

  return isDesktop ? (
    <Dialog modal={true}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent>
        <div>
          <DialogHeader className="p-2">
            <DialogTitle className="text-lg font-medium pb-0">Rename the attachment</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter the name of the attachment you'd like to rename.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Enter attachment name..."
            defaultValue={attachment.name}
            className="h-[35px]"
            ref={inputRef}
          />
        </div>
        <DialogFooter>
          <DialogClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm', variant: 'outline' }))}
            onClick={() => inputRef.current && (inputRef.current.value = '')}
          >
            Cancel
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
            onClick={() => setAttachments(_ => renameAttachmentById(_, [attachment.id], inputRef.current?.value ?? ''))}
          >
            Submit
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer>
      <DrawerTrigger>{Trigger}</DrawerTrigger>
      <DrawerContent className="p-4">
        <div>
          <DrawerHeader className="p-2 text-start">
            <DrawerTitle className="text-lg font-medium pb-0">Rename the attachment</DrawerTitle>
            <DrawerDescription className="text-sm text-muted-foreground">
              Enter the name of the attachment you'd like to rename.
            </DrawerDescription>
          </DrawerHeader>
          <Input
            placeholder="Enter attachment name..."
            defaultValue={attachment.name}
            ref={inputRef}
          />
        </div>
        <DrawerFooter>
          <DrawerClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm', variant: 'outline' }))}
            onClick={() => inputRef.current && (inputRef.current.value = '')}
          >
            Cancel
          </DrawerClose>
          <DrawerClose
            className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
            onClick={() => setAttachments(_ => renameAttachmentById(_, [attachment.id], inputRef.current?.value ?? ''))}
          >
            Submit
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/**
 * @description
 * A button that allows you to search for attachments in the current folder.
 * When clicked, it opens a text input to enter the search query.
 * The search query is debounced for 1000 milliseconds.
 * The search query is cleared when the button is clicked again.
 * @returns A JSX.Element
 */
export const UploadSearchButton = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false)
  const { setUploadQuery } = useUploadAdvancedContext()
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [open])

  const debounceSearch = debounceCallback(() => {
    inputRef.current?.value ? setUploadQuery(inputRef.current?.value) : setUploadQuery('')
  }, 1000)

  return (
    <div className="flex items-center">
      <Button
        size={'xs'}
        variant={'secondary'}
        border={'secondary'}
        icon={{ children: Search }}
        className={cn('relative w-[1.625rem] flex', open && 'hidden')}
        onClick={() => {
          setOpen(true)
        }}
      >
        <span className="sr-only">search</span>
      </Button>
      <div
        className={cn(
          buttonVariants({
            variant: 'secondary',
            border: 'secondary',
            size: 'xs',
            className: 'relative h-[1.625rem] overflow-hidden w-[200px] hidden [&_svg]:pointer-events-auto',
          }),
          open && 'flex'
        )}
      >
        <Search className="absolute top-1/2 -translate-y-1/2 left-2 size-[0.875rem] z-10" />
        <Input
          autoFocus={true}
          onChange={_ => debounceSearch()}
          className="pl-6 w-[200px] h-[1.625rem] text-xs text-accent-foreground/50 bg-transparent placeholder:text-xs placeholder:text-accent-foreground/50"
          placeholder="Search file or folder..."
          ref={inputRef}
        />
        <X
          className="absolute top-1/2 -translate-y-1/2 right-2 size-[0.875rem] stroke-[2px] cursor-pointer z-10 pointer-events-auto"
          onClick={() => {
            setUploadQuery('')
            inputRef.current && (inputRef.current.value = '')
            setOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export const UploadDownloadAttachments = React.memo(
  ({ itemsName, size, withinDropdown = false, ...props }: UploadDownloadAttachmentsProps): JSX.Element => {
    const { currentBucket } = useUploadAdvancedContext()
    const isDesktop = useMediaQuery('(min-width: 768px)')

    const Trigger = (
      <Button
        size={size ?? 'xs'}
        icon={{ children: Download }}
        onClick={() => {}}
        {...props}
      >
        Download
      </Button>
    )

    const Content = (
      <>
        <h5 className="text-lg font-medium p-4 pb-0">
          Download
          <Button
            variant={'nothing'}
            className="py-0 px-2 text-lg"
            label={{
              children: (
                <div className="flex flex-col sapce-y-2 p-1">
                  {itemsName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              ),
              side: 'top',
              showLabel: true,
            }}
          >
            <span className="font-mono italic underline underline-offset-4">
              {itemsName.length > 1
                ? `${itemsName.length} file${itemsName[0].length > 1 ? 's' : ''}`
                : `${itemsName[0]?.slice(0, 15)}${itemsName[0]?.length > 15 ? '... ' : ''}`}
            </span>
          </Button>
          from
          <Button
            variant={'nothing'}
            className="py-0 px-2 text-lg"
            label={{
              children: currentBucket ? currentBucket : 'the bucket',
              showLabel: currentBucket.length > 5 ? true : false,
              side: 'top',
            }}
          >
            <span className="font-mono italic underline underline-offset-4">
              {currentBucket
                ? `${currentBucket.length > 5 ? `${currentBucket.slice(0, 5)}...` : currentBucket}`
                : 'the bucket'}
            </span>
          </Button>
        </h5>
        <p className="text-sm text-muted-foreground px-4 !mt-0">Select the items you'd like to download.</p>

        <Separator />
      </>
    )

    return isDesktop ? (
      <AlertDialog>
        <AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
        <AlertDialogContent className="p-2">
          <AlertDialogHeader>{Content}</AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className={cn(buttonVariants({ variant: 'outline', className: 'px-8', size: 'sm' }))}>
              Cancel
            </AlertDialogCancel>
            {withinDropdown ? (
              <DropdownMenuItem className="p-0">
                <AlertDialogAction
                  className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
                  onClick={() => {}}
                >
                  Download
                </AlertDialogAction>
              </DropdownMenuItem>
            ) : (
              <AlertDialogAction
                className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
                onClick={() => {}}
              >
                Download
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <Drawer>
        <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
        <DrawerContent className="p-2">
          <DrawerHeader>{Content}</DrawerHeader>

          <DrawerFooter>
            <DrawerClose className={cn(buttonVariants({ variant: 'outline', className: 'px-8', size: 'sm' }))}>
              Cancel
            </DrawerClose>
            {withinDropdown ? (
              <DropdownMenuItem className="p-0">
                <DrawerClose
                  className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
                  onClick={() => {}}
                >
                  Download
                </DrawerClose>
              </DropdownMenuItem>
            ) : (
              <DrawerClose
                className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
                onClick={() => {}}
              >
                Download
              </DrawerClose>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
)

export const UploadAlertMoveAction = React.memo(
  ({ itemsName: itemName, ...props }: UploadAlertMoveActionProps): JSX.Element => {
    const { currentBucket, selectedAttachments, setSelectedAttachments, setAttachments } = useUploadAdvancedContext()
    const [open, setOpen] = React.useState<boolean>(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const Trigger = (
      <Button
        size={'xs'}
        icon={{ children: Move }}
        {...props}
      >
        Move
      </Button>
    )

    const Content = (
      <>
        <div className="text-lg font-medium text-start">
          Moving
          <Button
            variant={'nothing'}
            className="py-0 px-2 text-lg"
            label={{
              children: (
                <div className="flex flex-col sapce-y-2 p-1">
                  {itemName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              ),
              side: 'top',
              showLabel: true,
            }}
          >
            <span className="font-mono italic underline underline-offset-4">
              {itemName.length > 1
                ? `${itemName.length} file${itemName[0].length > 1 ? 's' : ''}`
                : `${itemName[0]?.slice(0, 15)}${itemName[0]?.length > 15 ? '... ' : ''}`}
            </span>
          </Button>
          within
          <Button
            variant={'nothing'}
            className="py-0 px-2 text-lg"
            label={{
              children: currentBucket ? currentBucket : 'the bucket',
              showLabel: currentBucket.length > 5 ? true : false,
              side: 'top',
            }}
          >
            <span className="font-mono italic underline underline-offset-4">
              {currentBucket
                ? `${currentBucket.length > 5 ? `${currentBucket.slice(0, 5)}...` : currentBucket}`
                : 'the bucket'}
            </span>
          </Button>
        </div>
        <p className="text-sm text-start text-muted-foreground !mt-0">
          Enter the path to where you'd like to move the files to.
        </p>

        <Separator />
        <Alert
          variant={'default'}
          className="space-y-2 [&>svg]:left-6 [&>svg]:top-6 [&>svg~*]:pl-12 bg-muted/50"
        >
          <AlertTitle className="text-accent-foreground/70 flex iems-center gap-1">
            Path to new directory in
            <span className="font-mono italic underline underline-offset-4">{currentBucket}</span>
          </AlertTitle>
          <Input
            className="bg-transparent h-[35px] border-muted-foreground/20"
            placeholder="Enter path here..."
            ref={inputRef}
          />
          <AlertDescription className="text-muted-foreground/70">
            Leave blank to move items to the root of the bucket.
          </AlertDescription>
        </Alert>
        <Separator />
      </>
    )

    return isDesktop ? (
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="p-4 pb-0 space-y-4">{Content}</AlertDialogHeader>
          <AlertDialogFooter className="px-4 pb-4">
            <AlertDialogCancel className={cn(buttonVariants({ variant: 'outline', className: 'px-8', size: 'sm' }))}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
              onClick={_ =>
                moveAttachmentsToPath({
                  setAttachments,
                  setSelectedAttachment: setSelectedAttachments,
                  selectedAttachments,
                  path: inputRef.current?.value ?? '',
                })
              }
            >
              Move
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="space-y-2 [&_div]:text-start">{Content}</DrawerHeader>
          <DrawerFooter className="px-4 pb-4 pt-2">
            <DrawerClose className={cn(buttonVariants({ variant: 'outline', className: 'px-8', size: 'sm' }))}>
              Cancel
            </DrawerClose>
            <DrawerClose
              className={cn(buttonVariants({ className: 'px-8', size: 'sm' }))}
              onClick={_ =>
                moveAttachmentsToPath({
                  setAttachments,
                  setSelectedAttachment: setSelectedAttachments,
                  selectedAttachments,
                  path: inputRef.current?.value ?? '',
                })
              }
            >
              Move
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
)

export const UploadAlertDeleteAttachments = React.memo(
  ({
    itemsName: itemName,
    className,
    variant,
    size,
    itemsToDelete,
    ...props
  }: UploadAlertDeleteActionProps): JSX.Element => {
    const { setAttachments, currentBucket } = useUploadAdvancedContext()
    const [open, setOpen] = React.useState<boolean>(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    const Trigger = (
      <Button
        size={size ?? 'xs'}
        className={cn('justify-between w-full rounded-sm', className)}
        variant={variant ?? 'destructive'}
        icon={{ children: Trash }}
        {...props}
      >
        Delete
      </Button>
    )

    const Content = (
      <>
        <div className="text-lg font-medium text-start">
          Confirm deletion of
          <Button
            variant={'nothing'}
            className="py-0 px-2 text-lg"
            label={{
              children: (
                <div className="flex flex-col sapce-y-2 p-1">
                  {itemName.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              ),
              side: 'top',
              showLabel: true,
            }}
          >
            <span className="font-mono italic underline underline-offset-4">
              {itemName.length > 1
                ? `${itemName.length} file${itemName[0].length > 1 ? 's' : ''}`
                : `${itemName[0]?.slice(0, 10)}${itemName[0]?.length > 10 ? '... ' : ''}`}
            </span>
          </Button>
          from
          <Button
            variant={'nothing'}
            className="py-0 px-2 text-lg"
            label={{
              children: currentBucket ? currentBucket : 'the bucket',
              showLabel: currentBucket.length > 5 ? true : false,
              side: 'top',
            }}
          >
            <span className="font-mono italic underline underline-offset-4">
              {currentBucket
                ? `${currentBucket.length > 5 ? `${currentBucket.slice(0, 5)}...` : currentBucket}`
                : 'the bucket'}
            </span>
          </Button>
          <Separator className="mt-2" />
        </div>

        <Alert
          variant="destructive"
          className="space-y-2 [&>svg]:left-6 [&>svg]:top-6 [&>svg~*]:pl-12"
        >
          <AlertCircle />
          <AlertTitle>This action cannot be undone.</AlertTitle>
          <AlertDescription>Are you sure you want to delete the selected items?</AlertDescription>
        </Alert>

        <Separator />
      </>
    )
    return isDesktop ? (
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="p-4 pb-0 space-y-4">{Content}</AlertDialogHeader>
          <AlertDialogFooter className="px-4 pb-4">
            <AlertDialogCancel className={cn(buttonVariants({ variant: 'outline', className: 'px-8', size: 'sm' }))}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                buttonVariants({ variant: 'destructive', border: 'destructive', className: 'px-8', size: 'sm' })
              )}
              onClick={() => setAttachments(old => deleteAttachmentById(old, itemsToDelete))}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="space-y-2 [&_div]:text-start">{Content}</DrawerHeader>
          <DrawerFooter className="px-4 pb-4 pt-2">
            <DrawerClose className={cn(buttonVariants({ variant: 'outline', className: 'px-8', size: 'sm' }))}>
              Cancel
            </DrawerClose>
            <DrawerClose
              className={cn(
                buttonVariants({ variant: 'destructive', border: 'destructive', className: 'px-8', size: 'sm' })
              )}
              onClick={() => setAttachments(old => deleteAttachmentById(old, itemsToDelete))}
            >
              Delete
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
)

/**
 * Component for rendering the upload attachments tree item.
 * @param {UploadAttachmentsTreeItemProps} props - The props for the component.
 * @returns {JSX.Element}
 */
export const UploadAttachmentsTreeItem = React.memo(({ attachments }: UploadAttachmentsTreeItemProps) => {
  const { selectedFolder, setSelectedFolder, attachments: _attachments, uploadQuery } = useUploadAdvancedContext()

  const filtered = (
    uploadQuery
      ? (attachments ?? _attachments)?.filter(item => item.name.toLowerCase().includes(uploadQuery.toLowerCase()))
      : (attachments ?? _attachments)
  ) as (FileType | FolderType)[]

  return (filtered ?? _attachments)?.length > 0 ? (
    <div className="flex items-start h-full rounded-md">
      <div className="flex flex-col h-full rounded-md">
        <UploadSelectAll attachments={attachments ?? _attachments} />
        <ScrollArea className={cn('rounded-md p-2 bg-muted/10', TREE_WIDTH, TREE_HEIGHT)}>
          <div className="flex flex-col gap-1 h-full">
            {filtered.map(attachment => {
              if ((attachment as FileType).file) {
                return (
                  <UploadAttachmentFile
                    attachmentFile={attachment as FileType}
                    key={attachment.id}
                  />
                )
              }
              return (
                <UploadAttachmentFolder
                  key={attachment.id}
                  attachmentFolder={attachment as FolderType}
                  selected={selectedFolder}
                  setSelected={setSelectedFolder}
                />
              )
            })}
          </div>
        </ScrollArea>
      </div>
      <Separator orientation="vertical" />
    </div>
  ) : (
    <EmptyFolder />
  )
})

/**
 * Component for selecting all attachments in the current tree.
 * @param {Object} props - The props for the component.
 * @param {(FileType | FolderType)[]} props.attachments - The list of attachments.
 * @returns {JSX.Element}
 */
export const UploadSelectAll = React.memo((props: { attachments: (FileType | FolderType)[] }) => {
  const { attachments } = props
  const { setSelectedAttachments: setSelectedAttachment, selectedAttachments: selecttedAttachment } =
    useUploadAdvancedContext()
  const currentTreeLevel = attachments?.[0]?.treeLevel

  // Get all selected folders in the current tree
  const selectedInCurrentTree = selecttedAttachment.filter(attachment => attachment.treeLevel === currentTreeLevel)
  const filesInCurrentTree = attachments.filter(item => !(item as FolderType)?.content)

  // Determine the `isChecked` state
  const isChecked =
    selectedInCurrentTree.length === filesInCurrentTree?.length
      ? true // All selected
      : selectedInCurrentTree.length > 0
        ? 'indeterminate' // Some selected
        : false // None selected

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-2 bg-muted rounded-md mx-2 mt-2 -mb-1 transition-all duration-300 ease-in-out',
        (selecttedAttachment.length === 0 || filesInCurrentTree?.length === 0) && '-mt-10 mb-2'
      )}
    >
      <Checkbox
        className="w-[15px] h-[15px] border-muted-foreground/80"
        onCheckedChange={_ =>
          selectAttachmentFromFolderContent({
            filesInCurrentTree,
            setSelectedAttachment,
          })
        }
        checked={isChecked}
      />
      <span className="text-xs font-medium text-muted-foreground/80">
        {isChecked === true
          ? `All ${filesInCurrentTree?.length} file${selectedInCurrentTree.length === 1 ? ' is' : 's are'} selected`
          : isChecked === 'indeterminate'
            ? `${selectedInCurrentTree.length} file${selectedInCurrentTree.length === 1 ? ' is' : 's are'} selected`
            : `Select all ${filesInCurrentTree?.length} file${filesInCurrentTree.length === 1 ? '' : 's'}`}
      </span>
    </div>
  )
})

/**
 * Component to display when there are no files in the folder.
 * @returns {JSX.Element}
 */
export const EmptyFolder = (): JSX.Element => {
  return (
    <div className="border-r border-r-border bg-muted/10 w-[250px] h-full p-4 flex items-center flex-col space-y-2 justify-center">
      <UploadOrDragSvg className="size-[100px]" />
      <p className="text-center w-full text-sm font-medium">Drop your files here</p>
      <p className="text-accent-foreground/70 text-center w-full text-xs max-w-[150px]">
        Or upload them via the "Upload file" button above
      </p>
    </div>
  )
}

/**
 * Component representing a folder that contains attachments.
 * It displays the folder name and provides actions like renaming, downloading, and deleting.
 *
 * @param {Object} props - Component properties.
 * @param {FolderType} props.attachmentFolder - The folder object containing attachment details.
 * @param {SelectedFolderType[]} props.selected - The list of selected folders.
 * @param {React.Dispatch<React.SetStateAction<SelectedFolderType[]>>} props.setSelected - A function to update the selected folders list.
 *
 * @returns {React.Element} The rendered component.
 */
export const UploadAttachmentFolder = React.memo(
  (props: {
    attachmentFolder: FolderType
    selected: SelectedFolderType[]
    setSelected: React.Dispatch<React.SetStateAction<SelectedFolderType[]>>
  }) => {
    const { attachmentFolder, selected, setSelected } = props
    const exist_in_tree = selected?.some(item => item.id === attachmentFolder.id)

    return (
      <div className="relative">
        <div
          className={cn(
            'relative bg-card-foreground/5 rounded-md overflow-hidden w-full flex items-center justify-start gap-2 p-2 hover:bg-card-foreground/15 transition-all cursor-pointer [&_*]:select-none',
            exist_in_tree && 'bg-card-foreground/15'
          )}
          onClick={() => folderOpen({ attachmentFolder, setSelected, exist_in_tree })}
        >
          <div className="relative [&_svg]:size-4">
            {exist_in_tree ? <FolderOpen /> : <Folder className={cn(attachmentFolder.files > 0 && 'fill-white')} />}
          </div>
          <h6 className="text-xs font-medium truncate max-w-[70%]">{attachmentFolder.name} </h6>
        </div>
        <UploadAttachmentActionsMenu attachment={attachmentFolder} />
      </div>
    )
  }
)

export const UploadAttachmentActionsMenu = ({ attachment }: { attachment: FileType | FolderType }) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return isDesktop ? (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          size={'xs'}
          variant={'ghost'}
          className="h-4 w-6 absolute top-1/2 right-2 -translate-y-1/2"
          icon={{ children: Ellipsis }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <UploadActionsMenu attachment={attachment} />
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger
        aria-label="Toggle Menu"
        asChild
      >
        <Button
          size={'xs'}
          variant={'ghost'}
          className="h-4 w-6 absolute top-1/2 right-2 -translate-y-1/2"
          icon={{ children: Ellipsis }}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Pick an action</DrawerTitle>
          <DrawerDescription>Select an action to execute.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <UploadActionsMenu attachment={attachment} />
        </div>
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/**
 * Component representing a single attachment file.
 * Displays the file name, type, and provides actions like renaming, downloading, and deleting.
 *
 * @param {Object} props - Component properties.
 * @param {FileType} props.attachmentFile - The file object containing attachment details.
 *
 * @returns {React.Element} The rendered component.
 */
export const UploadAttachmentFile = React.memo(({ attachmentFile }: { attachmentFile: FileType }) => {
  const fileType = getFileType(attachmentFile.file)
  const {
    setPreviewFile,
    selectedAttachments: selecttedAttachment,
    setSelectedAttachments: setSelectedAttachment,
    previewFile,
  } = useUploadAdvancedContext()
  const exist_in_selected = selecttedAttachment.some(attachment => attachment.id === attachmentFile.id)

  return (
    <div className={cn('relative group/file', previewFile?.id === attachmentFile.id && 'bg-card-foreground/15')}>
      <div
        className={cn(
          'relative bg-card-foreground/5 rounded-md overflow-hidden w-full flex items-center justify-start gap-2 p-2 hover:bg-card-foreground/15 transition-all cursor-pointer'
        )}
        onClick={() => setPreviewFile(attachmentFile)}
      >
        <div
          className={cn(
            'relative [&_svg]:size-4 group-hover/file:opacity-0 opacity-100',
            exist_in_selected && 'opacity-0'
          )}
        >
          {FILE_TYPE_ICONS[fileType]}
        </div>
        <h6 className="text-xs font-medium truncate max-w-[70%]">{attachmentFile.name}</h6>
      </div>

      <Checkbox
        className={cn(
          'absolute top-1/2 left-2 -translate-y-1/2 group-hover/file:opacity-100 opacity-0 w-[15px] h-[15px]',
          exist_in_selected && '!opacity-100'
        )}
        checked={exist_in_selected}
        onCheckedChange={e => {
          if (e) return setSelectedAttachment(prev => [...prev, attachmentFile])
          setSelectedAttachment(prev => prev.filter(attachment => attachment.id !== attachmentFile.id))
        }}
      />
      <UploadAttachmentActionsMenu attachment={attachmentFile} />
    </div>
  )
})

const UploadActionsMenu = ({ attachment }: { attachment: FileType | FolderType }) => {
  return (
    <div className="flex flex-col items-start justify-start [&_button]:justify-between [&_button]:w-full [&_button]:rounded-sm [&>div]:p-0 [&>div]:justify-between [&>div]:flex [&>div]:items-center [&>div]:w-full space-y-1">
      <UploadRenameAttachments attachment={attachment} />
      <UploadDownloadAttachments
        withinDropdown={true}
        itemsName={[attachment.name]}
        variant={'ghost'}
      />
      <Separator />
      <UploadAlertDeleteAttachments
        itemsName={[attachment.name]}
        command={{
          label: 'Alt+D',
          key: 'Alt+d',
          variant: 'nothing',
          className: 'text-accent-foreground/40 w-full ml-6',
        }}
        itemsToDelete={[attachment.id]}
      />
    </div>
  )
}

export const UploadNavigationLayout = () => {
  const [open, setOpen] = React.useState(false)

  const { selectedFolder, currentBucket, setSelectedFolder } = useUploadAdvancedContext()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap px-4 !gap-0">
        <BreadcrumbItem
          onClick={() =>
            folderOpen({
              attachmentFolder: selectedFolder[0],
              setSelected: setSelectedFolder,
              exist_in_tree: selectedFolder?.some(item => item.id === selectedFolder[0].id),
            })
          }
        >
          <Button
            size={'xs'}
            variant={'ghost'}
          >
            {selectedFolder.length > 0 ? selectedFolder[0].name : currentBucket}
          </Button>
        </BreadcrumbItem>
        {selectedFolder.length > ITEMS_TO_DISPLAY_BREADCRUMB ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu
                  open={open}
                  onOpenChange={setOpen}
                >
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {selectedFolder.slice(1, -2).map(item => (
                      <DropdownMenuItem key={item.id}>
                        <Button
                          size={'xs'}
                          variant={'ghost'}
                          onClick={() =>
                            folderOpen({
                              attachmentFolder: item,
                              setSelected: setSelectedFolder,
                              exist_in_tree: selectedFolder?.some(item => item.id === item.id),
                            })
                          }
                        >
                          {item.name}
                        </Button>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer
                  open={open}
                  onOpenChange={setOpen}
                >
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {selectedFolder.slice(1, -2).map(item => (
                        <Button
                          key={item.id}
                          size={'xs'}
                          variant={'ghost'}
                          onClick={() =>
                            folderOpen({
                              attachmentFolder: item,
                              setSelected: setSelectedFolder,
                              exist_in_tree: selectedFolder?.some(item => item.id === item.id),
                            })
                          }
                        >
                          {item.name}
                        </Button>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
          </>
        ) : null}
        {selectedFolder.length > 1 &&
          selectedFolder
            .slice(selectedFolder.length === 2 ? -1 : -ITEMS_TO_DISPLAY_BREADCRUMB + 1)
            .map((item, index) => (
              <BreadcrumbItem
                key={index}
                className="!gap-0"
              >
                <BreadcrumbSeparator />
                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                  <Button
                    size={'xs'}
                    variant={'ghost'}
                    onClick={() =>
                      folderOpen({
                        attachmentFolder: item,
                        setSelected: setSelectedFolder,
                        exist_in_tree: selectedFolder?.some(item => item.id === item.id),
                      })
                    }
                  >
                    {item.name}
                  </Button>
                </BreadcrumbPage>
              </BreadcrumbItem>
            ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
