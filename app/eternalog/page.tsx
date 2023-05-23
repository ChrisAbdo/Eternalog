"use client";

import React from "react";
import Navbar from "@/components/navbar";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  BookOpen,
  BookUp,
  Brain,
  BrainCog,
  CornerDownLeft,
  Info,
  MoreHorizontal,
  Pen,
  Plus,
  Trash,
} from "lucide-react";
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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TextItem {
  text: string;
  id: number;
}

interface LogItem {
  text: string;
  id: number;
  category: string;
  createdTime: string;
  size: number;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  let { toast } = useToast();

  let [mounted, setMounted] = React.useState<boolean>(false);

  let [initialCommand, setInitialCommand] = React.useState<boolean>(true);
  let [logCommand, setLogCommand] = React.useState<boolean>(false);
  let [categoryCommand, setCategoryCommand] = React.useState<boolean>(false);
  let [categories, setCategories] = React.useState<string[]>([]);
  let [remainingSpace, setRemainingSpace] = React.useState<number>(0);
  let [remainingStoragePercentage, setRemainingStoragePercentage] =
    React.useState<number>(100);
  let [useStoragePercentage, setUsedStoragePercentage] =
    React.useState<number>(0);

  let [currentCategory, setCurrentCategory] = React.useState<string>("");

  let [open, setOpen] = React.useState(false);

  let [inputText, setInputText] = React.useState<string>("");
  let [logText, setLogText] = React.useState<string>("");

  let [savedTexts, setSavedTexts] = React.useState<TextItem[]>([]);
  let [savedLogs, setSavedLogs] = React.useState<LogItem[]>([]);

  let [renamingText, setRenamingText] = React.useState<string | null>(null);
  let [renamingId, setRenamingId] = React.useState<number | null>(null);

  let [selectedCategory, setSelectedCategory] = React.useState<string>("");
  let [query, setQuery] = React.useState<string>("");
  let filteredTexts = savedLogs.filter((log) => {
    if (
      query !== "" &&
      // !textItem.text.toLowerCase().includes(query.toLowerCase())
      !log.text.toLowerCase().includes(query.toLowerCase()) &&
      !log.category.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }
    if (selectedCategory !== "" && !log.category.includes(selectedCategory)) {
      return false;
    }
    return true;
  });

  let stats = [
    {
      name: "Number of logs",
      value:
        savedLogs && savedLogs.length > 0 ? (
          savedLogs.length
        ) : (
          <Skeleton className="w-[100px] h-[40px] rounded-md" />
        ),
    },
    {
      name: "Number of categories",
      value:
        savedTexts && savedTexts.length > 0 ? (
          savedTexts.length
        ) : (
          <Skeleton className="w-[100px] h-[40px] rounded-md" />
        ),
    },
    {
      name: "Storage used",
      value:
        useStoragePercentage && useStoragePercentage > 0 ? (
          useStoragePercentage
        ) : (
          <Skeleton className="w-[100px] h-[40px] rounded-md" />
        ),
      unit: useStoragePercentage > 0 ? "%" : "",
    },
    {
      name: "Remaining Storage (KB)",
      value:
        remainingSpace && remainingSpace > 0 ? (
          remainingSpace
        ) : (
          <Skeleton className="w-[150px] h-[40px] rounded-md" />
        ),

      unit: remainingSpace > 0 ? "KB" : "",
    },
  ];

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
    let storedLogs = localStorage.getItem("logs");

    if (storedTexts) {
      setSavedTexts(JSON.parse(storedTexts));
    }

    if (storedLogs) {
      setSavedLogs(JSON.parse(storedLogs));
    }

    logRemainingLocalStorageSpace();
  }, []);

  React.useEffect(() => {
    const allCategories = new Set<string>();
    savedLogs.forEach((log) => {
      allCategories.add(log.category);
    });
    setCategories(Array.from(allCategories));
  }, [savedLogs]);

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

    toast({
      title: "Category created",
    });

    console.log(newTexts);
  }

  async function createLog(event: React.SyntheticEvent) {
    if (logText === "") return;

    let sizeInBytes = new Blob([logText], { type: "text/plain" }).size;

    let sizeInKB = sizeInBytes / 1024; // Convert bytes to kilobytes

    const newLogs: LogItem[] = [
      ...savedLogs,
      {
        text: logText,
        category: currentCategory,
        id: savedLogs.length + 1,
        createdTime: formatCurrentTime(),
        size: sizeInKB,
      },
    ];

    localStorage.setItem("logs", JSON.stringify(newLogs));
    setSavedLogs(newLogs);
    setLogText("");

    logRemainingLocalStorageSpace();

    console.log(newLogs);
  }

  function renameTextItem(id: number) {
    let updatedTexts = savedTexts.map((textItem) =>
      textItem.id === id ? { ...textItem, text: renamingText || "" } : textItem
    );
    localStorage.setItem("texts", JSON.stringify(updatedTexts));
    setSavedTexts(updatedTexts);
    setRenamingText(null);
    setRenamingId(null);

    toast({
      title: "Category renamed",
    });
  }

  function deleteTextItem(id: number) {
    let filteredTexts = savedTexts.filter((textItem) => textItem.id !== id);
    localStorage.setItem("texts", JSON.stringify(filteredTexts));
    setSavedTexts(filteredTexts);
    toast({
      title: "Category deleted",
    });
    if (renamingId === id) {
      setRenamingText(null);
      setRenamingId(null);
    }

    logRemainingLocalStorageSpace();
  }

  function deleteLogItem(id: number) {
    let filteredLogs = savedLogs.filter((logItem) => logItem.id !== id);
    localStorage.setItem("logs", JSON.stringify(filteredLogs));
    setSavedLogs(filteredLogs);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputText(event.target.value);
  }

  function handleLogChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setLogText(event.target.value);
  }

  function logRemainingLocalStorageSpace() {
    let totalStorage = 5 * 1024 * 1024;
    let usedStorage = 0;

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        let item = localStorage.getItem(key);
        if (item) {
          usedStorage += item.length * 2;
        }
      }
    }

    let remainingStorage = totalStorage - usedStorage;
    console.log(`Remaining local storage space: ${remainingStorage} bytes`);
    setRemainingSpace(remainingStorage);

    let percentage = (remainingStorage / totalStorage) * 100;
    //   format to only 2 decimal places
    percentage = Math.round(percentage * 100) / 100;

    //   calculate the used storage
    let usedStoragePercentage = 100 - percentage;
    //   format to only 2 decimal places
    usedStoragePercentage = Math.round(usedStoragePercentage * 100) / 100;
    setUsedStoragePercentage(usedStoragePercentage);

    setRemainingStoragePercentage(percentage);
  }

  function formatCurrentTime() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // months are zero indexed
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  return (
    <>
      <div>
        <Navbar
          savedLogs={savedLogs}
          onSelect={(selectedTeam) => {
            setQuery(selectedTeam.label);
            console.log(
              `Selected category from grandparent component: ${selectedTeam.label}`
            );
          }}
          createCategory={createCategory}
        />

        <div>
          {/* Sticky search header */}
          <div className="sticky top-0 z-50 bg-background flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden">
              <span className="sr-only">Open sidebar</span>
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <Input
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for logs..."
                    type="search"
                    name="search"
                    autoComplete="off"
                    className="flex justify-center items-center w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <main>
            <header>
              {/* Stats */}

              <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-bold text-white">Stats</h1>
                {/* <Button variant="outline">generate graph</Button> */}

                {mounted ? (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="outline">generate graph</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button variant="outline" disabled>
                    generate graph
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1
                        ? "sm:border-l"
                        : statIdx === 2
                        ? "lg:border-l"
                        : "",
                      "border-t py-6 px-4 sm:px-6 lg:px-8"
                    )}
                  >
                    <p className="text-sm font-medium leading-6 text-gray-400">
                      {stat.name}
                    </p>
                    <div className="mt-2 flex items-baseline gap-x-2">
                      <div className="text-4xl font-semibold tracking-tight text-primary">
                        {stat.value}
                      </div>
                      {stat.unit ? (
                        <span className="text-sm text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
            </header>

            {/* Activity list */}
            <div className="border-t  pt-11">
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="w-full flex items-center mx-auto max-w-[25rem]"
              >
                <span className="sr-only">Create a new team</span>
                {/* Button Text */}
                <Plus className="h-5 w-5 mr-2 order-first" />
                <span className="mx-auto">Create a new log</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              <CommandDialog
                open={open}
                onOpenChange={() => {
                  setOpen(!open);
                  setLogCommand(false);
                  setInitialCommand(true);
                  setCategoryCommand(false);
                  setRenamingId(null);
                  setRenamingText(null);
                }}
              >
                {initialCommand && (
                  <>
                    <CommandInput placeholder="Search for category" />

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
                            setCurrentCategory("Thoughts");
                          }}
                        >
                          <Brain className="mr-2 h-4 w-4" />
                          Thoughts
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setCategoryCommand(false);
                            setInitialCommand(false);
                            setLogCommand(true);
                            setCurrentCategory("Bookmarks");
                          }}
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Bookmarks
                        </CommandItem>
                      </CommandGroup>

                      <CommandSeparator />

                      <CommandGroup heading="My Categories">
                        {savedTexts.length > 0 ? (
                          savedTexts.map((text) => (
                            <ContextMenu key={text.id}>
                              <ContextMenuTrigger>
                                <div className="flex justify-between items-center w-full">
                                  {renamingId === text.id ? (
                                    <div className="flex w-full space-x-2 mt-2 mb-2">
                                      <Input
                                        value={renamingText || ""}
                                        onChange={(e) =>
                                          setRenamingText(e.target.value)
                                        }
                                        //   onBlur={() => renameTextItem(text.id)}
                                        autoFocus
                                      />
                                      <Button
                                        disabled={renamingText === null}
                                        onClick={() => renameTextItem(text.id)}
                                      >
                                        Rename
                                      </Button>
                                    </div>
                                  ) : (
                                    <CommandItem
                                      className="flex justify-between items-center w-full"
                                      onSelect={() => {
                                        setLogCommand(true);
                                        setInitialCommand(false);

                                        setCurrentCategory(text.text);

                                        console.log(
                                          `in the ${text.text} category`
                                        ); // print the category
                                      }}
                                    >
                                      <div className="flex">
                                        <BrainCog className="mr-2 h-4 w-4" />
                                        {text.text}
                                      </div>

                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <Info className="h-4 w-4" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>
                                              Right click this category to
                                              rename or delete it.
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </CommandItem>
                                  )}
                                </div>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                <ContextMenuItem
                                  onSelect={() => setRenamingId(text.id)}
                                >
                                  <Pen className="mr-2 h-4 w-4" />
                                  Rename
                                </ContextMenuItem>
                                <ContextMenuItem
                                  onSelect={() => deleteTextItem(text.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </ContextMenuItem>
                              </ContextMenuContent>
                            </ContextMenu>
                          ))
                        ) : (
                          <h1 className="text-sm text-gray-400">
                            You don&apos;t have any saved categories yet.
                          </h1>
                        )}
                      </CommandGroup>

                      <CommandSeparator />
                    </CommandList>
                  </>
                )}

                {logCommand && (
                  <>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>

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
                            placeholder="Ex. Cool design I saw today..."
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                createLog(e);
                                setCategoryCommand(false);
                                setLogCommand(false);
                                setInitialCommand(true);
                                setOpen(false);
                              }
                            }}
                          />
                        </CommandItem>
                        <CommandItem
                          onSelect={(e) => {
                            //   @ts-ignore
                            createLog(e);
                            setCategoryCommand(false);
                            setLogCommand(false);
                            setInitialCommand(true);
                            setOpen(false);
                          }}
                          disabled={logText === ""}
                          //   className="mb-1.5"
                          //   classname cursor not allowed if logText is empty
                          className={`mb-1.5 ${
                            logText === "" ? "cursor-not-allowed" : ""
                          }`}
                        >
                          <BookUp className="mr-2 h-4 w-4" />
                          Submit
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setInitialCommand(true);
                            setLogCommand(false);
                          }}
                          className="mb-1.5"
                        >
                          <CornerDownLeft className="mr-2 h-4 w-4" />
                          Main Menu
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </>
                )}

                {categoryCommand && (
                  <>
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>

                      <CommandSeparator />
                    </CommandList>
                    <CommandList>
                      <CommandGroup heading="Create a new category">
                        {/* <Input
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
                          /> */}
                        <div className="flex w-full mt-4 mb-4 items-center space-x-2">
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
                          />{" "}
                          <Button
                            type="submit"
                            variant="outline"
                            disabled={inputText === ""}
                            onClick={(e) => {
                              createCategory(e);
                              setInitialCommand(true);
                              setCategoryCommand(false);
                            }}
                          >
                            Create
                          </Button>
                        </div>

                        <CommandItem
                          onSelect={() => {
                            setInitialCommand(true);
                            setCategoryCommand(false);
                          }}
                          className="mb-1.5"
                        >
                          <CornerDownLeft className="mr-2 h-4 w-4" />
                          Main Menu
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </>
                )}
              </CommandDialog>

              <div className="mt-4 mb-8" />

              <Table>
                <TableCaption>A list of your recent logs.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Log Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>View</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTexts.length > 0 ? (
                    filteredTexts.map((log, index) => (
                      <TableRow key={log.id}>
                        <Sheet>
                          <TableCell className="font-medium truncate max-w-[300px]">
                            {log.text}
                          </TableCell>
                          <TableCell>
                            <Badge>{log.category}</Badge>
                          </TableCell>
                          <TableCell>{log.size}</TableCell>
                          <TableCell>
                            <time>
                              {log.createdTime
                                ? log.createdTime.toLocaleString()
                                : ""}
                            </time>
                          </TableCell>
                          <TableCell>
                            <Sheet>
                              <SheetTrigger>
                                {" "}
                                <Button variant="ghost">
                                  <BookOpen className="h-5 w-5" />
                                  <span className="ml-2">View Log</span>
                                </Button>
                              </SheetTrigger>
                              <SheetContent>
                                <SheetHeader>
                                  <SheetTitle>View Log</SheetTitle>
                                  <SheetTitle>
                                    <div className="flex space-x-2">
                                      <Badge>{log.category}</Badge>
                                      <Badge>{log.size} KB</Badge>
                                      <Badge>
                                        {log.createdTime
                                          ? log.createdTime.toLocaleString()
                                          : ""}
                                      </Badge>
                                    </div>
                                  </SheetTitle>
                                  <SheetDescription>
                                    {log.text}
                                  </SheetDescription>
                                </SheetHeader>
                              </SheetContent>
                            </Sheet>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                  Log Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                  <DropdownMenuItem disabled>
                                    <Pen className="mr-2 h-4 w-4" />
                                    <span>Coming Soon!</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onSelect={() => deleteLogItem(log.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </Sheet>
                      </TableRow>
                    ))
                  ) : (
                    <TableSkeleton />
                  )}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>

      <div className="fixed bg-background bottom-0 left-0 right-0 p-4 z-50 border-t">
        <div className="mx-auto max-w-2xl">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <Progress
                  className="w-full"
                  value={remainingStoragePercentage}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your remaining storage:</p>

                <p className="text-center">
                  <span className="font-bold">{remainingSpace}</span> bytes
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
