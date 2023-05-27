import React from 'react';
import {
  CommandList,
  CommandEmpty,
  CommandSeparator,
  CommandGroup,
  CommandItem,
} from '../ui/command';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CornerDownLeft } from 'lucide-react';

export default function CategoryCommandDialog({
  handleInputChange,
  inputText,
  createCategory,
  setInitialCommand,
  setCategoryCommand,
}: any) {
  return (
    <>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandSeparator />
      </CommandList>
      <CommandList>
        <CommandGroup heading="Create a new category">
          <div className="flex w-full mt-4 mb-4 items-center space-x-2">
            <Input
              onChange={handleInputChange}
              placeholder="Ex... Design"
              value={inputText}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createCategory(e);
                  setInitialCommand(true);
                  setCategoryCommand(false);
                }
              }}
            />{' '}
            <Button
              type="submit"
              variant="outline"
              disabled={inputText === ''}
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
            autoFocus={false}
          >
            <CornerDownLeft className="mr-2 h-4 w-4" />
            Main Menu
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}
