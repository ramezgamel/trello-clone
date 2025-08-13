import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";
import BoardCard from "./BoardCard";
import { Board } from "@/lib/supabase/models";
import { ReactNode } from "react";

export default function Boards({
  viewMode,
  boards,
  error,
  loading,
  children,
}: {
  viewMode: string;
  boards: Board[];
  error: string | null;
  loading: boolean;
  children: ReactNode;
}) {
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
      {children}
    </div>
  );
}
