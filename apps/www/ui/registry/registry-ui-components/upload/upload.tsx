'use client'

import React from 'react'
import { AlertDialogSheet, Avatar, AvatarFallback, AvatarImage, DropdownMenuView } from '@/registry/default/ui'
import { ContextMenu, ContextMenuTrigger } from '@/registry/default/ui'
import { Input } from '@/registry/default/ui'
import { ScrollArea } from '@/registry/default/ui'
import { filesize } from 'filesize'
import { Button, buttonVariants } from '../button'
import { Download, Ellipsis, Trash, Upload as UploadIcon } from 'lucide-react'
import {
  FileType,
  UploadContentProps,
  UploadContextType,
  UploadInputProps,
  UploadItemProps,
  UploadProps,
  UploadtItemRemoveProps,
  UploadTriggerProps,
} from './upload.types'
import { FILE_TYPE_ICONS } from './upload.constants'
import { UploadManager } from './upload.lib'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { downloadAttachment } from '@/registry/default/ui/comment'
import { uuidv7 } from 'uuidv7'

const UploadContext = React.createContext<UploadContextType<FileType> | null>(null)

export const useUploadContext = () => {
  const context = React.useContext(UploadContext)
  if (!context) {
    throw new Error('useUploadContext must be used within an UploadProvider')
  }
  return context
}

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [attachments, setAttachments] = React.useState<FileType[]>([])
  const [attachmentsState, setAttachmentsState] = React.useState<FileType[]>([])

  return (
    <UploadContext.Provider
      value={{
        attachments,
        setAttachments,
        attachmentsState,
        setAttachmentsState,
      }}
    >
      {children}
    </UploadContext.Provider>
  )
}

export const Upload = ({ children, trigger, content }: UploadProps) => {
  const { setAttachments, attachmentsState, setAttachmentsState } = useUploadContext()
  return (
    <>
      {children ? (
        children
      ) : (
        <AlertDialogSheet
          header={{
            head: 'Upload',
            description: 'upload your attahment here and submit.',
          }}
          actions={{
            continue: () => {
              setAttachments([])
              setAttachmentsState([])
            },
          }}
          footer={{
            submit: {
              children: (
                <Button
                  disabled={attachmentsState.length === 0}
                  className="px-6"
                  onClick={() => {
                    setAttachments(prev => [...prev, ...attachmentsState])
                    setAttachmentsState([])
                  }}
                >
                  Submit
                </Button>
              ),
            },
            cancel: {
              children: (
                <Button
                  variant="outline"
                  className="px-6"
                >
                  Cancel
                </Button>
              ),
            },
          }}
          state={attachmentsState.length > 0}
          trigger={{ children: trigger }}
          content={{ children: content }}
        />
      )}
    </>
  )
}

export const UploadTrigger = React.forwardRef<HTMLDivElement, UploadTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <div
      className={cn(className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
)

export const UploadInput = React.forwardRef<HTMLDivElement, UploadInputProps>(
  ({ className, children, ...props }, ref) => {
    const { setAttachmentsState } = useUploadContext()

    return (
      <div
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <ContextMenu>
          <ContextMenuTrigger className="relative flex flex-col items-center justify-center w-full h-64 rounded-md border border-dashed border-border text-sm leading-5 transition-colors duration-100 ease-in-out hover:bg-muted/10">
            <div className="grid place-items-center gap-4">
              <UploadIcon className="size-[30px]" />
              <span>Click or Drag to Upload</span>
            </div>
            <Input
              placeholder="Filter files..."
              type="file"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              multiple={true}
              onChange={e => UploadManager.getAttachmentsToState({ e, setAttachmentsState })}
            />
          </ContextMenuTrigger>
        </ContextMenu>
        <p className="mt-2 text-muted-foreground text-[.9rem]">supports all types of files.</p>
      </div>
    )
  }
)

export const UploadContent = React.forwardRef<HTMLDivElement, UploadContentProps>(
  ({ className, children, ...props }, ref) => {
    const { attachmentsState, setAttachmentsState } = useUploadContext()

    return (
      <ScrollArea
        className={cn('flex flex-col gap-2 max-h-[39ch] md:max-h-[43ch]', className)}
        ref={ref}
        {...props}
      >
        {children}
        <div className="flex flex-col gap-2">
          {attachmentsState.map(attachment => {
            return (
              <UploadItem
                key={attachment.id}
                attachment={attachment}
              >
                <UploadtItemRemove
                  className="absolute top-1/2 -translate-y-1/2 right-2"
                  onClick={() => {
                    setAttachmentsState(prev => prev.filter(item => item.id !== attachment.id))
                  }}
                />
              </UploadItem>
            )
          })}
        </div>
      </ScrollArea>
    )
  }
)

export const UploadItem = React.forwardRef<HTMLDivElement, UploadItemProps>(
  ({ attachment, children, className, ...props }, ref) => {
    const fileType = UploadManager.getFileType(attachment.file)
    return (
      <div
        className={cn('relative flex items-center gap-4 bg-secondary/20 rounded-md p-2', className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="relative">{FILE_TYPE_ICONS[fileType]}</div>
          <div className="grid items-start">
            <h3 className="inline-block text-[.9rem] truncate max-w-[200px]">{attachment.name || 'Empty File'}</h3>
            <p className="inline-block truncate text-semibold text-[.8rem] max-w-[300px]">
              {filesize(attachment.file ? +attachment.file.size : 0, {
                round: 0,
              })}
            </p>
          </div>
        </div>
        {children}
      </div>
    )
  }
)

export const UploadtItemRemove = React.forwardRef<HTMLDivElement, UploadtItemRemoveProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'size-4 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 cursor-pointer',
          className
        )}
        ref={ref}
        {...props}
      >
        <X className="w-4 h-4" />
      </div>
    )
  }
)

export const UploadItemsPreview = () => {
  const { attachments } = useUploadContext()

  return attachments.length > 0 ? (
    <div className="grid grid-cols-6 justify-start items-start place-content-start gap-2 w-full border border-border min-h-[400px] p-4 rounded-lg">
      {attachments.map(attachment => {
        const fileType = UploadManager.getFileType(attachment.file)

        // If the file is a File object, generate a URL for preview
        const src = typeof attachment.file === 'string' ? attachment.file : URL.createObjectURL(attachment.file as Blob)

        return (
          <div
            className={cn(
              'relative bg-secondary/20 rounded-md overflow-hidden w-full flex flex-col place-content-center gap-4 h-[100px] border border-border'
            )}
          >
            <div>
              <div className="relative [&_svg]:size-12 [&_svg]:mx-auto w-full">{FILE_TYPE_ICONS[fileType]}</div>
            </div>
            <DropdownMenuView
              trigger={{
                icon: { children: Ellipsis, className: 'h-4 w-4 rounded' },
                variant: 'outline',
                size: 'icon',
                className: 'h-4 w-6 absolute bottom-2 right-2',
              }}
              content={{
                options: {
                  itemType: 'label',
                  optionsData: [
                    {
                      children: 'Download',
                      icon: { children: Download, className: 'h-4 w-4 rounded' },
                      onClick: () => {
                        downloadAttachment({ attachment: attachment! })
                      },
                    },
                    {
                      children: 'Delete',
                      className: 'text-red-500 bg-red-500/10',
                      icon: { children: Trash, className: 'h-4 w-4 rounded' },
                      onClick: () => {},
                    },
                  ],
                },
              }}
            />
          </div>
        )
      })}
    </div>
  ) : (
    <div className="flex items-center w-full border border-border min-h-[400px] p-4 rounded-lg">
      <p className="text-center w-full">There's not Attachments yet uploaded.</p>
    </div>
  )
}

export const UploadProfile = () => {
  const { attachments, setAttachments } = useUploadContext() ?? {}
  const src =
    attachments.length > 0
      ? typeof attachments[0].file === 'string'
        ? attachments[0].file
        : URL.createObjectURL(attachments[0].file as Blob)
      : null

  return (
    <Button
      className="relative cursor-pointer w-16 h-16 rounded-full"
      variant={'outline'}
    >
      <Input
        placeholder="Filter files..."
        type="file"
        className="absolute w-full h-full opacity-0 cursor-pointer"
        multiple={false}
        onChange={e => {
          const file = e.currentTarget.files?.[0]
          if (file) {
            setAttachments([
              {
                id: uuidv7(),
                file: file,
                name: file.name,
                url: null,
                type: file.type,
                size: file.size.toString(),
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ])
          }
        }}
      />

      <Avatar className="w-16 h-16 pointer-events-none">
        <AvatarImage
          src={src ?? ''}
          className="object-cover"
        />
        <AvatarFallback>
          <img src="/avatars/02.png" />
        </AvatarFallback>
      </Avatar>
      <span
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'absolute rounded-full p-2 -bottom-1 -left-1 hover:bg-background h-fit pointer-events-none'
        )}
      >
        <UploadIcon className="!size-3" />
      </span>
    </Button>
  )
}

export const UploadDirectButton = () => {
  const { setAttachments } = useUploadContext() ?? {}

  return (
    <Button
      className="relative"
      variant={'outline'}
      size={'sm'}
      icon={{ children: UploadIcon }}
    >
      <Input
        placeholder="Filter files..."
        type="file"
        className="absolute w-full h-full opacity-0 cursor-pointer"
        multiple={true}
        onChange={e => UploadManager.getAttachmentsToState({ e, setAttachmentsState: setAttachments })}
      />
      Upload file
    </Button>
  )
}
