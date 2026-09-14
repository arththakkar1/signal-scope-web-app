"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import ScrollToLink from "@/components/ScrollToLink";

type UsageInfo = {
  used: number;
  limit: number;
  authenticated: boolean;
  username: string | null;
};

interface NavbarProps {
  usage: UsageInfo | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
}

export function Navbar({ usage, onLoginClick, onSignupClick, onLogoutClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/60">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-ink font-bold tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-1">
              <Activity className="h-5 w-5" />
            </div>
            <span>SIGNALSCOPE</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <ScrollToLink
              to="#working"
              className="text-text-secondary hover:text-ink transition-colors"
              whileHover={{ scale: 1.03 }}
            >
              Working
            </ScrollToLink>
            <ScrollToLink
              to="#about"
              className="text-text-secondary hover:text-ink transition-colors"
              whileHover={{ scale: 1.03 }}
            >
              About
            </ScrollToLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {usage?.authenticated && usage.username ? (
            <>
              <div className="flex items-center gap-3 mr-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white font-bold text-sm uppercase">
                  {usage.username.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-ink hidden sm:inline-block">
                  {usage.username}
                </span>
              </div>
              <button 
                onClick={onLogoutClick}
                className="text-sm font-medium text-text-secondary hover:text-ink transition-colors px-3 py-1.5 border border-border rounded-md hover:bg-surface-hover"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={onLoginClick}
                className="text-sm font-medium text-text-secondary hover:text-ink transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={onSignupClick}
                className="bg-neutral-900 dark:bg-white hover:bg-black dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-sm font-bold px-4 py-2 rounded-md shadow-1 hover:shadow-2 hover:-translate-y-[1px] transition-all"
              >
                Sign Up
              </button>
            </>
          )}
          <div className="pl-2 ml-2 border-l border-border flex items-center">
             <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
