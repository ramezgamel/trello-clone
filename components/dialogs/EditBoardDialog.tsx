import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { closeDialog } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import { Board } from "@/lib/supabase/models";

export default function EditBoardDialog({
  loading,
  board,
  updateBoard,
}: {
  loading: boolean;
  board: Board;
  updateBoard: (borderId: string, newData: Partial<Board>) => Promise<void>;
}) {
  const [newTitle, setNewTitle] = useState(board?.title || "");
  const [newColor, setNewColor] = useState(board?.color || "");
  useEffect(() => {
    if (board) {
      setNewTitle(board.title);
      setNewColor(board.color);
    }
  }, [board]);
  const handleUpdateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim() || !board) {
      alert("Board title cannot be empty.");
      return;
    }
    try {
      await updateBoard(board.id, {
        title: newTitle,
        color: newColor,
      });
      closeDialog();
      setNewTitle("");
      setNewColor("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update board");
    }
  };

  return (
    <Dialog
    // open={isEditing} onOpenChange={setIsEditing}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 flex-shrink-0 p-0"
        >
          <MoreHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogTitle className="text-center text-xl sm:text-2xl font-bold">
          Edit Board
          <div className="h-1 w-20 mt-2 bg-gray-300 mx-auto" />
        </DialogTitle>
        <form onSubmit={handleUpdateBoard} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="boardTitle">Board Title</Label>
            <Input
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              id="boardTitle"
              placeholder="Enter board title..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="boardColor">Board Color</Label>
            <div className="grid mt-3 grid-cols-4 sm:grid-cols-6 gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewColor(c)}
                  className={`${c}  cursor-pointer hover:scale-105 w-8 h-8 rounded-full ${
                    c === newColor && "ring-2 ring-offset-2 ring-gray-900"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2 space-y-2">
            <Button
              disabled={loading}
              variant="outline"
              type="button"
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-gray-500",
];
