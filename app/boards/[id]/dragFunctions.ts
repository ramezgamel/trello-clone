import { ColumnWithTasks, Task } from "@/lib/supabase/models";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";

export function handleDragStart(
  e: DragStartEvent,
  columns: ColumnWithTasks[],
  setActiveTask: (task: Task) => void
) {
  const taskId = e.active.id as string;
  const task: Task | undefined = columns
    .flatMap((col) => col.tasks)
    .find((task) => task?.id == taskId);
  if (task) {
    setActiveTask(task);
  }
}
export function handleDragOver(
  e: DragOverEvent,
  columns: ColumnWithTasks[],
  setColumns: React.Dispatch<React.SetStateAction<ColumnWithTasks[]>>
) {
  const { active, over } = e;
  if (!over) return;
  const activeId = active.id as string;
  const overId = over.id as string;
  const sourceColumn = getSourceColumn(columns, activeId);
  const targetColumn = getTargetColumn(columns, overId);
  if (!sourceColumn || !targetColumn) return;
  if (sourceColumn.id === targetColumn.id) {
    const activeTaskIndex = sourceColumn.tasks.findIndex(
      (t) => t.id === activeId
    );
    const overTaskIndex = targetColumn.tasks.findIndex((t) => t.id === overId);
    if (activeTaskIndex !== overTaskIndex) {
      setColumns((prev: ColumnWithTasks[]) => {
        const newColumns = [...prev];
        const column = newColumns.find((col) => col.id === sourceColumn.id);
        if (column) {
          const tasks = [...column.tasks];
          const [removed] = tasks.splice(activeTaskIndex, 1);
          tasks.splice(overTaskIndex, 0, removed);
          column.tasks = tasks;
        }
        return newColumns;
      });
    }
  }
}
export async function handleDragEnd(
  e: DragEndEvent,
  columns: ColumnWithTasks[],
  moveTask: (taskId: string, newColumnId: string, newOrder: number) => void
) {
  const { active, over } = e;
  if (!over) return;
  const taskId = active.id as string;
  const overId = over.id as string;
  const sourceColumn = getSourceColumn(columns, taskId);
  const targetColumn = getTargetColumn(columns, overId);
  if (targetColumn) {
    if (sourceColumn && sourceColumn.id !== targetColumn.id) {
      await moveTask(taskId, targetColumn.id, targetColumn.tasks.length);
    }
  } else {
    const targetColumn = getSourceColumn(columns, overId);

    if (sourceColumn && targetColumn) {
      const oldIndex = sourceColumn.tasks.findIndex((t) => t.id === taskId);
      const newIndex = targetColumn.tasks.findIndex((t) => t.id === overId);
      if (oldIndex !== newIndex) {
        await moveTask(taskId, targetColumn.id, newIndex);
      }
    }
  }
}

function getSourceColumn(
  columns: ColumnWithTasks[],
  taskId: string
): ColumnWithTasks | undefined {
  return columns.find((col) => col.tasks.some((t) => t.id === taskId));
}
function getTargetColumn(
  columns: ColumnWithTasks[],
  overId: string
): ColumnWithTasks | undefined {
  return columns.find((col) => col.id == overId);
}
