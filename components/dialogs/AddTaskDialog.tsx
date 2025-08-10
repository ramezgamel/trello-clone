import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBoard } from "@/lib/hooks/useBoards";
import { closeDialog } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";
import { Plus } from "lucide-react";
import { FormEvent } from "react";

export default function AddTaskDialog({
  targetColumnId,
  boardId,
  asCard = false,
}: {
  targetColumnId: string;
  boardId: string;
  asCard?: boolean;
}) {
  const { createTask, loading } = useBoard(boardId);

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskData = {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      assignee: (formData.get("assignee") as string) || undefined,
      priority:
        (formData.get("priority") as "low" | "medium" | "high") || "medium",
      dueDate: (formData.get("dueDate") as string) || undefined,
    };
    if (taskData.title.trim()) {
      await createTask(targetColumnId, taskData);
    }
    closeDialog();
  };
  const btnAdCard = (
    <Button
      variant={"ghost"}
      className="w-full mt-3 text-gray-500 hover:text-gray-700"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Task
    </Button>
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        {asCard ? (
          btnAdCard
        ) : (
          <Button className="w-full sm:w-auto">
            <Plus /> Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <p className="text-sm text-gray-600 ">Add a task to the board</p>
          <div className="h-1 w-20 mt-2 bg-gray-300 mx-auto" />
        </DialogHeader>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              required
              id="title"
              name="title"
              placeholder="Enter task title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              name="assignee"
              placeholder="Who should do this?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["low", "medium", "high"].map((p, i) => (
                  <SelectItem key={i} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input type="date" name="dueDate" id="dueDate" />
          </div>
          <div className=" flex justify-end space-x-2 pt-4">
            <Button disabled={loading} type="submit">
              {loading ? <Loader /> : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
