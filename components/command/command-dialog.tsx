import React from 'react';
import { CommandDialog } from '../ui/command';

export default function CommandDialogWrapper({
  open,
  setOpen,
  setLogCommand,
  setInitialCommand,
  setCategoryCommand,
  setRenamingId,
  setRenamingText,
  children,
}: any) {
  return (
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
      {children}
    </CommandDialog>
  );
}
