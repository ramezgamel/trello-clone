import { Button } from "@/components/ui/button";
import { Filter, Grid3X3, List, Search } from "lucide-react";
import { useState } from "react";
import CreateBoardBtn from "./CreateBoardBtn";
import { Input } from "@/components/ui/input";

export default function FilterBtns({
  viewMode,
  setViewMode,
}: {
  viewMode: string;
  setViewMode: (viewMode: string) => void;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-4">
        {/* header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-gray-900">
            Your Boards
          </h2>
          <span className="text-gray-600">Manage your projects and tasks</span>
        </div>
        {/* btns */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 space-x-1">
          <div className="flex items-center space-x-2 bg-white border p-1 rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              size="sm"
            >
              <Grid3X3 />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "ghost"}
              onClick={() => setViewMode("list")}
            >
              <List />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter />
            Filter
          </Button>
          <CreateBoardBtn />
        </div>
      </div>
      <SearchBar />
    </div>
  );
}

const SearchBar = () => {
  return (
    <div className="relative mb-4 sm:mb-6">
      <Search className="absolute left-3 top-1/2 transform text-gray-400 -translate-y-1/2 h-4 w-4" />
      <Input id="search" placeholder="Search boards..." className="pl-10" />
    </div>
  );
};
