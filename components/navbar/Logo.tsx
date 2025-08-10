import { Trello } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Trello className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
      <p className="text-xl sm:text-2xl font-bold text-gray-900">
        Trello Clone
      </p>{" "}
    </div>
  );
}
