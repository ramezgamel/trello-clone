import { Loader2 } from "lucide-react";
import React from "react";

export default function PageLoader() {
  return (
    <div className="absolute z-50 top-0 left-0 h-screen w-screen bg-black/50 flex flex-col text-white items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin" />
      <span className="text-2xl mt-2 animate-pulse"> loading...</span>
    </div>
  );
}
