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

export interface TaskType {
  id: string
  content: string
  avatar: string
}

export interface ColumnType {
  id: string
  title: string
  taskIds: string[]
}

export interface InitDataType {
  tasks: Record<string, TaskType>
  columns: Record<string, ColumnType>
  columnOrder: string[]
}

interface OnDragEndType {
  result: DropResult
  state: InitDataType
  setState: React.Dispatch<React.SetStateAction<InitDataType>>
}

const onDragEnd = ({ result, state, setState }: OnDragEndType) => {
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

// Initial data structure with tasks and columns
// Function to reorder the list on drag end
export const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

// Function to move tasks between columns
export const move = (
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

export const SwapyAddColumnRow = React.memo(() => {
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
})

export const SwapyAddTaskRow = React.memo(() => {
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
})

export const SwapyColumnBodyDraggable = React.memo(
  ({
    column,
    tasks,
    kanbanColumnRow,
  }: {
    column: ColumnType
    tasks: TaskType[]
    kanbanColumnRow: KanbanColumnBodyProps
  }) => {
    return (
      <>
        <Droppable
          key={column.id}
          droppableId={column.id}
        >
          {(provided, snapshot) => (
            <SwapyColumnBody
              kanbanColumnRow={kanbanColumnRow}
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
)

export const SwapyColumnBody = React.memo(
  ({
    provided,
    snapshot,
    column,
    tasks,
    kanbanColumnRow,
  }: {
    provided: DroppableProvided
    snapshot: DroppableStateSnapshot
    column: ColumnType
    tasks: TaskType[]
    kanbanColumnRow: KanbanColumnBodyProps
  }) => {
    return (
      <div
        ref={provided.innerRef}
        className={cn(
          'pt-2 border-[2px] border-dashed border-transparent rounded-md transition-all',
          snapshot.isDraggingOver && 'bg-green-100/5 border-green-400/30',
          column.taskIds.includes(snapshot.draggingFromThisWith ?? '') && 'bg-red-100/5 border-red-400/30',
          snapshot.draggingFromThisWith === snapshot.draggingOverWith &&
            snapshot.draggingOverWith &&
            'bg-sky-100/5 border-sky-400/30'
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
            kanbanColumnRow={kanbanColumnRow}
            columnProvided={provided}
            columnSnapshot={snapshot}
            {...provided.droppableProps}
          />
        ))}
        {provided.placeholder}
      </div>
    )
  }
)

export const SwapyColumnRowDraggable = React.memo(
  ({
    task,
    idx,
    columnProvided,
    columnSnapshot,
    kanbanColumnRow,
  }: {
    task: TaskType
    idx: number
    columnProvided: DroppableProvided
    columnSnapshot: DroppableStateSnapshot
    kanbanColumnRow: KanbanColumnBodyProps
  }) => {
    return (
      <Draggable
        draggableId={task.id}
        index={idx}
      >
        {(provided, snapshot) => (
          <KanbanColumnRow
            provided={provided}
            snapshot={snapshot}
            task={task}
            kanbanColumnRow={kanbanColumnRow}
            columnProvided={columnProvided}
            columnSnapshot={columnSnapshot}
          />
        )}
      </Draggable>
    )
  }
)

//NOTE:  KanbanColumnHeader
export type KanbanColumnRowBodyContentArgs = {
  column: ColumnType
}

export interface KanbanColumnHeaderBodyProps
  extends Partial<
    Omit<React.HTMLProps<HTMLDivElement>, 'children'> & Pick<KanbanColumnHeaderProps, 'dragHandlerProps'>
  > {
  children: React.FC<KanbanColumnRowBodyContentArgs>
}

export interface KanbanColumnHeaderProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children'> {
  column: ColumnType
  dragHandlerProps?: DraggableProvidedDragHandleProps | null
  kanbanColumnHeader: KanbanColumnHeaderBodyProps
}

export const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = React.memo(
  ({ column, dragHandlerProps, kanbanColumnHeader }) => {
    const { children: KanbanColumnRowBody, className, ...restProps } = kanbanColumnHeader ?? {}

    return (
      <div
        className={cn('flex items-center justify-between gap-2 mb-2 px-4', className)}
        {...dragHandlerProps}
        {...restProps}
      >
        {<KanbanColumnRowBody column={column} />}
      </div>
    )
  }
)

//NOTE: KanbanColumnRow
export interface KanbanColumnRowComponentArgs extends Pick<KanbanColumnRowProps, 'task'> {}
export interface KanbanColumnBodyProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children'> {
  options: {
    draggingOutStyle?: string
    draggingOnOriginStyle?: string
    draggingOverNoColumnStyle?: string
  }
  children: React.FC<KanbanColumnRowComponentArgs>
}

export interface KanbanColumnRowProps {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  task: TaskType
  columnProvided: DroppableProvided
  columnSnapshot: DroppableStateSnapshot
  kanbanColumnRow: KanbanColumnBodyProps
}

export const KanbanColumnRow = React.memo(
  ({ provided, snapshot, task, columnProvided, columnSnapshot, kanbanColumnRow }: KanbanColumnRowProps) => {
    const draggingOut = task.id === columnSnapshot.draggingFromThisWith
    const draggingToOrigin = (task.id === columnSnapshot.draggingOverWith && columnSnapshot.draggingOverWith) as boolean
    const draggingOverNoColumn = snapshot.isDragging && !snapshot.draggingOver

    const { children: KanbanColumnRowBody, options } = kanbanColumnRow ?? {}
    const { draggingOutStyle, draggingOnOriginStyle, draggingOverNoColumnStyle } = options ?? {}

    const kanbanStyle = cn(
      'select-none p-3 bg-secondary border-2 border-dashed border-transparent rounded-md flex items-center gap-3 mb-2 mx-2 z-10 relative',
      draggingOut && (draggingOutStyle ? cn('border-red-400/30', draggingOutStyle) : 'border-red-400/30'),
      draggingToOrigin &&
        (draggingOnOriginStyle ? cn('border-sky-400/30', draggingOnOriginStyle) : 'border-sky-400/30'),
      //NOTE: you will have to add some outline animation here for deleting for
      //example
      draggingOverNoColumn &&
        (draggingOverNoColumnStyle ? cn('border-purple-400/30', draggingOverNoColumnStyle) : 'border-purple-400/30')
    )

    return (
      <div className="relative">
        <div
          className={kanbanStyle}
          style={{ ...provided.draggableProps.style }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <KanbanColumnRowBody task={task} />
        </div>
      </div>
    )
  }
)

// NOTE: Kanban
interface KanbanType {
  initData: InitDataType
  kanbanColumnRow: KanbanColumnBodyProps
  kanbanColumnHeader: KanbanColumnHeaderBodyProps
}

export const Kanban = React.forwardRef(
  ({ initData, kanbanColumnRow, kanbanColumnHeader }: KanbanType, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [state, setState] = React.useState<InitDataType>(initData)
    const onDragEndd = React.useCallback((result: DropResult) => onDragEnd({ state, setState, result }), [state])

    return (
      <div ref={ref}>
        <DragDropContext onDragEnd={onDragEndd}>
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
                          <KanbanColumnHeader
                            column={column}
                            kanbanColumnHeader={kanbanColumnHeader}
                            dragHandlerProps={provided.dragHandleProps}
                          />
                          <SwapyAddColumnRow />
                          <SwapyColumnBodyDraggable
                            kanbanColumnRow={kanbanColumnRow}
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
      </div>
    )
  }
)
