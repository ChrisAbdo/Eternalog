import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { BookOpen, Check, Pen, Trash, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import TableSkeleton from '../skeletons/table-skeleton';

export default function TableData({
  filteredTexts,
  renamingId,
  setRenamingId,
  renamingText,
  setRenamingText,
  renameLogItem,
  deleteLogItem,
}: any) {
  return (
    <Table className="mb-20">
      <TableCaption>A list of your recent logs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Log Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden sm:table-cell">Size</TableHead>

          <TableHead className="hidden sm:table-cell">Created</TableHead>

          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTexts.length > 0 ? (
          filteredTexts.map((log: any) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium truncate md:max-w-[300px] max-w-[50px]">
                {log.text}
              </TableCell>
              <TableCell>
                <Badge>{log.category}</Badge>
              </TableCell>

              <TableCell className="hidden sm:sm:table-cell">
                {/* add the following logic: if it has 3 leading 0s, show it as "<0.01" */}
                {log.size < 0.01 ? '<0.01 KB' : log.size.toFixed(2) + ' KB'}
              </TableCell>

              <TableCell className="hidden sm:sm:table-cell">
                <time>
                  {log.createdTime ? log.createdTime.toLocaleString() : ''}
                </time>
              </TableCell>

              <TableCell className="text-right">
                <Sheet>
                  <SheetTrigger>
                    {' '}
                    <Button variant="ghost">
                      <BookOpen className="h-5 w-5" />
                      <span className="ml-2">View</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent size="xl">
                    <SheetHeader>
                      <SheetTitle>View Log</SheetTitle>
                      <SheetTitle>
                        <div className="flex space-x-2">
                          <Badge>{log.category}</Badge>
                          <Badge>{log.size} KB</Badge>
                          <Badge>
                            {log.createdTime
                              ? log.createdTime.toLocaleString()
                              : ''}
                          </Badge>
                        </div>
                      </SheetTitle>

                      <Separator />

                      <SheetDescription>
                        <ScrollArea className="h-96">
                          {renamingId === log.id ? (
                            <>
                              <Textarea
                                className="whitespace-pre-wrap overflow-auto"
                                onChange={(e) => {
                                  setRenamingText(e.target.value);
                                }}
                                defaultValue={log.text}
                              />

                              <Button
                                className="w-full mt-4"
                                disabled={
                                  renamingText === null || renamingText === ''
                                }
                                onClick={() => {
                                  console.log('renamingText', renamingText);
                                  renameLogItem(
                                    log.id,
                                    // @ts-ignore
                                    renamingText
                                  );

                                  // @ts-ignore
                                  setRenamingId('');
                                }}
                              >
                                <Check className="h-5 w-5 mr-2" />
                                Save
                              </Button>

                              <Button
                                variant="ghost"
                                className="w-full mt-4"
                                onClick={() => {
                                  // @ts-ignore
                                  setRenamingId('');
                                  setRenamingText('');
                                }}
                              >
                                <X className="h-5 w-5 mr-2" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <pre className="whitespace-pre-wrap overflow-auto">
                              {log.text}
                            </pre>
                          )}
                        </ScrollArea>

                        <div className="mt-4">
                          <Separator />
                        </div>

                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                              setRenamingId(log.id);
                            }}
                          >
                            <Pen className="h-5 w-5 mr-2" />
                            Edit Log
                          </Button>
                          <Button
                            variant="destructive"
                            className="mt-4"
                            onClick={() => deleteLogItem(log.id)}
                          >
                            <Trash className="h-5 w-5 mr-2" />
                            Delete Log
                          </Button>
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableSkeleton />
        )}
      </TableBody>
    </Table>
  );
}
