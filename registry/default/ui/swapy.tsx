'use client'

import React from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableStateSnapshot,
  DroppableProvided,
  DraggableStateSnapshot,
  DraggableProvided,
  DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd'
import { cn } from '@/lib'
import { Badge } from './badge'
import { Button } from './button'
import { EllipsisVertical, Plus } from 'lucide-react'
import { ScrollArea } from './scroll-area'

interface TaskType {
  id: string
  content: string
  avatar: string
}

interface ColumnType {
  id: string
  title: string
  taskIds: string[]
}

interface InitDataType {
  tasks: Record<string, TaskType>
  columns: Record<string, ColumnType>
  columnOrder: string[]
}

// Initial data structure with tasks and columns
const initData: InitDataType = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Take out the garbage',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/VMSU-princess-min.png',
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
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/VMSU-princess-min.png',
    },
    'task-5': {
      id: 'task-5',
      content: 'Do laundry',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/GR8R-finn-min.png',
    },
    'task-6': {
      id: 'task-6',
      content: 'Mow the lawn',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/VMSU-princess-min.png',
    },
    'task-7': {
      id: 'task-7',
      content: 'Cook dinner',
      avatar: 'https://uploads.codesandbox.io/uploads/user/cf4b346c-70d1-4313-acb0-36ea4634ca74/VMSU-princess-min.png',
    },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-6', 'task-7'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-3', 'task-4', 'task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}
// Function to reorder the list on drag end
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

// Function to move tasks between columns
const move = (
  source: string[],
  destination: string[],
  droppableSource: { index: number; droppableId: string },
  droppableDestination: { index: number; droppableId: string }
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)

  return {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  }
}

export const Swapy: React.FC = () => {
  const [state, setState] = React.useState<InitDataType>(initData)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    const sourceColumn = state.columns[source.droppableId]
    const destinationColumn = state.columns[destination.droppableId]

    // Reordering within the same column
    if (sourceColumn === destinationColumn) {
      const newTaskIds = reorder(sourceColumn.taskIds, source.index, destination.index)
      const newColumn: ColumnType = {
        ...sourceColumn,
        taskIds: newTaskIds,
      }

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      })
    } else {
      // Moving to a different column
      const result = move(sourceColumn.taskIds, destinationColumn.taskIds, source, destination)

      const newState: InitDataType = {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            taskIds: result[source.droppableId],
          },
          [destinationColumn.id]: {
            ...destinationColumn,
            taskIds: result[destination.droppableId],
          },
        },
      }

      setState(newState)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={true}
        // isCombineEnabled={isCombineEnabled}
      >
        {(provided, snapshot) => (
          <div
            className={cn(
              'flex space-around bg-[#161617] p-4 rounded-lg border border-border border-solid gap-4  mr-4'
            )}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.columnOrder.map((columnId, idx) => {
              const column = state.columns[columnId]
              const tasks = column.taskIds.map(taskId => state.tasks[taskId])

              return (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={idx}
                >
                  {(provided, snapshot) => (
                    <div
                      className="flex flex-col gap-2 bg-:w rounded-md py-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <SwapyColumnHeader
                        column={column}
                        dragHandlerProps={provided.dragHandleProps}
                      />
                      <SwapyAddColumnRow />
                      <SwapyColumnBodyDraggable
                        column={column}
                        tasks={tasks}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export const SwapyColumnHeader: React.FC<{
  column: ColumnType
  dragHandlerProps?: DraggableProvidedDragHandleProps | null
}> = ({ column, dragHandlerProps }) => {
  return (
    <div
      className={cn('flex items-center justify-between gap-2 mb-2 px-4')}
      {...dragHandlerProps}
    >
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
    </div>
  )
}

export const SwapyAddColumnRow: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-1rem px-4">
      <Button
        size={'default'}
        variant={'secondary'}
        className={cn('w-full')}
      >
        <Plus className={cn('size-5')} />
      </Button>
    </div>
  )
}

export const SwapyAddTaskRow: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-1rem px-4">
      <Button
        size={'default'}
        variant={'secondary'}
        className={cn('w-full')}
      >
        <Plus className={cn('size-5')} />
      </Button>
    </div>
  )
}

export const SwapyColumnBodyDraggable = ({ column, tasks }: { column: ColumnType; tasks: TaskType[] }) => {
  return (
    <>
      <Droppable
        key={column.id}
        droppableId={column.id}
      >
        {(provided, snapshot) => (
          <SwapyColumnBody
            provided={provided}
            snapshot={snapshot}
            column={column}
            tasks={tasks}
          />
        )}
      </Droppable>
    </>
  )
}

export const SwapyColumnBody = ({
  provided,
  snapshot,
  column,
  tasks,
}: {
  provided: DroppableProvided
  snapshot: DroppableStateSnapshot
  column: ColumnType
  tasks: TaskType[]
}) => {
  return (
    <div
      ref={provided.innerRef}
      className={cn(
        'pt-2 border-[2px] border-dashed border-transparent rounded-md transition-all',
        snapshot.isDraggingOver && 'bg-sky-100/5 border-sky-400/30',
        column.taskIds.includes(snapshot.draggingFromThisWith ?? '') && 'bg-red-100/5 border-red-400/30',
        snapshot.draggingOverWith &&
          snapshot.draggingFromThisWith === snapshot.draggingOverWith &&
          'bg-green-100/5 border-green-400/30'
      )}
      style={{
        width: 300,
        height: 500,
      }}
      // {...provided.droppableProps}
    >
      {tasks.map((task, index) => (
        <SwapyColumnRowDraggable
          key={task.id}
          task={task}
          idx={index}
        />
      ))}
      {provided.placeholder}
    </div>
  )
}

export const SwapyColumnRowDraggable = ({ task, idx }: { task: TaskType; idx: number }) => {
  return (
    <Draggable
      draggableId={task.id}
      index={idx}
    >
      {(provided, snapshot) => (
        <SwapyColumnRow
          provided={provided}
          snapshot={snapshot}
          task={task}
        />
      )}
    </Draggable>
  )
}

export const SwapyColumnRow = ({
  provided,
  snapshot,
  task,
}: {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  task: TaskType
}) => {
  const taskRef = React.useRef<HTMLDivElement>(null)

  console.log(provided.dragHandleProps)

  return (
    <div
      className="relative"
      ref={taskRef}
    >
      <div
        className={cn(
          'select-none p-3 bg-secondary border-2 border-dashed border-transparent rounded-md flex items-center gap-3 mb-2 mx-4 z-10 relative',
          snapshot.isDragging && 'opacity-95 border-red-500/50'
          // ,'bg-green-100/5 border-green-400/30'
        )}
        style={{
          ...provided.draggableProps.style,
          // transform: 'none',
        }}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <img
          src={task.avatar}
          alt={task.content}
          width={40}
          height={40}
          className="rounded-full"
        />
        {task.content}
      </div>
      {snapshot.isDragging && (
        <div
          className="absolute w-full h-full border-2 border-dashed border-red-500/40 z-0 left-1/2 -translate-x-1/2 rounded-md"
          style={{
            height: 66,
            width: 264,
          }}
        />
      )}
    </div>
  )
}
//     <div
// className={`w-[264px]  h-[66px] bg-red-500 absolute pointer-events-none z-0 top-0 left-1/2 -translate-x-1/2`}
//       />
