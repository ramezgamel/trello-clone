import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Board } from "@/lib/supabase/models";
import { SetStateAction } from "react";
import { closeDialog } from "@/lib/utils";

export default function FilterBoardsDialog({
  boards,
  setFilteredBoards,
}: {
  boards: Board[];
  setFilteredBoards: React.Dispatch<SetStateAction<Board[]>>;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { startDate, endDate, minTasks, maxTasks } = Object.fromEntries(
      formData.entries()
    );
    setFilteredBoards(() =>
      boards.filter((board) => {
        const matchesDateRange =
          (!startDate ||
            new Date(board.created_at) >= new Date(startDate as string)) &&
          (!endDate ||
            new Date(board.created_at) <= new Date(endDate as string));
        return matchesDateRange;
      })
    );
    closeDialog();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] msx-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Filter Boards</DialogTitle>
          <p className="text-sm text-gray-600">
            Filter Boards by title, date or task count
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Label className="text-xs mb-1 text-gray-700">Start Date</Label>
                <Input name="startDate" className="w-full" type="date" />
              </div>
              <div>
                <Label className="text-xs mb-1 text-gray-700">
                  End Date Date
                </Label>
                <Input name="endDate" className="w-full" type="date" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Task Count</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Label className="text-xs mb-1 text-gray-700">Minimum</Label>
                <Input
                  name="minTasks"
                  className="w-full"
                  placeholder="Min Tasks"
                  type="number"
                  min={0}
                />
              </div>
              <div>
                <Label className="text-xs mb-1 text-gray-700">Maximum</Label>
                <Input
                  name="maxTasks"
                  className="w-full"
                  placeholder="Max Tasks"
                  type="number"
                  min={0}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2 flex justify-end gap-2">
            <Button type="button" variant="outline">
              Clear Filter
            </Button>
            <Button type="submit">Apply Filter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
