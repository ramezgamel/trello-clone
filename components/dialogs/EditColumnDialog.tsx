import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { closeDialog } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import { useRef } from "react";
import Loader from "../shared/Loader";

export default function AddColumnDialog({
  updateColumn,
  loading,
  columnId,
}: {
  loading: boolean;
  columnId: string;
  updateColumn: (columnId: string, title: string) => Promise<void>;
}) {
  const columnTitleRef = useRef<HTMLInputElement>(null);

  const handleUpdateColumn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const columnTitle = columnTitleRef.current?.value?.trim();
    if (!columnTitle) return;
    await updateColumn(columnId, columnTitle);
    if (columnTitleRef.current) {
      columnTitleRef.current.value = "";
    }
    closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full lg:flex-shrink-0 lg:w-80">
          <Button disabled={loading} variant="outline" size="icon" className="">
            {loading ? <Loader /> : <MoreHorizontal />}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold">
            Edit Column
          </DialogTitle>
          <p className="text-sm text-center text-gray-600">
            Update the title of a column
          </p>
          <div className="h-1 w-20 mt-2 bg-gray-300 mx-auto" />
        </DialogHeader>
        <form onSubmit={handleUpdateColumn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="columnTitle">Column Title</Label>
            <Input
              ref={columnTitleRef}
              id="columnTitle"
              name="title"
              required
              placeholder="Enter column title."
            />
          </div>
          <div className="space-y-2 flex justify-end gap-2">
            <Button type="button" onClick={closeDialog} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
