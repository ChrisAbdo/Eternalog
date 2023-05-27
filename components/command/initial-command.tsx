import React from 'react';
import {
  CommandEmpty,
  CommandSeparator,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from '../ui/command';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  BookOpen,
  BrainCog,
  Info,
  Lightbulb,
  Pen,
  Plus,
  Trash,
} from 'lucide-react';

export default function InitialCommandDialog({
  savedTexts,
  setInitialCommand,
  setCategoryCommand,
  setLogCommand,
  setCurrentCategory,
  renamingId,
  setRenamingId,
  renamingText,
  setRenamingText,
  renameTextItem,
  deleteTextItem,
}: any) {
  return (
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
              setCurrentCategory('Thoughts');
            }}
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Thoughts
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setCategoryCommand(false);
              setInitialCommand(false);
              setLogCommand(true);
              setCurrentCategory('Bookmarks');
            }}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Bookmarks
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="My Categories">
          {savedTexts.length > 0 ? (
            savedTexts.map((text: any) => (
              <ContextMenu key={text.id}>
                <ContextMenuTrigger>
                  <div className="flex justify-between items-center w-full">
                    {renamingId === text.id ? (
                      <div className="flex w-full space-x-2 mt-2 mb-2">
                        <Input
                          value={renamingText || ''}
                          onChange={(e) => setRenamingText(e.target.value)}
                          autoFocus={true}
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

                          console.log(`in the ${text.text} category`); // print the category
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
                                Right click this category to rename or delete
                                it.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CommandItem>
                    )}
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onSelect={() => setRenamingId(text.id)}>
                    <Pen className="mr-2 h-4 w-4" />
                    Rename
                  </ContextMenuItem>
                  <ContextMenuItem onSelect={() => deleteTextItem(text.id)}>
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
  );
}
