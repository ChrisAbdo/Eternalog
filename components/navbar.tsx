"use client";

import React from "react";

import TeamSwitcher from "./team-switcher";

import { UserNav } from "./user-nav";
import { Brain } from "lucide-react";
import ThemeSwitcher from "./theme-switch";
import Link from "next/link";

interface NavbarProps {
  savedLogs: any;
  onSelect: (selectedTeam: { label: string; value: string }) => void;
  createCategory: any;
}

export default function Navbar() {
  return (
    <header className="border-b">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center -m-1.5 p-1.5 text-2xl">
            <div className="bg-primary rounded-full p-0.5 mr-2">
              <Brain className="h-6 w-6 text-secondary " />
            </div>
            Eternalog
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
