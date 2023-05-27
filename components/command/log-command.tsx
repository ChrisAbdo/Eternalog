import React from 'react';
import {
  CommandList,
  CommandEmpty,
  CommandSeparator,
  CommandGroup,
  CommandItem,
} from '../ui/command';
import { Textarea } from '../ui/textarea';
import { BookUp, CornerDownLeft } from 'lucide-react';

export default function LogCommandDialog({
  handleLogChange,
  createLog,
  setInitialCommand,
  setLogCommand,
  setCategoryCommand,
  setOpen,
  currentCategory,
  logText,
}: any) {
  return (
    <>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandSeparator />
      </CommandList>
      <CommandList>
        <CommandGroup
          heading={`Create a new log in category: ${
            currentCategory ? currentCategory : 'Default'
          }`}
        >
          <CommandItem>
            <Textarea
              onChange={handleLogChange}
              placeholder="Ex. Cool design I saw today..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
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
            disabled={logText === ''}
            className={`mb-1.5 ${logText === '' ? 'cursor-not-allowed' : ''}`}
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
  );
}
