import React from 'react'
import { CommentType, TaggedUserType } from './swapy'
import { differenceInDays, differenceInHours, format, formatDistance } from 'date-fns'
import { cn } from '@/lib'
import { AvatarCustom } from './avatar'
import { LikeButton } from '../example/SwapyMainDemo'
import { ScrollArea } from './scroll-area'
import { Button } from './button'
import { ArrowBigUp, Bug, Check, Ellipsis, Pencil, Plus, Trash2 } from 'lucide-react'
import { uuidv7 } from 'uuidv7'
import { DropdownMenuOptionsDataType, DropdownMenuView } from './dropdown-menu'

import 'highlight.js/styles/tokyo-night-dark.css'
import { MDXContext, CommentsContext } from '../example/mdx-context-provider'

export const CommentTest = ({ user, comments }: { user: TaggedUserType; comments: CommentType[] }) => {
  return (
    <ScrollArea className={cn('h-80 px-4 pt-2 pb-0', comments.length > 2 && 'grid place-content-end')}>
      <div className="comments flex flex-col justify-end">
        {comments.map((comment, idx) => {
          const mine = user.id == comment.user.id
          return (
            <Comment
              key={comment.id}
              mine={mine}
              className={cn(mine && '')}
              comment={comment}
              showNestedShapes={comments.length === idx + 1 ? false : true}
            />
          )
        })}
        <CommentsPlaceholder user={user} />
      </div>
      <CommentScrollDiv />
    </ScrollArea>
  )
}

export const CommentScrollDiv = () => {
  const { comments } = React.useContext(CommentsContext)

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

export const CommentsPlaceholder = ({ user }: { user: TaggedUserType }) => {
  const { comments: newComments } = React.useContext(CommentsContext)
  return (
    <>
      {newComments.map((comment, idx) => {
        const mine = user.id == comment.user.id
        return (
          <Comment
            key={comment.id}
            mine={mine}
            className={cn(mine && '')}
            comment={comment}
            showNestedShapes={newComments.length === idx + 1 ? false : true}
          />
        )
      })}
    </>
  )
}

export interface CommentProps extends React.HTMLProps<HTMLDivElement> {
  mine: boolean
  comment: CommentType
  showNestedShapes?: boolean
}

export const Comment: React.FC<CommentProps> = ({ showNestedShapes, mine, comment, className, ...props }) => {
  const commentDate = new Date(comment.createdAt!)
  const daysDifference = differenceInDays(new Date(), commentDate)
  const hoursDifference = differenceInHours(new Date(), commentDate)

  return (
    <>
      <div
        className={cn('comment flex mt-1', className)}
        {...props}
      >
        <div className={cn('flex flex-col flex-shrink-0 basis-[40px] flex-grow-0 items-center mr-2')}>
          <div className="top-shape w-[2px] max-h-2 bg-border flex-grow border-border border flex basis-auto flex-col items-stretch my-1"></div>
          <AvatarCustom
            className="w-8 h-8"
            hover_card={comment.user}
            avatar_image={{
              src: comment.user.avatarUrl,
            }}
            fallback={{
              className: 'w-8 h-8',
            }}
          />
          <div className="bottom-shape w-[2px] bg-border flex-grow border-border border flex basis-auto flex-col items-stretch mt-1"></div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-center justify-start w-full gap-2 mb-2">
            <div className="flex items-center justify-start w-full gap-2">
              <p className="text-sm font-medium">{comment.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {daysDifference > 1
                  ? format(commentDate, 'PP')
                  : hoursDifference > 1
                    ? format(commentDate, 'p')
                    : formatDistance(commentDate, new Date(), { addSuffix: false, includeSeconds: true })}
              </p>
            </div>
            <LikeButton
              likes={comment.likes}
              user={comment.user}
            />
          </div>
          <div className="mdx__minimal__text__editor border-none">
            <p
              className={cn('text-sm  tiptap ProseMirror')}
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></p>
          </div>
          <CommentBottom comment={comment} />
        </div>
      </div>
    </>
  )
}

export const CommentBottom = ({ comment }: { comment: CommentType }) => {
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
  const { setComments } = React.useContext(CommentsContext)

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

export const ChatBottom = ({ comments }: { comments: CommentType[] }) => {
  const { mention, editContent, mdxContent, setMdxContent } = React.useContext(MDXContext)
  const { setComments } = React.useContext(CommentsContext)

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
        disabled={mdxContent.length === 0}
        onClick={() => {
          const newComment: CommentType = {
            ...comments[0],
            id: uuidv7(),
            content: mdxContent,
            likes: {
              amount: 0,
              users: [],
            },
            createdAt: new Date().toString(),
          }

          setComments &&
            setComments(prev => {
              if (mdxContent) {
                return [...prev, newComment]
              } else if (editContent) {
                return [editContent]
              }

              return prev
            })

          setMdxContent('')
        }}
        icon={{
          children: editContent ? Check : ArrowBigUp,
        }}
      />
    </div>
  )
}
