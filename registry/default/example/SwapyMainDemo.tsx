'use client'
import { cn } from '@/lib'
import {
  Badge,
  InitDataType,
  Kanban,
  KanbanColumnHeaderProps,
  KanbanColumnRowBodyContentArgs,
  KanbanColumnRowComponentArgs,
} from '../ui'
import { EllipsisVertical } from 'lucide-react'

export const initData: InitDataType = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Take out the garbage',
      avatar: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
    },
    'task-2': {
      id: 'task-2',
      content: 'Watch my favorite show',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/VMSU-princess-min.png',
    },
    'task-3': {
      id: 'task-3',
      content: 'Charge my phone',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/GR8R-finn-min.png',
    },
    'task-4': {
      id: 'task-4',
      content: 'Cook dinner',
      avatar: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
    },
    'task-5': {
      id: 'task-5',
      content: 'Do laundry',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/GR8R-finn-min.png',
    },
    'task-6': {
      id: 'task-6',
      content: 'Mow the lawn',
      avatar: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
    },
    'task-7': {
      id: 'task-7',
      content: 'IDK Sucking some problems?? on leet code!!',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/VMSU-princess-min.png',
    },
    'task-8': {
      id: 'task-8',
      content: 'Maybe fucking around with some engs.',
      avatar:
        'https://i.seadn.io/gae/ntWWVYeTM2UtaELGWthKDjv0yOS3WX4Nim3NI_Kz50FvVIVvselU9YI48qmGdG0BOn3EvU862MX3SYTTqrgAgoQWSklD9m7dCpug?auto=format&dpr=1&w=1000',
    },
    'task-9': {
      id: 'task-9',
      content: 'Go to the gym',
      avatar:
        'https://w7.pngwing.com/pngs/272/789/png-transparent-adventure-time-angry-ice-king-cartoons-adventure-time-thumbnail.png',
    },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-9'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-6', 'task-7', 'task-8'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-3', 'task-4', 'task-5'],
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
  return (
    <>
      <img
        src={task.avatar}
        alt={task.content}
        width={40}
        height={40}
        className="rounded-full object-cover h-[40px] bg-white"
      />
      {task.content}
    </>
  )
}
