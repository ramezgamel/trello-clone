import { Unplug } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center bg-red-400 rounded-md text-white px-28 py-10">
        <h1 className="text-2xl">Not Found Page</h1>
        <Unplug className="text-white w-8 h-8 mt-2" />
        <Link
          className="bg-white rounded-md float-right mt-4 px-4 py-2 text-black"
          href={"/dashboard"}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
