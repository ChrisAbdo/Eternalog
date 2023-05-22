"use client";

import React from "react";
import Navbar from "@/components/navbar";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  BookOpen,
  Brain,
  BrainCog,
  CornerDownLeft,
  Info,
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

const stats = [
  { name: "Number of deploys", value: "405" },
  { name: "Average deploy time", value: "3.65", unit: "mins" },
  { name: "Number of servers", value: "3" },
  { name: "Remaining Storage", value: "98.5%" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  let { toast } = useToast();

  let [initialCommand, setInitialCommand] = React.useState<boolean>(true);
  let [logCommand, setLogCommand] = React.useState<boolean>(false);
  let [categoryCommand, setCategoryCommand] = React.useState<boolean>(false);

  let [remainingSpace, setRemainingSpace] = React.useState<number>(0);
  let [remainingStoragePercentage, setRemainingStoragePercentage] =
    React.useState<number>(100);

  let [currentCategory, setCurrentCategory] = React.useState<string>("");

  let [open, setOpen] = React.useState(false);

  let [inputText, setInputText] = React.useState<string>("");
  let [logText, setLogText] = React.useState<string>("");

  let [savedTexts, setSavedTexts] = React.useState<TextItem[]>([]);
  let [savedLogs, setSavedLogs] = React.useState<LogItem[]>([]);

  let [renamingText, setRenamingText] = React.useState<string | null>(null);
  let [renamingId, setRenamingId] = React.useState<number | null>(null);

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
    // <div>
    //   <Navbar />
    //   <CommandDialog
    //     open={open}
    //     onOpenChange={() => {
    //       setOpen(!open);
    //       setLogCommand(false);
    //       setInitialCommand(true);
    //       setCategoryCommand(false);
    //       setRenamingId(null);
    //       setRenamingText(null);
    //     }}
    //   >
    //     {initialCommand && (
    //       <>
    //         <CommandInput placeholder="Search for category" />

    //         <CommandList>
    //           <CommandEmpty>No results found.</CommandEmpty>
    //           <CommandGroup heading="Create">
    //             <CommandItem
    //               onSelect={() => {
    //                 setInitialCommand(false);
    //                 setCategoryCommand(true);
    //               }}
    //             >
    //               <Plus className="h-5 w-5 mr-2 order-first" />
    //               New Category
    //             </CommandItem>
    //           </CommandGroup>
    //           <CommandGroup heading="Preset Categories">
    //             <CommandItem
    //               onSelect={() => {
    //                 setCategoryCommand(false);
    //                 setInitialCommand(false);
    //                 setLogCommand(true);
    //                 setCurrentCategory("Thoughts");
    //               }}
    //             >
    //               <Brain className="mr-2 h-4 w-4" />
    //               Thoughts
    //             </CommandItem>
    //             <CommandItem
    //               onSelect={() => {
    //                 setCategoryCommand(false);
    //                 setInitialCommand(false);
    //                 setLogCommand(true);
    //                 setCurrentCategory("Bookmarks");
    //               }}
    //             >
    //               <BookOpen className="mr-2 h-4 w-4" />
    //               Bookmarks
    //             </CommandItem>
    //           </CommandGroup>

    //           <CommandSeparator />

    //           <CommandGroup heading="My Categories">
    //             {savedTexts.map((text) => (
    //               <ContextMenu key={text.id}>
    //                 <ContextMenuTrigger>
    //                   <div className="flex justify-between items-center w-full">
    //                     {renamingId === text.id ? (
    //                       <div className="flex w-full space-x-2 mt-2 mb-2">
    //                         <Input
    //                           value={renamingText || ""}
    //                           onChange={(e) => setRenamingText(e.target.value)}
    //                           //   onBlur={() => renameTextItem(text.id)}
    //                           autoFocus
    //                         />
    //                         <Button
    //                           disabled={renamingText === null}
    //                           onClick={() => renameTextItem(text.id)}
    //                         >
    //                           Rename
    //                         </Button>
    //                       </div>
    //                     ) : (
    //                       <CommandItem
    //                         className="flex justify-between items-center w-full"
    //                         onSelect={() => {
    //                           setLogCommand(true);
    //                           setInitialCommand(false);

    //                           setCurrentCategory(text.text);

    //                           console.log(
    //                             `You're in the ${text.text} category`
    //                           ); // print the category
    //                         }}
    //                       >
    //                         <div className="flex">
    //                           <BrainCog className="mr-2 h-4 w-4" />
    //                           {text.text}
    //                         </div>

    //                         <TooltipProvider>
    //                           <Tooltip>
    //                             <TooltipTrigger>
    //                               <Info className="h-4 w-4" />
    //                             </TooltipTrigger>
    //                             <TooltipContent>
    //                               <p>
    //                                 Right click this category to rename or
    //                                 delete it.
    //                               </p>
    //                             </TooltipContent>
    //                           </Tooltip>
    //                         </TooltipProvider>
    //                       </CommandItem>
    //                     )}
    //                   </div>
    //                 </ContextMenuTrigger>
    //                 <ContextMenuContent>
    //                   <ContextMenuItem onSelect={() => setRenamingId(text.id)}>
    //                     <Pen className="mr-2 h-4 w-4" />
    //                     Rename
    //                   </ContextMenuItem>
    //                   <ContextMenuItem onSelect={() => deleteTextItem(text.id)}>
    //                     <Trash className="mr-2 h-4 w-4" />
    //                     Delete
    //                   </ContextMenuItem>
    //                 </ContextMenuContent>
    //               </ContextMenu>
    //             ))}
    //           </CommandGroup>

    //           <CommandSeparator />
    //         </CommandList>
    //       </>
    //     )}

    //     {logCommand && (
    //       <>
    //         <CommandList>
    //           <CommandEmpty>No results found.</CommandEmpty>
    //           <CommandGroup heading="Return">
    //             <CommandItem
    //               onSelect={() => {
    //                 setInitialCommand(true);
    //                 setLogCommand(false);
    //               }}
    //             >
    //               <CornerDownLeft className="mr-2 h-4 w-4" />
    //               Main Menu
    //             </CommandItem>
    //           </CommandGroup>
    //           <CommandSeparator />
    //         </CommandList>
    //         <CommandList>
    //           <CommandGroup
    //             heading={`Create a new log in category: ${
    //               currentCategory ? currentCategory : "Default"
    //             }`}
    //           >
    //             <CommandItem>
    //               <Textarea
    //                 onChange={handleLogChange}
    //                 placeholder="Ex. Cool design I saw today..."
    //                 onKeyDown={(e) => {
    //                   if (e.key === "Enter") {
    //                     createLog(e);
    //                     setCategoryCommand(false);
    //                     setLogCommand(false);
    //                     setInitialCommand(true);
    //                     setOpen(false);
    //                   }
    //                 }}
    //               />
    //             </CommandItem>
    //           </CommandGroup>
    //         </CommandList>
    //       </>
    //     )}

    //     {categoryCommand && (
    //       <>
    //         <CommandList>
    //           <CommandEmpty>No results found.</CommandEmpty>
    //           <CommandGroup heading="Return">
    //             <CommandItem
    //               onSelect={() => {
    //                 setInitialCommand(true);
    //                 setCategoryCommand(false);
    //               }}
    //             >
    //               <CornerDownLeft className="mr-2 h-4 w-4" />
    //               Main Menu
    //             </CommandItem>
    //           </CommandGroup>
    //           <CommandSeparator />
    //         </CommandList>
    //         <CommandList>
    //           <CommandGroup heading="Create a new category">
    //             <CommandItem>
    //               <Input
    //                 onChange={handleInputChange}
    //                 placeholder="Ex... Design"
    //                 value={inputText}
    //                 onKeyDown={(e) => {
    //                   if (e.key === "Enter") {
    //                     createCategory(e);
    //                     setInitialCommand(true);
    //                     setCategoryCommand(false);
    //                   }
    //                 }}
    //               />
    //             </CommandItem>
    //           </CommandGroup>
    //         </CommandList>
    //       </>
    //     )}
    //   </CommandDialog>

    <>
      <div>
        <Navbar />

        <div>
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden">
              <span className="sr-only">Open sidebar</span>
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  {/* <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm focus:ring-offset-0"
                    placeholder="Search for logs..."
                    type="search"
                    name="search"
                    autoComplete="off"
                  /> */}
                  <Input
                    placeholder="Search for logs..."
                    type="search"
                    name="search"
                    autoComplete="off"
                    className="flex justify-center items-center w-full h-full border-0"
                  />
                </div>
              </form>
            </div>
          </div>

          <main>
            <header>
              {/* Stats */}

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
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-primary">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="text-sm text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </p>
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
                  <span className="text-xs">⌘</span>J
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
                        {savedTexts.map((text) => (
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
                                        `You're in the ${text.text} category`
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
                                            Right click this category to rename
                                            or delete it.
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

              <h2 className="px-4 text-base font-semibold leading-7 text-primary sm:px-6 lg:px-8">
                Recent Logs
              </h2>
              <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                  <col className="w-full sm:w-4/12" />
                  <col className="lg:w-4/12" />
                  <col className="lg:w-2/12" />
                  <col className="lg:w-1/12" />
                  <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-sm leading-6 text-primary">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                    >
                      Log Name
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                    />
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                    >
                      Size (KB)
                    </th>
                    <th
                      scope="col"
                      className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                    >
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {/* {activityItems.map((item) => ( */}
                  {savedLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-secondary transition-all duration-150"
                      onClick={() => {
                        deleteLogItem(log.id);
                      }}
                    >
                      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div className="flex items-center gap-x-4">
                          <div className="truncate text-sm font-medium leading-6 text-primary max-w-xs">
                            {log.text}
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                        <div className="flex gap-x-3">
                          <Badge>{log.category}</Badge>
                        </div>
                      </td>
                      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start" />
                      </td>
                      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                        {log.size}
                      </td>
                      <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                        <time>
                          {log.createdTime
                            ? log.createdTime.toLocaleString()
                            : ""}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 border-t">
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
