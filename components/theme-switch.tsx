"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Laptop, Loader2, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Change theme</span>
              {theme === "light" && <Sun className="h-5 w-5" />}
              {theme === "dark" && <Moon className="h-5 w-5" />}
              {theme === "system" && <Laptop className="h-6 w-6" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem onSelect={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setTheme("system")}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" disabled>
          <Loader2 className="h-5 w-5 animate-spin" />
        </Button>
      )}
    </>
  );
}
