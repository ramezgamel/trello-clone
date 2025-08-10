import Loader from "@/components/shared/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { useBoards } from "@/lib/hooks/useBoards";
import { Plus } from "lucide-react";

export default function CreateBoardCard() {
  const { createBoard, loading } = useBoards();
  const handleCreateBoard = async () => {
    createBoard({ title: "new board" });
  };
  return (
    <Card
      onClick={handleCreateBoard}
      className="border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-colors h-full"
    >
      <CardContent className="flex flex-col items-center justify-center h-full  p-4 sm:p-6 text-gray-500">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Plus className="h-6 w-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-blue-600 transition-colors mb-2" />
            <p className="text-sm sm:text-base text-gray-600 group=hover:text-blue-600 font-medium">
              Create new board
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
