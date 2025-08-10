"use client";
import Boards from "@/app/dashboard/Boards";
import { useUser } from "@clerk/nextjs";
import CreateBoardBtn from "./CreateBoardBtn";
import Stats from "./Stats";
import FilterBtns from "./FilterBtns";
import { useState } from "react";

export default function Page() {
  const { user } = useUser();
  const [viewMode, setViewMode] = useState("grid");
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {user?.firstName ?? user?.emailAddresses[0].emailAddress}{" "}
        👋
      </h1>
      <p className="text-gray-600">
        Here&apos;s what&apos;s happening with your boards today.
      </p>
      <CreateBoardBtn />
      <Stats />
      <FilterBtns viewMode={viewMode} setViewMode={setViewMode} />
      <Boards viewMode={viewMode} />
    </div>
  );
}
