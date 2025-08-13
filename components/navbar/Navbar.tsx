"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const pathName = usePathname();
  const isDashboardPage = pathName === "/dashboard";
  return (
    <header className="border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between ">
        <Logo />
        {isDashboardPage ? (
          <UserButton />
        ) : isSignedIn ? (
          <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <span className="hidden sm:block text-xs sm:text-sm text-gray-600">
              Welcome, {user?.firstName || user.emailAddresses[0].emailAddress}
            </span>
            <Link href="/dashboard">
              <Button size="sm" className="bg-black text-xs sm:text-sm">
                Go to Dashboard <ArrowRight />{" "}
              </Button>
            </Link>
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  );
}
