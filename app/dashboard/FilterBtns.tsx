import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import CreateBoardBtn from "./CreateBoardBtn";
import FilterBoardsDialog from "@/components/dialogs/FilterBoardsDialog";
import { Board } from "@/lib/supabase/models";
import React, { SetStateAction } from "react";
import Header from "./Header";

export default function FilterBtns({
  viewMode,
  setViewMode,
  createBoard,
  loading,
  boards,
  setFilteredBoards,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
  createBoard: (data: {
    title: string;
    description?: string;
    color?: string;
  }) => Promise<void>;
  loading: boolean;
  boards: Board[];
  setFilteredBoards: React.Dispatch<SetStateAction<Board[]>>;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-4">
        <Header numberOfBoards={boards.length} />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 space-x-1">
          <div className="flex items-center space-x-2 bg-white border p-1 sm:p-0  rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              size="sm"
            >
              <Grid3X3 />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "ghost"}
              onClick={() => setViewMode("list")}
            >
              <List />
            </Button>
          </div>
          <FilterBoardsDialog
            boards={boards}
            setFilteredBoards={setFilteredBoards}
          />
          <CreateBoardBtn
            numberOfBoards={boards.length}
            loading={loading}
            createBoard={createBoard}
          />
        </div>
      </div>
    </div>
  );
}
