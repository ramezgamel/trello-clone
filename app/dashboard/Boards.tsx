import { useBoards } from "@/lib/hooks/useBoards";
import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";
import CreateBoardCard from "./CreateBoardCard";
import BoardCard from "./BoardCard";

export default function Boards({ viewMode }: { viewMode: string }) {
  const { error, loading, boards } = useBoards();
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  if (boards.length === 0) return <div>No boards yet</div>;
  return (
    <div
      className={`grid grid-cols-1 space-y-4 ${
        viewMode === "list"
          ? ""
          : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
      }`}
    >
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
      <CreateBoardCard />
    </div>
  );
}
