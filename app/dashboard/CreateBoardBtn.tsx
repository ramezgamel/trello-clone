"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/lib/contexts/PlanContext";
import UpgradeDialog from "@/components/dialogs/UpgradeDialog";
import { useState } from "react";

export default function CreateBoardBtn({
  createBoard,
  loading,
  numberOfBoards,
}: {
  createBoard: (data: {
    title: string;
    description?: string;
    color?: string;
  }) => Promise<void>;
  numberOfBoards: number;
  loading: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isFreeUser } = usePlan();

  const handleCreateBoard = async () => {
    if (isFreeUser && numberOfBoards >= 5) {
      setIsOpen(true);
      return;
    } else {
      createBoard({ title: "new board" });
    }
  };

  return (
    <>
      <Button
        disabled={loading}
        className="w-full min-w-[200px] my-3 sm:w-auto cursor-pointer hover:bg-gray-700"
        onClick={handleCreateBoard}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Board
      </Button>
      <UpgradeDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
