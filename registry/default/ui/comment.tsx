import React, { useEffect } from 'react'
import { CommentType, TaggedUserType } from './swapy'
import { differenceInDays, differenceInHours, format, formatDistance, formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib'
import { AvatarCustom } from './avatar'
import { LikeButton, ReplyButton } from '../example/SwapyMainDemo'
import { Separator } from './ShadcnUI'
import localFont from 'next/font/local'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { ArrowBigUp, Plus } from 'lucide-react'
import { uuidv7 } from 'uuidv7'

export const CommentTest = ({
  comments,
  user,
  setEditorFocus,
}: {
  setEditorFocus?: React.Dispatch<React.SetStateAction<boolean>>
  comments: CommentType[]
  user: TaggedUserType
}) => {
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  return (
    <ScrollArea className={cn('h-80 p-4 pb-0', comments.length > 2 && 'grid place-content-end')}>
      <div className="flex flex-col justify-end gap-2 ">
        {comments.map(comment => {
          const mine = user.id == comment.user.id
          return (
            <Comment
              key={comment.id}
              mine={mine}
              className={cn(mine && 'bg-primary/15')}
              setEditorFocus={setEditorFocus}
              comment={comment}
            />
          )
        })}
      </div>

      <div
        ref={bottomRef}
        className="h-4"
      />
    </ScrollArea>
  )
}

export interface CommentProps extends React.HTMLProps<HTMLDivElement> {
  mine: boolean
  comment: CommentType
  setEditorFocus?: React.Dispatch<React.SetStateAction<boolean>>
}

// Font files can be colocated inside of `pages`
const EmojiFont = localFont({ src: '../../../assets/fonts/font.ttf' })
export const Comment: React.FC<CommentProps> = ({ setEditorFocus, mine, comment, className, ...props }) => {
  const commentDate = new Date(comment.createdAt!)
  const daysDifference = differenceInDays(new Date(), commentDate)
  const hoursDifference = differenceInHours(new Date(), commentDate)

  return (
    <div
      className={cn(
        'flex items-start justify-start gap-2 bg-secondary/40 p-4 py-o rounded-md hover:bg-secondary/70',
        className
      )}
      {...props}
    >
      <AvatarCustom
        className="w-8 h-8"
        avatar_image={{
          // ...comment.user,
          src: comment.user.avatarUrl,
        }}
        fallback={{
          className: 'w-8 h-8',
        }}
      />
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex items-center justify-start w-full gap-2">
          <div className="flex items-center justify-start w-full gap-2">
            <p className="text-sm font-medium">{comment.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {daysDifference > 1
                ? format(commentDate, 'PP')
                : hoursDifference > 1
                  ? format(commentDate, 'p')
                  : formatDistance(commentDate, new Date(), { addSuffix: false, includeSeconds: true })}
            </p>
          </div>
          <LikeButton likes={comment.likes} />
        </div>
        <p
          className={cn('text-sm')}
          dangerouslySetInnerHTML={{ __html: comment.content }}
        ></p>
        <div className="flex items-center justify-center gap-2">
          <Button
            size={'sm'}
            variant={'ghost'}
            className="h-7 w-14 mt-2 text-foreground/70 text-xs"
            onClick={() => setEditorFocus && setEditorFocus(prev => !prev)}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  )
}

export const ChatBottom = ({
  setEditorContent,
  editorContentRef,
  setEditorFocus,
  comments,
  setComments,
}: {
  editorContentRef: React.MutableRefObject<string>
  setEditorContent?: React.Dispatch<React.SetStateAction<string>>
  setEditorFocus?: React.Dispatch<React.SetStateAction<boolean>>
  comments: CommentType[]
  setComments?: React.Dispatch<React.SetStateAction<CommentType[]>>
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        size={'icon'}
        variant={'outline'}
        className="rounded-full h-8 w-8 bg-secondary/20"
        icon={{
          children: Plus,
        }}
      />
      <Button
        size={'icon'}
        variant={'outline'}
        className={cn('rounded-full h-8 w-8 bg-secondary/20')}
        disabled={editorContentRef.current.length == 0}
        onClick={() => {
          setComments &&
            setComments([
              ...comments,
              {
                ...comments[0],
                id: uuidv7(),
                content: editorContentRef.current,
                likes: {
                  amount: 0,
                  users: [],
                },
                createdAt: new Date().toString(),
                user: {
                  id: 'user-2',
                  name: 'wildduck',
                  avatarUrl:
                    'https://media.licdn.com/dms/image/v2/D4D03AQGLX-Gb_qm3Rw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725258661460?e=2147483647&v=beta&t=sajP4AdQ68WfKRPPirMnLXbn4J1oIOSDBfGnuwqZ6SQ',
                },
              },
            ])

          editorContentRef.current = ''
          // console.log(editorContent)
          setEditorContent && setEditorContent('')
          setEditorFocus && setEditorFocus(false)
        }}
        icon={{
          children: ArrowBigUp,
        }}
      />
    </div>
  )
}
