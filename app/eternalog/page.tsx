"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, BrainCog, CornerDownLeft, Plus } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface TextItem {
  text: string;
  id: number;
}

interface LogItem {
  text: string;
  id: number;
  category: string;
}

export default function Home() {
  let [initialCommand, setInitialCommand] = React.useState<boolean>(true);
  let [logCommand, setLogCommand] = React.useState<boolean>(false);
  let [categoryCommand, setCategoryCommand] = React.useState<boolean>(false);

  let [currentCategory, setCurrentCategory] = React.useState<string>("");

  let [open, setOpen] = React.useState(false);

  let [inputText, setInputText] = React.useState<string>("");
  let [logText, setLogText] = React.useState<string>("");

  let [savedTexts, setSavedTexts] = React.useState<TextItem[]>([]);
  let [savedLogs, setSavedLogs] = React.useState<LogItem[]>([]);

  let [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    let storedTexts = localStorage.getItem("texts");

    if (storedTexts) {
      setSavedTexts(JSON.parse(storedTexts));
    }
  }, []);

  async function loadStoredCategories() {
    let storedTexts = localStorage.getItem("texts");

    if (storedTexts) {
      setSavedTexts(JSON.parse(storedTexts));
    }
  }

  async function createCategory(event: React.SyntheticEvent) {
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

  async function createLog(event: React.SyntheticEvent) {
    if (logText === "") return;

    const newLogs: LogItem[] = [
      ...savedLogs,
      {
        text: logText,
        category: currentCategory,
        id: savedLogs.length + 1,
      },
    ];

    localStorage.setItem("logs", JSON.stringify(newLogs));
    setSavedLogs(newLogs);
    setLogText("");

    console.log(newLogs);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputText(event.target.value);
  }

  function handleLogChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setLogText(event.target.value);
  }

  return (
    <div>
      <Navbar />
      <CommandDialog
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          setLogCommand(false);
          setInitialCommand(true);
          setCategoryCommand(false);
        }}
      >
        {initialCommand && (
          <>
            <CommandInput placeholder="Type a command or search..." />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Create">
                <CommandItem
                  onSelect={() => {
                    setInitialCommand(false);
                    setCategoryCommand(true);
                  }}
                >
                  <Plus className="h-5 w-5 mr-2 order-first" />
                  New Category
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Preset Categories">
                <CommandItem
                  onSelect={() => {
                    setCategoryCommand(false);
                    setInitialCommand(false);
                    setLogCommand(true);
                    // setLogCommand(false);
                  }}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Thoughts
                </CommandItem>
                <CommandItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Bookmarks
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="My Categories">
                {savedTexts.map((text) => (
                  <CommandItem
                    key={text.id}
                    onSelect={() => {
                      setLogCommand(true);
                      setInitialCommand(false);

                      setCurrentCategory(text.text);

                      console.log(`You're in the ${text.text} category`); // print the category
                    }}
                  >
                    <BrainCog className="mr-2 h-4 w-4" />
                    {text.text}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />
            </CommandList>
          </>
        )}

        {logCommand && (
          <>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Return">
                <CommandItem
                  onSelect={() => {
                    setInitialCommand(true);
                    setLogCommand(false);
                  }}
                >
                  <CornerDownLeft className="mr-2 h-4 w-4" />
                  Main Menu
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
            <CommandList>
              <CommandGroup
                heading={`Create a new log in category: ${
                  currentCategory ? currentCategory : "Default"
                }`}
              >
                <CommandItem>
                  <Textarea
                    onChange={handleLogChange}
                    placeholder="Ex... Design"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createLog(e);
                        setCategoryCommand(false);

                        setOpen(false);
                      }
                    }}
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </>
        )}

        {categoryCommand && (
          <>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Return">
                <CommandItem
                  onSelect={() => {
                    setInitialCommand(true);
                    setCategoryCommand(false);
                  }}
                >
                  <CornerDownLeft className="mr-2 h-4 w-4" />
                  Main Menu
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
            <CommandList>
              <CommandGroup heading="Create a new category">
                <CommandItem>
                  <Input
                    onChange={handleInputChange}
                    placeholder="Ex... Design"
                    value={inputText}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        createCategory(e);
                        setInitialCommand(true);
                        setCategoryCommand(false);
                      }
                    }}
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </>
        )}
      </CommandDialog>

      <div className="mx-auto max-w-2xl lg:text-center py-24 sm:py-32 lg:pb-40">
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="w-full flex items-center"
        >
          <span className="sr-only">Create a new team</span>
          {/* Button Text */}
          <Plus className="h-5 w-5 mr-2 order-first" />
          <span className="mx-auto">Create a new log</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </Button>

        {savedLogs.map((log) => (
          <div key={log.id} className="mt-4">
            <h1 className="text-2xl font-bold">{log.text}</h1>
            <p className="text-sm text-muted-foreground">{log.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
