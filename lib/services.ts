import { SupabaseClient } from "@supabase/supabase-js";
import { Board, Column, Task } from "./supabase/models";

export const boardService = {
  async getAll(supabase: SupabaseClient, userId: string): Promise<Board[]> {
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async create(
    supabase: SupabaseClient,
    board: Omit<Board, "id" | "created_at" | "updated_at">
  ): Promise<Board> {
    const { data, error } = await supabase
      .from("boards")
      .insert(board)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // async getOne(
  //   supabase: SupabaseClient,
  //   boardId: string
  // ): Promise<{
  //   board: Board | null;
  //   loading: boolean | null;
  //   error: string | null;
  // }> {
  //   let loading: boolean = false;
  //   let error: null | string = null;
  //   let board: Board | null = null;
  //   try {
  //     loading = true;
  //     const { data } = await supabase
  //       .from("boards")
  //       .select("*")
  //       .eq("id", boardId)
  //       .single();
  //     board = data;
  //   } catch (err) {
  //     error = err instanceof Error ? err.message : "Failed to load board";
  //   } finally {
  //     loading = false;
  //   }
  //   return { board, loading, error };
  // },
  async getOne(supabase: SupabaseClient, boardId: string): Promise<Board> {
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("id", boardId)
      .single();
    if (error) throw error;
    return data;
  },
  async update(
    supabase: SupabaseClient,
    borderId: string,
    newData: Partial<Board>
  ): Promise<Board> {
    const { data, error } = await supabase
      .from("boards")
      .update({ ...newData, updated_at: new Date().toLocaleDateString() })
      .eq("id", borderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async delete() {},
};

export const columnService = {
  async getAll(supabase: SupabaseClient, userId: string): Promise<Column[]> {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async create(
    supabase: SupabaseClient,
    column: Omit<Column, "id" | "created_at">
  ): Promise<Column> {
    const { data, error } = await supabase
      .from("columns")
      .insert(column)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getOne(supabase: SupabaseClient, boardId: string) {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("board_id", boardId)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data;
  },
  async update(
    supabase: SupabaseClient,
    title: string,
    columnId: string
  ): Promise<Column> {
    const { data, error } = await supabase
      .from("columns")
      .update({ title })
      .eq("id", columnId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async delete() {},
};

export const tasksService = {
  async getTasksByBoard(
    supabase: SupabaseClient,
    boardId: string
  ): Promise<Task[]> {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        *,
        columns!inner(board_id)
        `
      )
      .eq("columns.board_id", boardId)
      .order("sort_order", { ascending: true });
    if (error) throw error;

    return data || [];
  },
  async createTask(
    supabase: SupabaseClient,
    taskData: Partial<Task>
  ): Promise<Task> {
    const { data, error } = await supabase
      .from("tasks")
      .insert(taskData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteTask(supabase: SupabaseClient, taskId: string) {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);
    if (error) throw error;
  },
  async moveTask(
    supabase: SupabaseClient,
    taskId: string,
    newColumnId: string,
    newOrder: number
  ) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        column_id: newColumnId,
        sort_order: newOrder,
      })
      .eq("id", taskId);
    if (error) throw error;
    return data;
  },
};

export const boardDataService = {
  async createBoardWithDefaultColumns(
    supabase: SupabaseClient,
    boardData: {
      title: string;
      description?: string;
      color?: string;
      userId: string;
    }
  ): Promise<Board> {
    const board = await boardService.create(supabase, {
      title: boardData.title,
      description: boardData.description || null,
      color: boardData.color || "bg-blue-500",
      user_id: boardData.userId,
    });
    const defaultColumns = [
      { title: "TO DO", sort_order: 0 },
      { title: "In Progress", sort_order: 1 },
      { title: "Review", sort_order: 2 },
      { title: "Done", sort_order: 3 },
    ];
    await Promise.all(
      defaultColumns.map((column) =>
        columnService.create(supabase, {
          ...column,
          board_id: board.id,
          user_id: boardData.userId,
        })
      )
    );
    return board;
  },
  async getBoardWithColumns(supabase: SupabaseClient, boardId: string) {
    const [board, columns] = await Promise.all([
      boardService.getOne(supabase, boardId),
      columnService.getOne(supabase, boardId),
    ]);
    if (!board) throw new Error("Board not found");
    const tasks = await tasksService.getTasksByBoard(supabase, boardId);
    const columnWithTasks = columns.map((col) => ({
      ...col,
      tasks: tasks.filter((t) => t.column_id == col.id),
    }));
    return {
      board,
      columnWithTasks,
    };
  },
};
