"use client";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "../supabase/SupabaseProvider";
import { useEffect, useState } from "react";
import { Board, ColumnWithTasks, Task } from "../supabase/models";
import { boardDataService, boardService, tasksService } from "../services";

export function useBoards() {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadBoards();
    }
  }, [user, supabase]);

  async function loadBoards() {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const data = await boardService.getAll(supabase!, user.id);
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create board");
    } finally {
      setLoading(false);
    }
  }

  async function createBoard(boardData: {
    title: string;
    description?: string;
    color?: string;
  }) {
    if (!user) throw new Error("User not authorized");
    try {
      setLoading(true);
      const newBoard = await boardDataService.createBoardWithDefaultColumns(
        supabase!,
        {
          ...boardData,
          userId: user.id,
        }
      );
      setBoards((prev) => [newBoard, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create board");
    } finally {
      setLoading(false);
    }
  }
  return { boards, loading, error, createBoard };
}

export function useBoard(boardId: string) {
  const [board, setBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<ColumnWithTasks[]>([]);
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (boardId) {
      getBoard();
    }
  }, [boardId, supabase]);

  const getBoard = async () => {
    if (!boardId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await boardDataService.getBoardWithColumns(
        supabase!,
        boardId
      );
      setBoard(data.board);
      setColumns(data.columnWithTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load board");
    } finally {
      setLoading(false);
    }
  };
  const updateBoard = async (borderId: string, newData: Partial<Board>) => {
    try {
      setLoading(true);
      const updatedBoard = await boardService.update(
        supabase!,
        borderId,
        newData
      );
      setBoard(updatedBoard);
      return updateBoard;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update Board");
    } finally {
      setLoading(false);
    }
  };
  const createTask = async (columnId: string, taskData: Partial<Task>) => {
    try {
      setLoading(true);
      const newTask = await tasksService.createTask(supabase!, {
        title: taskData.title,
        description: taskData.description || null,
        assignee: taskData.assignee || null,
        due_date: taskData.due_date || null,
        column_id: columnId,
        priority: taskData.priority || "medium",
        sort_order:
          columns.findLast((col) => col.id === columnId)?.tasks.length || 0,
      });

      setColumns((prev) =>
        prev.map((col) =>
          col.id == columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
        )
      );
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create Task");
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      await tasksService.deleteTask(supabase!, taskId);
      await getBoard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create Task");
    } finally {
      setLoading(false);
    }
  };

  const moveTask = async (
    taskId: string,
    newColumnId: string,
    newOrder: number
  ) => {
    try {
      await tasksService.moveTask(supabase!, taskId, newColumnId, newOrder);
      setColumns((prev: ColumnWithTasks[]) => {
        const newColumns = [...prev];
        let taskToMove: Task | null = null;
        for (const col of newColumns) {
          const taskIndex = col.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            taskToMove = col.tasks[taskIndex];
            col.tasks.splice(taskIndex, 1);
            break;
          }
        }
        if (taskToMove) {
          const targetColumn = newColumns.find((col) => col.id === newColumnId);
          if (targetColumn) {
            targetColumn.tasks.splice(newOrder, 0, taskToMove);
          }
        }
        return newColumns;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create Task");
    }
  };

  return {
    board,
    columns,
    loading,
    error,
    deleteTask,
    updateBoard,
    createTask,
    setColumns,
    moveTask,
  };
}
