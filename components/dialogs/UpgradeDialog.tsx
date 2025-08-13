import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function UpgradeDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>Upgrade to Create More Boards</DialogTitle>
          <p className="text-sm text-gray-600">
            Free users can only create 5 boards. Upgrade to Pro or Enterprise
            plan to create unlimited boards.
          </p>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button>
            <Link href={"/pricing"}>View Plans</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
