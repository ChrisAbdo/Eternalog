import { Brain, Github, Linkedin, Star, Twitter } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <Brain className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Created by Chris Abdo
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              chris.j.abdo@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              window.open("https://www.github.com/ChrisAbdo", "_blank");
            }}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Github</span>
            <DropdownMenuShortcut>ChrisAbdo</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              window.open("https://www.twitter.com/abdo_eth", "_blank");
            }}
          >
            <Twitter className="mr-2 h-4 w-4" />
            <span>Twitter</span>
            <DropdownMenuShortcut>@abdo_eth</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              window.open(
                "https://www.linkedin.com/in/christopher-abdo/",
                "_blank"
              );
            }}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            window.open("https://github.com/ChrisAbdo/Eternalog", "_blank");
          }}
        >
          <Star className="mr-2 h-4 w-4" />
          <span>Star on GitHub</span>
          <DropdownMenuShortcut>Eternalog</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
