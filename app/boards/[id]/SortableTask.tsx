"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@/lib/supabase/models";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, User } from "lucide-react";

export default function SortableTask({ task }: { task: Partial<Task> }) {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id! });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <Card className="cursor-pointer mb-3 hover:shadow-md transition-shadow">
        <CardContent className="p-3 sm:p-4 ">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-gray-900 text-sm leading-tight min-w-0 pr-2">
                {task.title}
              </h4>
            </div>
            <p className="text-xs line-clamp-2 text-gray-600">
              {task.description || "No description provided"}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 space-x-1 sm:space-x-2">
                {task.assignee && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    <span className="truncate">{task.assignee}</span>
                  </div>
                )}
                {task.due_date && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span className="truncate">{task.due_date}</span>
                  </div>
                )}
              </div>
              <div
                className={`rounded-full w-3 h-3 flex-shrink-0 ${getPriorityColor(
                  task.priority
                )}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getPriorityColor(priority?: "low" | "medium" | "high") {
  switch (priority) {
    case "low":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "high":
      return "bg-red-500";
    default:
      return "medium";
  }
}
