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

export default function Navbar({
  savedLogs,
  onSelect,
  createCategory,
}: NavbarProps) {
  return (
    // <div className="border-b">
    //   <div className="flex h-16 items-center px-4">
    // <Link href="/" className="flex items-center -m-1.5 p-1.5">
    //   <Brain className="h-6 w-6 mr-2 text-primary" />
    //   Eternalog
    // </Link>
    //     <h1 className="ml-6 mr-6 text-muted-foreground">/</h1>
    //     {/* @ts-ignore */}
    // <TeamSwitcher
    //   savedLogs={savedLogs}
    //   // @ts-ignore
    //   onSelect={onSelect}
    //   createCategory={createCategory}
    // />

    //     <div className="ml-auto flex items-center space-x-2">
    // <ThemeSwitcher />
    // <UserNav />
    //     </div>
    //   </div>
    // </div>
    <header className="border-b">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center -m-1.5 p-1.5 text-xl">
            <Brain className="h-6 w-6 mr-2 text-primary" />
            Eternalog
          </Link>
          <h1 className="text-xl ml-6 mr-6 text-muted-foreground">/</h1>
          <TeamSwitcher
            savedLogs={savedLogs}
            // @ts-ignore
            onSelect={onSelect}
            createCategory={createCategory}
          />
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
