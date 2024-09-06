'use client'
import { cn } from '@/lib'
import {
  AlertDialogCustom,
  Badge,
  Button,
  Checkbox,
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
          id: 'subtask-1',
          title: 'Home data fetching',
        },
      ],
      attachments: [{}],
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
      taggedUsers: [],
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
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-1'],
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
      <div>
        <div className={cn('flex flex-col gap-2 mb-3')}>
          {subtasks.map(subtask => (
            <div
              key={subtask.id}
              className={cn('flex items-center justify-start gap-2')}
            >
              <Checkbox
                className={cn('w-4 h-4 rounded-full border-muted-foreground/80')}
                // checked
              />
              <h3 className={cn('text-sm text-muted-foreground')}>{subtask.title}</h3>
            </div>
          ))}
        </div>
        <Separator className={cn('my-2 h-[1px] bg-muted-foreground/20')} />
        <Button
          variant="ghost"
          // size="sm"
          className="w-full hover:bg-muted-foreground/20 justify-start"
          icon={{
            icon: Plus,
          }}
        >
          Add subtask
        </Button>
      </div>
    </div>
  )
}
