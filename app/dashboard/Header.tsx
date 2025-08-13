import { usePlan } from "@/lib/contexts/PlanContext";

export default function Header({ numberOfBoards }: { numberOfBoards: number }) {
  const { isFreeUser } = usePlan();
  return (
    <div className="mb-4">
      <h2 className="text-xl sm:text-2xl font-bold font-gray-900">
        Your Boards
      </h2>
      <span className="text-gray-600">Manage your projects and tasks</span>
      {isFreeUser && (
        <p className="text-sm text-gray-500 mt-1">
          Free plan: {numberOfBoards} / 5 Boards used
        </p>
      )}
    </div>
  );
}
