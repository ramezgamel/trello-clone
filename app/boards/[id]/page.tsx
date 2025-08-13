"use client";
import Error from "@/components/shared/Error";
import { useBoard } from "@/lib/hooks/useBoards";
import { ColumnWithTasks, Task } from "@/lib/supabase/models";
import { useParams } from "next/navigation";
import DroppableColumn from "./DroppableColumn";
import SortableTask from "./SortableTask";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TaskOverLay from "./TaskOverLay";
import {
  handleDragEnd,
  handleDragOver,
  handleDragStart,
} from "./dragFunctions";
import AddTaskDialog from "@/components/dialogs/AddTaskDialog";
import AddColumnDialog from "@/components/dialogs/AddColumnDialog";
import BoardNav from "@/components/navbar/BoardNav";
import PageLoader from "@/components/shared/PageLoader";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const {
    columns,
    loading,
    error,
    setColumns,
    moveTask,
    createColumn,
    updateBoard,
    createTask,
    updateColumn,
    board,
  } = useBoard(id);
  const [filter, setFilter] = useState({
    priority: [] as string[],
    assignee: [] as string[],
    dueDate: null as string | null,
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const filterColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) => {
      if (
        filter.priority.length > 0 &&
        !filter.priority.includes(task.priority)
      )
        return false;
      if (filter.dueDate && task.due_date) {
        const taskDate = new Date(task.due_date).toDateString();
        const filterDate = new Date(filter.dueDate).toDateString();
        if (taskDate !== filterDate) return false;
      }
      return true;
    }),
  }));
  if (error) return <Error error={error} />;

  return (
    <>
      {loading && <PageLoader />}
      <BoardNav
        board={board}
        loading={loading}
        updateBoard={updateBoard}
        filter={filter}
        setFilter={setFilter}
      />
      <main className="container mx-auto px-2 sm:px-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Total Tasks: </span>
              {columns.reduce(
                (sum: number, col: ColumnWithTasks) => sum + col.tasks.length,
                0
              )}
            </div>
          </div>
          <AddTaskDialog
            createTask={createTask}
            loading={loading}
            targetColumnId={columns[0]?.id}
            boardId={id}
          />
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={(e) => handleDragStart(e, columns, setActiveTask)}
          onDragOver={(e) => handleDragOver(e, columns, setColumns)}
          onDragEnd={(e) => handleDragEnd(e, columns, moveTask)}
        >
          <div className="flex flex-col lg:flex-row lg:space-x-6 lg:overflow-x-auto lg:pb-6 lg:-mx-x lg:[&::-webkit-scrollbar]:h2 lg:[&::-webkit-scrollbar-track]:bg-gray-100 lg:[&::-webkit-scrollbar-thumb]:bg-gray-300 lg:[&::-webkit-scrollbar-thumb]:rounded-full space-y-4 lg:space-y-0">
            {filterColumns.map((column, i) => (
              <DroppableColumn
                loading={loading}
                updateColumn={updateColumn}
                column={column}
                key={i}
              >
                <SortableContext
                  items={column.tasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {column.tasks.map((task) => (
                    <SortableTask key={task.id} task={task} />
                  ))}
                </SortableContext>
                <AddTaskDialog
                  createTask={createTask}
                  loading={loading}
                  targetColumnId={column.id}
                  boardId={id}
                  asCard
                />
              </DroppableColumn>
            ))}
            <AddColumnDialog createColumn={createColumn} loading={loading} />
            <DragOverlay>
              {activeTask ? <TaskOverLay task={activeTask} /> : null}
            </DragOverlay>
          </div>
        </DndContext>
      </main>
    </>
  );
}
