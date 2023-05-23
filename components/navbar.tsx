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
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center -m-1.5 p-1.5">
          <Brain className="h-6 w-6 mr-2 text-primary" />
          Eternalog
        </Link>
        <h1 className="ml-6 mr-6 text-muted-foreground">/</h1>
        {/* @ts-ignore */}
        <TeamSwitcher
          savedLogs={savedLogs}
          // @ts-ignore
          onSelect={onSelect}
          createCategory={createCategory}
        />

        <div className="ml-auto flex items-center space-x-2">
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
