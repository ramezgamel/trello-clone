import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function AuthButtons() {
  return (
    <div className="flex gap-4 items-center space-x-2 sm:space-x-4">
      <div>
        <SignInButton>
          <Button
            variant="ghost"
            size="sm"
            className="text-black text-xs sm:text-sm cursor-pointer"
          >
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button
            size="sm"
            className="bg-black text-xs sm:text-sm cursor-pointer"
          >
            Sign Up
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
}
