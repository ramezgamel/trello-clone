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
import { FilterType } from "@/lib/supabase/models";

export default function FilterDialog({
  filter,
  setFilter,
}: {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}) {
  const applyFilters = () => {
    closeDialog();
  };

  const handleFilterChange = (
    type: "priority" | "assignee" | "dueDate",
    value: string | string[] | null
  ) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
    getNumberOfFilter(filter);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs sm:text-sm ${
              getNumberOfFilter(filter) > 0 ? "bg-blue-100 border-blue-200" : ""
            }`}
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
            {getNumberOfFilter(filter) > 0 && (
              <Badge variant="secondary" className="text-xs ml-1 sm:ml-2 ">
                {getNumberOfFilter(filter)}
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
                  variant={filter.priority.includes(p) ? "default" : "outline"}
                  onClick={() => {
                    const newPriority = filter.priority.includes(p)
                      ? filter.priority.filter((pr) => pr !== p)
                      : [...filter.priority, p];
                    handleFilterChange("priority", newPriority);
                  }}
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
            <Input
              type="date"
              value={filter.dueDate || ""}
              onChange={(e) => handleFilterChange("dueDate", e.target.value)}
            />
          </div>
          <div className="space-x-2 flex justify-end items-center">
            <Button
              type="button"
              variant={"outline"}
              onClick={() =>
                setFilter({ priority: [], assignee: [], dueDate: null })
              }
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

function getNumberOfFilter(filterObj: FilterType) {
  return Object.values(filterObj)
    .flatMap((v) => v)
    .filter((v) => Boolean(v)).length;
}
