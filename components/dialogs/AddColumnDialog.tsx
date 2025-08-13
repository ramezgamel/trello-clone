import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { closeDialog } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useRef } from "react";
import Loader from "../shared/Loader";

export default function AddColumnDialog({
  createColumn,
  loading,
}: {
  loading: boolean;
  createColumn: (title: string) => Promise<void>;
}) {
  const columnTitleRef = useRef<HTMLInputElement>(null);

  const handleCreateColumn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const columnTitle = columnTitleRef.current?.value?.trim();
    if (!columnTitle) return;
    await createColumn(columnTitle);
    if (columnTitleRef.current) {
      columnTitleRef.current.value = "";
    }
    closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full lg:flex-shrink-0 lg:w-80">
          <Button
            disabled={loading}
            variant="outline"
            size="icon"
            className="h-full w-full min-h-[200px] border-2 border-dashed text-gray-500 hover:text-gray-700"
          >
            {loading ? (
              <Loader />
            ) : (
              <>
                <Plus /> Add another list
              </>
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold">
            Create New Column
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Add new column to organize your tasks
          </p>
          <div className="h-1 w-20 mt-2 bg-gray-300 mx-auto" />
        </DialogHeader>
        <form onSubmit={handleCreateColumn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="columnTitle">Column Title</Label>
            <Input
              ref={columnTitleRef}
              id="columnTitle"
              name="title"
              required
              placeholder="Enter col.umn title."
            />
          </div>
          <div className="space-y-2 flex justify-end gap-2">
            <Button type="button" onClick={closeDialog} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Column</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
