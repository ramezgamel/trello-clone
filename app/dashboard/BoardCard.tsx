import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Board } from "@/lib/supabase/models";
import Link from "next/link";

export default function BoardCard({ board }: { board: Board }) {
  return (
    <Link href={`/boards/${board.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className={`w-4 h-4 ${board.color} rounded`} />
            <Badge variant="secondary" className="text-sm">
              New
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg group-hover:text-blue-600 transition-colors">
            {board.title}
          </CardTitle>
          <CardDescription className="text-sm mb-4">
            {board.description}
          </CardDescription>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
            <span>
              Created {new Date(board.created_at).toLocaleDateString()}
            </span>
            <span>
              Updated {new Date(board.updated_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
