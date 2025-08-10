import { Card, CardContent } from "@/components/ui/card";
import { useBoards } from "@/lib/hooks/useBoards";
import { Rocket, Trello } from "lucide-react";

export default function Stats() {
  const { loading, error, boards } = useBoards();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-6">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Boards
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {boards.length}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trello className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Recent Activity
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {
                  boards.filter((board) => {
                    const updatedAt = new Date(board.updated_at);
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return updatedAt > oneWeekAgo;
                  }).length
                }
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Active Projects
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {
                  boards.filter((board) => {
                    const updatedAt = new Date(board.updated_at);
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                    return updatedAt > oneWeekAgo;
                  }).length
                }
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
