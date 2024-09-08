'use client'
import { cn } from '@/lib'
import {
  AlertDialogCustom,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  ImageGroup,
  InitDataType,
  Kanban,
  KanbanColumnAddRowBodyArgs,
  KanbanColumnRowBodyContentArgs,
  KanbanColumnRowComponentArgs,
  Separator,
} from '../ui'
import { EllipsisVertical, Plus } from 'lucide-react'
import React from 'react'

export const initData: InitDataType = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Page "About" and "Contact" components',
      description: "Page 'About' and 'Contact' components are not rendered because it is not the main page",
      subtasks: [
        {
          id: 'subtask-1',
          title: 'About page',
        },
        {
          id: 'subtask-2',
          title: 'Home data fetching',
        },
      ],
      attachments: [
        {
          id: 'attachment-1',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/princess-min.d694ac37.png',
        },
        {
          id: 'attachment-2',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
        },
        {
          id: 'attachment-3',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/bmo-min.b4f5c828.png',
        },
        {
          id: 'attachment-4',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/finn-min.008b490d.png',
        },
        {
          id: 'attachment-5',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
        },
        {
          id: 'attachment-6',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/bmo-min.b4f5c828.png',
        },
        {
          id: 'attachment-7',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/princess-min.d694ac37.png',
        },
        {
          id: 'attachment-8',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
        },
        {
          id: 'attachment-9',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/princess-min.d694ac37.png',
        },
        {
          id: 'attachment-10',
          type: 'image',
          filename: 'image.png',
          url: 'https://dnd.hellopangea.com/static/media/bmo-min.b4f5c828.png',
        },
      ],
      links: [
        {
          id: 'link-1',
          title: 'Link 1',
        },
      ],
      comments: [
        {
          id: 'comment-1',
          content: 'Comment 1',
        },
      ],
      taggedUsers: [
        {
          id: 'user-1',
          name: 'John Doe',
          avatarUrl:
            'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 'user-2',
          name: 'Jane Doe',
          avatarUrl:
            'https://images.unsplash.com/photo-1723200166097-4eed8c141f03?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 'user-3',
          name: 'John Smith',
          avatarUrl:
            'https://images.unsplash.com/photo-1659857279356-0a8d7d23b653?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
      labels: [
        {
          id: 'label-1',
          content: 'Design',
        },
        {
          id: 'label-2',
          content: 'Website',
        },
      ],
      options: [{}],
    },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default function SwapyMainDemo() {
  return (
    <div className="flex items-start gap-4 p-4  select-none">
      <Kanban
        initData={initData}
        kanbanColumnHeader={{ children: KanbanColumnHeaderTemplate, className: 'bg-red-500' }}
        kanbanColumnAddRow={{ children: KanbanColumnAddRowTemplate }}
        kanbanColumnRow={{
          children: KanbanColumnRowTemplate,
          options: {
            draggingOnOriginStyle: 'hidden',
            draggingOutStyle: 'sdfsdfsdf',
          },
        }}
      />
    </div>
  )
}

export const KanbanColumnAddRowTemplate: React.FC<KanbanColumnAddRowBodyArgs> = () => {
  const [data, setData] = React.useState(['sdf'])
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <AlertDialogCustom
      type="sheet"
      // drawerData={data.length > 0}
      header={{
        head: 'Add Task',
        description: 'Set your daily tasks here.',
      }}
      footer={{
        className: 'flex w-full justify-between items-end',
        submit: <Button variant="default">Submit</Button>,
        cancel: <Button variant="outline">Cancel</Button>,
      }}
      state={goal}
      trigger={{
        children: (
          <div className="flex items-center gap-2 mb-1rem px-4">
            <Button
              size={'default'}
              variant={'secondary'}
              className={cn('w-full')}
            >
              <Plus className={cn('size-5')} />
            </Button>
          </div>
        ),
      }}
      content={{
        className:
          '[&>div]:flex [&>div]:flex-col [&>div]:place-content-center [&>div]:w-full [&>div]:place-self-center sm:max-w-[450px]',
        children: (
          <ContentComponent
            goal={goal}
            onClick={onClick}
          />
        ),
      }}
    />
  )
}
export const ContentComponent = ({ goal, onClick }: { goal: number; onClick: (adjustment: number) => void }) => {
  const [title, setTitle] = React.useState<string>('')
  return (
    <div className="w-full h-[84vh] flex items-start justify-center pt-4 pb-2">
      <div className="p-4 pb-0">
        <form className="w-full">
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="goal"
              >
                title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="goal"
                type="number"
                placeholder="Goal"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="goal"
              >
                title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="goal"
                type="number"
                placeholder="Goal"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const KanbanColumnHeaderTemplate: React.FC<KanbanColumnRowBodyContentArgs> = ({ column }) => {
  return (
    <>
      <div className={cn('flex items-center gap-2')}>
        <Badge
          size={'icon'}
          className={cn('size-[9px] bg-red-500')}
        />
        <h3>{column.title}</h3>
        <span>{column.taskIds.length}</span>
      </div>
      <div>
        <EllipsisVertical className={cn('size-5')} />
      </div>
    </>
  )
}

export const KanbanColumnRowTemplate: React.FC<KanbanColumnRowComponentArgs> = ({ task }) => {
  const { id, links, title, labels, options, comments, subtasks, attachments, description, taggedUsers } = task ?? {}
  return (
    <div className="w-full">
      <div className={cn('flex items-center justify-between mb-[1rem]')}>
        <div className={cn('flex items-center gap-2')}>
          {labels.map((label, index) => (
            <Badge
              key={label.id}
              className={cn('', label.className)}
            >
              {label.content}
            </Badge>
          ))}
        </div>
        <EllipsisVertical className={cn('size-5')} />
      </div>
      <div className={cn('flex flex-col items-center justify-between mb-[1rem] gap-2')}>
        <h3 className={cn('text-lg font leading-none tracking-tight')}>{title}</h3>
        <p className={cn('text-sm text-muted-foreground')}>{description}</p>
      </div>
      <div className={cn('flex flex-col items-center justify-between mb-[1rem]')}>
        <CheckboxGroup subtasks={subtasks} />
        <Separator className={cn('my-2 h-[1px] bg-muted-foreground/20')} />
        <Button
          variant="ghost"
          className="w-full hover:bg-muted-foreground/20 justify-start"
          icon={{
            icon: Plus,
          }}
        >
          Add subtask
        </Button>
      </div>
      <div className="flex items-center justify-start gap-2 mb-3">
        <ImageGroup
          imgs={attachments}
          max_imgs={6}
        />
      </div>
      <div className={cn('relative pt-4 overflow')}>
        <div
          className={cn(
            'flex items-center justify-start gap-2 shrink-0',
            'after:content-[""] after:w-[150%] after:h-[3px] after:bg-muted-foreground/20 after:absolute after:top-0 after:-translate-x-1/2 after:left-1/2 after:bg-zinc-900 relative pt-3'
          )}
        >
          <AvatarGroup users={taggedUsers} />
        </div>
      </div>
    </div>
  )
}
