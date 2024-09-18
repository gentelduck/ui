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
import { MDXContext } from '../example/mdx-context-provider'

export const CommentTest = ({ user, comments }: { user: TaggedUserType; comments: CommentType[] }) => {
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const { comments: newComments, setComments } = React.useContext(MDXContext)
  const fullComments: CommentType[] = newComments.length === 0 ? comments : newComments
  console.log(fullComments)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  return (
    <ScrollArea className={cn('h-80 p-4 pb-0', comments.length > 2 && 'grid place-content-end')}>
      <div className="flex flex-col justify-end">
        {fullComments.map((comment, idx) => {
          const mine = user.id == comment.user.id
          return (
            <Comment
              key={comment.id}
              mine={mine}
              className={cn(mine && '')}
              comment={comment}
              showNestedShapes={comments.length === idx + 1 ? false : true}
              setComments={setComments}
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
  showNestedShapes?: boolean
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
}

export const Comment: React.FC<CommentProps> = ({
  setComments,
  showNestedShapes,
  mine,
  comment,
  className,
  ...props
}) => {
  const commentDate = new Date(comment.createdAt!)
  const daysDifference = differenceInDays(new Date(), commentDate)
  const hoursDifference = differenceInHours(new Date(), commentDate)

  return (
    <>
      <div
        className={cn('flex mt-1', className)}
        {...props}
      >
        <div
          className={cn(
            'flex flex-col flex-shrink-0 basis-[40px] flex-grow-0 items-center mr-2',
            !showNestedShapes && '-mt-4'
          )}
        >
          {!showNestedShapes && (
            <div className="w-[2px] max-h-2 bg-border flex-grow border-border border flex basis-auto flex-col items-stretch my-1"></div>
          )}
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
          {showNestedShapes && (
            <div className="w-[2px] bg-border flex-grow border-border border flex basis-auto flex-col items-stretch mt-1"></div>
          )}
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-center justify-start w-full gap-2 mb-2">
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
          <CommentBottom
            setComments={setComments}
            comment={comment}
          />
        </div>
      </div>
    </>
  )
}

export const CommentBottom = ({
  setComments,
  comment,
}: {
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
  comment: CommentType
}) => {
  const { mention, setMention } = React.useContext(MDXContext)

  return (
    <div className="flex items-center justify-center gap-2  mt-1 mb-2">
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
            optionsData: optionsData({ setComments, currentComment: comment }),
          },
        }}
      />
    </div>
  )
}

const optionsData = ({
  setComments,
  currentComment,
}: {
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>
  currentComment: CommentType
}) => {
  const { setEditContent } = React.useContext(MDXContext)
  return [
    {
      children: 'Edit',
      onClick: () => {
        setEditContent(currentComment)
        // editorMention.current = {}
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

export const ChatBottom = ({
  comments,
  setComments,
}: {
  editorContent: string
  setEditorContent?: React.Dispatch<React.SetStateAction<string>>
  setEditorFocus?: React.Dispatch<React.SetStateAction<boolean>>
  comments: CommentType[]
  setComments?: React.Dispatch<React.SetStateAction<CommentType[]>>
}) => {
  const { mention, editContent, mdxContent, setMdxContent } = React.useContext(MDXContext)

  console.log(mdxContent)

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

          console.log(newComment)
          setComments &&
            setComments(prev => {
              return [...prev, newComment]
              //               if (mdxContent) {
              // } else if (editContent) {
              //   return [editContent]
              // }
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
