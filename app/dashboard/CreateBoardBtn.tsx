"use client";
import { Loader2, Plus } from "lucide-react";
import { useBoards } from "@/lib/hooks/useBoards";
import { Button } from "@/components/ui/button";

export default function CreateBoardBtn() {
  const { createBoard, loading } = useBoards();
  const handleCreateBoard = async () => {
    createBoard({ title: "new board" });
  };

  return (
    <Button
      disabled={loading}
      className="w-full min-w-[200px] my-3 sm:w-auto cursor-pointer hover:bg-gray-700"
      onClick={handleCreateBoard}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" /> Loading...
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Create Board
        </>
      )}
    </Button>
  );
}
