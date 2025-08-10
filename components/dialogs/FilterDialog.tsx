import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Filter } from "lucide-react";
import { Badge } from "../ui/badge";
import { closeDialog } from "@/lib/utils";

export default function FilterDialog({
  filterCount,
  setFilterCount,
}: {
  filterCount: number;
  setFilterCount: (count: number) => void;
}) {
  const [priority, setPriority] = useState<string | null>(null);

  const applyFilters = () => {
    closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs sm:text-sm ${
              filterCount > 0 ? "bg-blue-100 border-blue-200" : ""
            }`}
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
            {filterCount > 0 && (
              <Badge variant="secondary" className="text-xs ml-1 sm:ml-2 ">
                {filterCount}
              </Badge>
            )}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold">
            Filter Tasks
            <p className="text-sm text-gray-600">
              Filter tasks by priority, or due date
            </p>
            <div className="h-1 w-20 mt-2 bg-gray-300 mx-auto" />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex flex-wrap gap-2">
              {["low", "medium", "high"].map((p, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={priority === p ? "outline" : "secondary"}
                  onClick={() => setPriority(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          {/* <div className="space-y-2">
            <Label>Assignee</Label>
            <div className="flex flex-wrap gap-2">
              {["low", "medium", "high"].map((p, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={priority === p ? "outline" : "secondary"}
                  onClick={() => setPriority(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Button>
              ))}
            </div>
          </div> */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Input type="date" />
          </div>
          <div className="space-x-2">
            <Button
              onClick={() => setFilterCount(0)}
              type="button"
              variant={"outline"}
            >
              Clear Filters
            </Button>
            <Button type="button" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
