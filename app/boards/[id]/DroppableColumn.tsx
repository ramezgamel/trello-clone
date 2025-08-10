import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnWithTasks } from "@/lib/supabase/models";
import { useDroppable } from "@dnd-kit/core";
import { MoreHorizontalIcon } from "lucide-react";

export default function DroppableColumn({
  column,
  children,
}: {
  column: ColumnWithTasks;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  return (
    <div
      ref={setNodeRef}
      className={`w-full lg:flex-shrink-0 lg:w-80 mb-4 ${
        isOver ? "bg-blue-50 rounded-lg" : ""
      } transition-colors`}
    >
      <div
        className={`bg-white rounded-lg shadow-sm border ${
          isOver ? "ring-2 ring-blue-300" : ""
        }`}
      >
        <div className="p-3 sm:p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {column.title}
              </h3>
              <Badge variant={"secondary"} className="text-xs flex-shrink-0">
                {column.tasks.length}
              </Badge>
            </div>
            <Button variant={"ghost"} size={"sm"} className="flex-shrink-0">
              <MoreHorizontalIcon />
            </Button>
          </div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
