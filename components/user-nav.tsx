import { Github, Linkedin, Star, Twitter, UserPlus } from "lucide-react";

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
  let socials = [
    {
      name: "Github",
      icon: <Github className="mr-2 h-4 w-4" />,
      link: "https://www.github.com/ChrisAbdo",
      handle: "@ChrisAbdo",
    },
    {
      name: "Twitter",
      icon: <Twitter className="mr-2 h-4 w-4" />,
      link: "https://www.twitter.com/abdo_eth",
      handle: "@abdo_eth",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="mr-2 h-4 w-4" />,
      link: "https://www.linkedin.com/in/christopher-abdo",
      handle: "",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <UserPlus className="h-5 w-5" />
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
          {socials.map((social) => (
            <DropdownMenuItem
              key={social.name}
              onSelect={() => {
                window.open(social.link, "_blank");
              }}
            >
              {social.icon}
              <span>{social.name}</span>
              <DropdownMenuShortcut>{social.handle}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
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
