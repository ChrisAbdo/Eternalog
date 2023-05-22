"use client";

import React from "react";

import TeamSwitcher from "./team-switcher";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { Brain } from "lucide-react";
import ThemeSwitcher from "./theme-switch";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center -m-1.5 p-1.5">
          <Brain className="h-6 w-6 mr-2 text-primary" />
          Eternalog
        </Link>
        <h1 className="ml-6 mr-6">/</h1>
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
