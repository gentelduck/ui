import React from 'react'
import { Attachment, CommentType, TaggedUserType } from './swapy'
import { differenceInDays, differenceInHours, format, formatDistance } from 'date-fns'
import { cn } from '@/lib'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import {
  ArrowBigUp,
  BadgeCheck,
  Bug,
  CalendarDays,
  Check,
  Ellipsis,
  FileAudio,
  LucideIcon,
  Mic,
  Paperclip,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { uuidv7 } from 'uuidv7'
import { DropdownMenuOptionsDataType, DropdownMenuView } from './dropdown-menu'

import 'highlight.js/styles/tokyo-night-dark.css'
import { MDXContext } from '../example/mdx-context-provider'
import { AudioItem, useAudioDataProvider, useAudioProvider } from './audio-record'
import { LikeButton } from './custom-buttons'
import { Popover, PopoverContent, PopoverTrigger, PopoverWrapper } from './popover'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'
import { Input } from './input'
import { users } from '../example/SwapyMainDemo'

// Comment
export interface CommentContextType {
  comments: CommentType[]
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
  currentCommentContent: string
  setCurrentCommentContent: React.Dispatch<React.SetStateAction<string>>
}

export const CommentContext = React.createContext<CommentContextType>({} as CommentContextType)
export interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Comment = React.forwardRef<HTMLDivElement, CommentProps>(({ className, children, ...props }, ref) => {
  const [comments, setComments] = React.useState<CommentType[]>([])
  const [currentCommentContent, setCurrentCommentContent] = React.useState<string>('')

  console.log(comments)
  return (
    <CommentContext.Provider
      value={{
        currentCommentContent,
        setCurrentCommentContent,
        comments,
        setComments,
      }}
    >
      <div
        className={cn('max-w-[500px] border border-border border-solid rounded-lg', className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    </CommentContext.Provider>
  )
})

// Comment Top
export interface CommentTopProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentTop = React.forwardRef<HTMLDivElement, CommentTopProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-center justify-between pt-4 px-4', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Comment Title
export interface CommentTitleProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentTitle = React.forwardRef<HTMLDivElement, CommentTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        className={cn('text-lg font-medium leading-none tracking-tight', className)}
        ref={ref}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

// Comment Colse
export interface CommentCloseProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentClose = React.forwardRef<HTMLDivElement, CommentCloseProps>(({ className, ...props }, ref) => {
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
})

// Comment Content
export interface CommentContentProps extends React.ComponentPropsWithoutRef<typeof ScrollArea> {
  length: number
}

export const CommentContent = ({ length, children, ...props }: CommentContentProps) => {
  return (
    <ScrollArea
      className={cn('h-80 px-4 pt-2 pb-0', length > 2 && 'grid place-content-end')}
      {...props}
    >
      {children}
    </ScrollArea>
  )
}

// Comment Item
export interface CommentItemProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentItem = React.forwardRef<HTMLDivElement, CommentItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <>
        <div
          className={cn('comment flex transition hover:bg-secondary/20 px-3 pt-3 rounded-[.5rem]', className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)

export interface CommentAvaterProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  avatar_image: React.ComponentPropsWithoutRef<typeof AvatarImage>
  fallback?: React.ComponentPropsWithoutRef<typeof AvatarFallback>
}

export const CommentAvater = React.forwardRef<HTMLDivElement, CommentAvaterProps>(
  ({ avatar_image, fallback, ...props }, ref) => {
    return (
      <Avatar
        {...props}
        ref={ref}
      >
        <AvatarImage {...avatar_image} />
        {fallback && <AvatarFallback {...fallback} />}
      </Avatar>
    )
  }
)

// Comment Profile
export interface CommentProfileProps extends React.ComponentPropsWithoutRef<typeof HoverCardTrigger> {
  user: TaggedUserType
  hoverContent?: React.ReactNode
}

export const CommentProfile = React.forwardRef<HTMLAnchorElement, CommentProfileProps>(
  ({ children, hoverContent, user, className, ...props }, ref) => {
    return (
      <HoverCard>
        <HoverCardTrigger
          className={cn('cursor-pointer', className)}
          ref={ref}
          {...props}
        >
          {children}
        </HoverCardTrigger>
        <HoverCardContent className={cn('w-80 p-4')}>
          {hoverContent ? (
            hoverContent
          ) : (
            <div className="flex items-start gap-4">
              <CommentAvater
                className="w-12 h-12 border-none"
                avatar_image={{
                  src: user.avatarUrl,
                  className: 'm-0 border-none object-cover curosor-pointer',
                }}
                fallback={{
                  className: 'bg-secondary/20',
                }}
              />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@{user.name}</h4>
                <p className="text-sm">I'am a Software Engineer from Egypt.</p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">Joined May 2021</span>
                </div>
              </div>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    )
  }
)

// Comment Item Side
export interface CommentItemSideProps {
  user: TaggedUserType
}

export const CommentItemSide = React.forwardRef<HTMLDivElement, CommentItemSideProps>(({ user }, ref) => {
  return (
    <div className={cn('flex flex-col flex-shrink-0 basis-8 flex-grow-0 items-center mr-2 ')}>
      <div className="top-shape w-[2px] max-h-2 bg-border flex-grow border-border border flex basis-auto flex-col items-stretch my-1"></div>
      <CommentProfile user={user}>
        <CommentAvater
          className="w-8 h-8 border-none"
          avatar_image={{
            src: user.avatarUrl,
            className: 'm-0 border-none object-cover curosor-pointer',
          }}
          fallback={{
            className: 'bg-secondary/20',
          }}
        />
      </CommentProfile>
      <div className="bottom-shape w-[2px] bg-border flex-grow border-border border flex basis-auto flex-col items-stretch mt-1"></div>
    </div>
  )
})

// Comment Item Body
export interface CommentItemBodyProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentItemBody = React.forwardRef<HTMLDivElement, CommentItemBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn('flex flex-col items-start justify-start w-full', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Comment Item Top
export interface CommentItemTopProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentItemTop = React.forwardRef<HTMLDivElement, CommentItemTopProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-center justify-start w-full gap-2 mb-2', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Comment Item Date
export interface CommentItemDateProps extends React.HTMLProps<HTMLDivElement> {
  date: string
}

export const CommentItemDate = React.forwardRef<HTMLDivElement, CommentItemDateProps>(
  ({ date, className, children, ...props }, ref) => {
    const commentDate = new Date(date)
    const daysDifference = differenceInDays(new Date(), commentDate)
    const hoursDifference = differenceInHours(new Date(), commentDate)

    return (
      <p
        className={cn('text-xs text-muted-foreground', className)}
        ref={ref}
        {...props}
      >
        {daysDifference > 1
          ? format(commentDate, 'PP')
          : hoursDifference > 1
            ? format(commentDate, 'p')
            : formatDistance(commentDate, new Date(), { addSuffix: false, includeSeconds: true })}
      </p>
    )
  }
)

// Comment Item Top User
export interface CommentItemTopUserProps extends React.HTMLProps<HTMLDivElement> {
  user: TaggedUserType
}

export const CommentItemTopUser = React.forwardRef<HTMLDivElement, CommentItemTopUserProps>(
  ({ user, className, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-center justify-start gap', className)}
        ref={ref}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <CommentProfile user={user}>
              <Button
                variant={'link'}
                className="text-sm font-medium h-fit p-0"
              >
                {user.name}
              </Button>
            </CommentProfile>

            <Button
              variant="ghost"
              size="icon"
              className="!size-5 !bg-transparent"
              label={{
                children: 'Verified',
                showLabel: true,
                className: 'text-sm',
                side: 'top',
              }}
            >
              <BadgeCheck className={cn('size-5', 'text-background fill-blue-400')} />
            </Button>
            {user.badge &&
              user.badge.map(item => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="icon"
                  className="!size-5 !bg-transparent overflow-hidden"
                  label={{
                    children: '@' + item.title,
                    showLabel: true,
                    className: 'text-sm',
                    side: 'top',
                  }}
                >
                  <img
                    src={item.imgUrl}
                    className={cn('size-4')}
                  />
                </Button>
              ))}
          </>
        )}
      </div>
    )
  }
)

// Comment Bottom
export interface CommentBottom extends React.HTMLProps<HTMLFormElement> {}

export const CommentBottom = React.forwardRef<HTMLFormElement, CommentBottom>(
  ({ className, children, onSubmit, ...props }, ref) => {
    return (
      <form
        className={cn(
          'flex items-center justify-center border-t border-border border-solid gap-2 px-4 py-3 relative',
          className
        )}
        ref={ref}
        onSubmit={e => {
          e.preventDefault()
          onSubmit && onSubmit(e)
        }}
        {...props}
      >
        {children}
      </form>
    )
  }
)

// Comment Scroll Tracker
export const CommentScrollTracker = () => {
  const { comments } = React.useContext(CommentContext)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  const bottomRef = React.useRef<HTMLDivElement>(null)
  return (
    <div
      ref={bottomRef}
      className="h-4"
    />
  )
}

// Comment Input
export interface CommentInputProps extends React.HTMLProps<HTMLDivElement> {
  showOriginal?: boolean
}

export const CommentInput = React.forwardRef<HTMLDivElement, CommentInputProps>(
  ({ className, children, showOriginal = true, ...props }, ref) => {
    const { currentCommentContent, setCurrentCommentContent } = React.useContext(CommentContext)
    const { recording } = useAudioDataProvider()

    return (
      <div
        className={cn('relative w-full', className)}
        ref={ref}
        {...props}
      >
        {showOriginal && (
          <Input
            disabled={recording}
            placeholder="Write a comment..."
            value={currentCommentContent}
            onChange={e => {
              setCurrentCommentContent(e.target.value)
            }}
            className={cn('font-medium resize-none py-1 h-8 w-full')}
            name=""
          />
        )}
        {children}
      </div>
    )
  }
)

// Comment Bottom Buttons
export interface CommentBottomButtonsProps extends React.HTMLProps<HTMLDivElement> {}

export const CommentBottomButtons = React.forwardRef<HTMLDivElement, CommentBottomButtonsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn('flex tems-center justify-center')}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Comment Attachments
export interface CommentsAttachmentsProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const CommentsAttachments = React.forwardRef<HTMLDivElement, CommentBottomButtonsProps>(
  ({ className, children, ...props }, ref) => {
    const { recordings } = useAudioDataProvider()

    return (
      <div
        className={cn('absolute bottom-6 w-full', className)}
        ref={ref}
        {...props}
      >
        <Popover>
          <PopoverTrigger className={cn('')}>
            <Button
              size={'sm'}
              className={cn(
                'absolute left-0 gap-2 flex items-center h-fit py-1 transition-all duration-400 ease-out',
                recordings.length > 0
                  ? 'bottom-4 opacity-100 pointer-events-all'
                  : '-bottom-4 opacity-0 pointer-events-none'
              )}
              icon={{
                children: Paperclip as LucideIcon,
                className: '!size-[.8rem]',
              }}
              label={{
                children: recordings.length,
              }}
            >
              <span className="text-xs">Attachments</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className={cn('p-2 mb-1 w-full')}
          >
            <ScrollArea>
              <div className="grid items justify-start gap-2 shrink-0 w-full grid-cols-2 max-h-[104px]">
                {children
                  ? children
                  : recordings.map((recording, index) => (
                      <CommentAttachmentItem
                        key={index}
                        blob={recording}
                      />
                    ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

// Comment Attachment Item
export interface CommentAttachmentItemProps extends React.HTMLProps<HTMLDivElement> {
  blob: Blob
}

export const CommentAttachmentItem = React.forwardRef<HTMLDivElement, CommentAttachmentItemProps>(
  ({ className, blob, key, children, ...props }, ref) => {
    const { setRecordings } = useAudioDataProvider()

    return (
      <div
        className={cn(
          'rounded-md bg-secondary/50 h-fit flex items-center justify-start gap-2 w-[152px] p-2 relative',
          className
        )}
        ref={ref}
        {...props}
      >
        <CommentClose
          className="absolute top-2 right-2"
          onClick={() => {
            setRecordings(prev => prev.filter(item => item !== blob))
          }}
        />
        {children ? (
          children
        ) : (
          <>
            <FileAudio />
            <div>
              <p className="text-xs text-muted-foreground truncate">{blob.type}</p>
              <p className="text-xs text-muted-foreground">{blob.size}</p>
            </div>
          </>
        )}
      </div>
    )
  }
)

// Comment Send Button
export interface CommentSendButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const CommentSendButton = React.forwardRef<HTMLButtonElement, CommentSendButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { mention, editContent, setMdxContent } = React.useContext(MDXContext)
    const { setComments, currentCommentContent, setCurrentCommentContent } = React.useContext(CommentContext)
    const { recording } = useAudioProvider()
    const { recordings, setRecordings } = useAudioDataProvider()
    const attachments = recordings.map(r => ({
      id: uuidv7(),
      url: r,
      type: 'audio',
      filename: 'audio.mp3',
      size: r.size.toString(),
    }))

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const newComment: CommentType = {
        id: uuidv7(),
        user: users[1],
        attachments: attachments,
        content: currentCommentContent,
        likes: {
          amount: 0,
          users: [],
        },
        createdAt: new Date().toString(),
      }

      setComments &&
        setComments(prev => {
          return [...prev, newComment]
          //               if (currentCommentContent || recording) {
          // } else if (editContent) {
          //   return [editContent]
          // }

          return prev
        })

      setCurrentCommentContent('')
      setRecordings([])
      onClick && onClick(e)
    }

    return children ? (
      children
    ) : (
      <Button
        size={'icon'}
        variant={'outline'}
        className={cn(
          'rounded-full relative transition-all duration-300 origin-center w-8 h-8 m-auto bg-secondary/20',
          !recording
            ? 'scale-1 opacity-1 ml-2 translate-x-0'
            : '-translate-x-[126%] w-0 h-0 pointer-events-none opacity-0 invisible ml-0',
          className
        )}
        icon={{
          className: cn(recording ? 'scale-0 opacity-0' : 'scale-100 opacity-100'),
          children: editContent ? Check : ArrowBigUp,
        }}
        type="submit"
        disabled={recordings.length === 0}
        onClick={onClickHandler}
        ref={ref}
        {...props}
      />
    )
  }
)

//FIX: Comment Placeholder
export const CommentPlaceholder = ({ user }: { user: TaggedUserType }) => {
  const { comments: newComments } = React.useContext(CommentContext)

  return (
    <>
      {newComments.map((comment, idx) => {
        const mine = user.id == comment.user.id
        return (
          <CommentItem
            key={comment.id}
            className={cn(mine && '')}
          >
            <CommentItemSide user={comment.user} />
            <CommentItemBody>
              <CommentItemTop>
                <div className="flex items-center justify-start w-full gap-2">
                  <CommentItemTopUser user={comment.user} />
                  <CommentItemDate date={comment.createdAt} />
                </div>
                <LikeButton
                  onClick={({ e, state }) => {}}
                  likes={comment.likes}
                  user={comment.user}
                />
              </CommentItemTop>
              <CommentItemContent
                content={comment.content}
                attachments={comment.attachments}
              />
              <CommentItemBottom comment={comment} />
            </CommentItemBody>
          </CommentItem>
        )
      })}
    </>
  )
}

//FIX: Comment Item Content
export const CommentItemContent = ({ content, attachments }: { content: string; attachments: Attachment[] }) => {
  console.log(attachments)
  return (
    <div className="mdx__minimal__text__editor border-none flex flex-col gap-3 mb-2">
      {content && (
        <p
          className={cn('text-sm  tiptap ProseMirror')}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      )}
      {attachments &&
        attachments.map((item, idx) => {
          return item.type === 'audio' ? (
            <AudioItem
              key={idx}
              content={item.url as string}
            />
          ) : (
            item.type === 'image' && (
              <img
                className="w-1/2 rounded-md object-cover"
                key={idx}
                src={item.url as string}
              />
            )
          )
        })}
    </div>
  )
}

// FIX: Comment Item Bottom
export const CommentItemBottom = ({ comment }: { comment: CommentType }) => {
  const { mention, setMention } = React.useContext(MDXContext)

  return (
    <div className="flex items-center justify-center gap-2  mt-1 mb-1">
      <Button
        size={'sm'}
        variant={'ghost'}
        className="h-7 w-14 text-foreground/70 text-xs"
        onClick={() => {
          // setEditorFocus && setEditorFocus(prev => !prev)
          setMention(comment.user)
        }}
      >
        Reply
      </Button>

      <DropdownMenuView
        trigger={{
          icon: { children: Ellipsis, className: 'h-4 w-4 rounded' },
          variant: 'ghost',
          size: 'icon',
          className: 'h-4 w-6',
        }}
        content={{
          options: {
            itemType: 'label',
            optionsData: optionsData({ currentComment: comment }),
          },
        }}
      />
    </div>
  )
}

const optionsData = ({ currentComment }: { currentComment: CommentType }) => {
  const { setEditContent } = React.useContext(MDXContext)
  const { setComments } = React.useContext(CommentContext)

  return [
    {
      children: 'Edit',
      onClick: () => {
        setEditContent(currentComment)
      },
    },
    {
      children: 'Report',
      icon: {
        children: Bug,
      },
    },
    {
      children: 'Delete',
      command: { label: '⌘⌫', key: 'a' },
      icon: {
        children: Trash2,
      },
      className: '[&_span]:text-red-500 text-red-500 [&_span]:hover:text-primary',
      onClick: () => setComments(prev => prev.filter(c => c.id !== currentComment.id)),
    },
  ] as DropdownMenuOptionsDataType<string, true>[]
}

export interface CommentExtraButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const CommentExtraButton = React.forwardRef<HTMLButtonElement, CommentExtraButtonProps>(
  ({ className, ...props }, ref) => {
    const firstFocusableElement = React.useRef<HTMLDivElement>(null)
    return (
      <PopoverWrapper
        content={{
          className: 'w-fit p-2',
          children: (
            <div className="flex items justify-start gap-1 shrink-0">
              <button onFocusCapture={event => event.preventDefault()} />
            </div>
          ),
        }}
      />
    )
  }
)

export interface CommentExtraButtonTriggerProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const CommentExtraButtonTrigger = React.forwardRef<HTMLButtonElement, CommentExtraButtonTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        type="button"
        label={{
          children: 'Extra',
          showLabel: true,
          side: 'top',
        }}
        icon={{ children: Plus }}
        variant="outline"
        className={cn('rounded-full h-8 w-8 bg-secondary/20', className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export interface CommentExtraButtonItemProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const CommentExtraButtonItem = React.forwardRef<HTMLButtonElement, CommentExtraButtonItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        variant="ghost"
        className={cn('editor_button p-0', className)}
        label={{
          children: 'Upload Attachment',
          showLabel: true,
          side: 'top',
        }}
        icon={{ children: Upload }}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
