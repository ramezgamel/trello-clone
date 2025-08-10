import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader({ withText = false }: { withText?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader2 className="animate-spin" />
      {withText && <span>Loading...</span>}
    </div>
  );
}
