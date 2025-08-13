"use client";
import { ArrowLeft, Trello } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FilterDialog from "../dialogs/FilterDialog";
import { Board, FilterType } from "@/lib/supabase/models";
import EditBoardDialog from "../dialogs/EditBoardDialog";

export default function BoardNav({
  board,
  loading,
  updateBoard,
  filter,
  setFilter,
}: {
  board: Board | null;
  loading: boolean;
  updateBoard: (boardId: string, newData: Partial<Board>) => Promise<void>;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  return (
    <header className="bg-white border-b  sticky top-0 z-40">
      <div className="container ms-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 space-x-1 sm:space-x-2 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="inline sm:hidden">Back</span>
            </Link>
            <div className="h-4 sm:h-6 hidden sm:block bg-gray-300 w-px" />
            {/*  */}
            <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
              <Trello className="text-blue-600" />
              <div className="items-center space-x-1 sm:space-x-2 min-w-0">
                <span className="text-lg font-bold text-gray-900 truncate">
                  {board?.title}
                </span>

                {board && (
                  <EditBoardDialog
                    loading={loading}
                    board={board}
                    updateBoard={updateBoard}
                  />
                )}
              </div>
            </div>
          </div>
          {board && <FilterDialog filter={filter} setFilter={setFilter} />}
        </div>
      </div>
    </header>
  );
}
