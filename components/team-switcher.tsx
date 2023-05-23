"use client";

import * as React from "react";
import { Brain, Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

interface TextItem {
  text: string;
  id: number;
}

export default function TeamSwitcher({
  className,
  // @ts-ignore
  savedLogs,
  onSelect,
}: TeamSwitcherProps) {
  type Team = { label: string; value: string };
  type Group = { teams: Team[] };

  const uniqueCategories = [
    // @ts-ignore
    ...new Set(savedLogs.map((log: any) => log.category)),
  ];

  const groups: Group[] = uniqueCategories.map((category) => ({
    // label: category,
    teams: [
      {
        label: category,
        value: category,
      },
    ],
  }));

  const [inputText, setInputText] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [showNewTeamDialog, setShowNewTeamDialog] =
    React.useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    groups[0]?.teams[0]
  );
  let [savedTexts, setSavedTexts] = React.useState<TextItem[]>([]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputText(event.target.value);
  }

  async function createCategory(event: React.SyntheticEvent) {
    console.log("Create category called with event: ", event);

    if (inputText === "") return;

    const newTexts: TextItem[] = [
      ...savedTexts,
      {
        text: inputText,
        // id should increment by 1
        id: savedTexts.length + 1,
      },
    ];

    localStorage.setItem("texts", JSON.stringify(newTexts));
    setSavedTexts(newTexts);
    setInputText("");

    console.log(newTexts);
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam?.value}.png`}
                alt={selectedTeam?.label}
              />
              <AvatarFallback>
                <Brain />
              </AvatarFallback>
            </Avatar>
            {selectedTeam?.label || "Sort by category"}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading="My Categories">
                <CommandItem
                  onSelect={() => {
                    setSelectedTeam({ label: "", value: "" });
                    setOpen(false);
                    // @ts-ignore
                    onSelect({ label: "", value: "" });
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/.png`}
                      alt="All"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  All
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedTeam?.value === "" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>

              {groups.map((group) => (
                // @ts-ignore
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                        // @ts-ignore
                        onSelect(team);
                        console.log(`Selected category: ${team.label}`);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                          alt={team.label}
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedTeam?.value === team.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    // onSelect={() => {
                    //   setOpen(false);
                    //   setShowNewTeamDialog(true);
                    // }}
                    disabled
                    className="cursor-not-allowed"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Category
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category | Coming soon</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-2">
            <Label htmlFor="name">Team name</Label>
            <Input
              onChange={handleInputChange}
              id="name"
              placeholder="Acme Inc."
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button disabled type="submit">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
