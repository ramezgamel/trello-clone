"use client";
import Boards from "@/app/dashboard/Boards";
import { useUser } from "@clerk/nextjs";
import Stats from "./Stats";
import FilterBtns from "./FilterBtns";
import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useBoards } from "@/lib/hooks/useBoards";
import CreateBoardCard from "./CreateBoardCard";
import Search from "./Search";

export default function Page() {
  const { user } = useUser();
  const [viewMode, setViewMode] = useState("grid");
  const { boards, error, createBoard, loading } = useBoards();
  const [filteredBoards, setFilteredBoards] = useState(boards);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back,{" "}
          {user?.firstName ?? user?.emailAddresses[0].emailAddress} 👋
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your boards today.
        </p>
        <Stats boards={boards} />
        <FilterBtns
          createBoard={createBoard}
          loading={loading}
          viewMode={viewMode}
          setViewMode={setViewMode}
          boards={boards}
          setFilteredBoards={setFilteredBoards}
        />
        <Search boards={boards} setFilteredBoards={setFilteredBoards} />
        <Boards
          boards={filteredBoards}
          loading={loading}
          error={error}
          viewMode={viewMode}
        >
          <CreateBoardCard createBoard={createBoard} loading={loading} />
        </Boards>
      </div>
    </>
  );
}
