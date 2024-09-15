import React, { useEffect } from 'react'
import { CommentType, TaggedUserType } from './swapy'
import { differenceInDays, format, formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib'
import { AvatarCustom } from './avatar'
import { LikeButton, ReplyButton } from '../example/SwapyMainDemo'
import { Separator } from './ShadcnUI'
import localFont from 'next/font/local'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { ArrowBigUp, Plus } from 'lucide-react'

export const CommentTest = ({ comments, user }: { comments: CommentType[]; user: TaggedUserType }) => {
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  return (
    <ScrollArea className={cn('h-80 p-4', comments.length > 2 && 'grid place-content-end')}>
      <div className="flex flex-col justify-end gap-2 ">
        {comments.map(comment => {
          const mine = user.id == comment.user.id
          return (
            <Comment
              key={comment.id}
              mine={mine}
              className={cn(mine && 'bg-primary/15')}
              comment={comment}
            />
          )
        })}
      </div>

      <div ref={bottomRef} />
    </ScrollArea>
  )
}

export interface CommentProps extends React.HTMLProps<HTMLDivElement> {
  mine: boolean
  comment: CommentType
}

// Font files can be colocated inside of `pages`
const EmojiFont = localFont({ src: '../../../assets/fonts/font.ttf' })
export const Comment: React.FC<CommentProps> = ({ mine, comment, className, ...props }) => {
  const commentDate = new Date(comment.createdAt!)
  const daysDifference = differenceInDays(new Date(), commentDate)

  return (
    <div
      className={cn(
        'flex items-start justify-start gap-2 bg-secondary/40 p-4 rounded-md hover:bg-secondary/70',
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
      <div className="flex flex-col items-start justify-start gap-2 w-full">
        <div className="flex items-center justify-start w-full gap-2">
          <div className="flex items-center justify-start w-full gap-2">
            <p className="text-sm font-medium">{comment.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {daysDifference > 1 ? format(commentDate, 'PP') : formatDistanceToNow(commentDate, { addSuffix: true })}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <LikeButton likes={comment.likes} />
            <Separator
              orientation="vertical"
              className="h-4 bg-muted-foreground/80"
            />
            <ReplyButton />
          </div>
          {mine ? <></> : <></>}
        </div>
        <p className={cn('text-sm', EmojiFont.className)}>{comment.content}</p>
        {
          // FIX: idk what the fuck to fix but it's a red line to break the code <3
          // TODO: you have to make some magic here :D
        }
        <div className=""></div>
      </div>
    </div>
  )
}

export const ChatBottom = ({
  editorContentRef,
  comments,
  setComments,
}: {
  editorContentRef: React.MutableRefObject<string>
  comments: CommentType[]
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
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
        className="rounded-full h-8 w-8 bg-secondary/20"
        onClick={() => {
          setComments([
            ...comments,
            {
              ...comments[0],
              content: editorContentRef.current,
              user: {
                id: 'user-2',
                name: 'wildduck',
                avatarUrl:
                  'https://media.licdn.com/dms/image/v2/D4D03AQGLX-Gb_qm3Rw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725258661460?e=2147483647&v=beta&t=sajP4AdQ68WfKRPPirMnLXbn4J1oIOSDBfGnuwqZ6SQ',
              },
            },
          ])
          editorContentRef.current = ''
        }}
        icon={{
          children: ArrowBigUp,
        }}
      />
    </div>
  )
}
