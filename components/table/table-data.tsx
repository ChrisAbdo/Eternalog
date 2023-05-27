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
import { BookOpen, Check, Loader2, Pen, Trash, X } from 'lucide-react';
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
import { Input } from '../ui/input';

export default function TableData({
  filteredTexts,
  renamingId,
  setRenamingId,
  renamingText,
  setRenamingText,
  renameLogItem,
  deleteLogItem,
}: any) {
  const [loading, setLoading] = React.useState(false);
  const [bio, setBio] = React.useState('');
  const [vibe, setVibe] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('');
  const [generatedBios, setGeneratedBios] = React.useState<String>('');

  const [gptEnabled, setGptEnabled] = React.useState<boolean>(false);

  const bioRef = React.useRef<null | HTMLDivElement>(null);

  const prompt = 'tell me a little about yourself';

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios('');
    setLoading(true);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  console.log('filteredTexts', filteredTexts);

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

                        {generatedBios && (
                          <>
                            <div>
                              <h2
                                className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto mb-2"
                                ref={bioRef}
                              >
                                Your generated bios
                              </h2>
                            </div>
                            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                              {generatedBios
                                .substring(generatedBios.indexOf('1') + 3)
                                .split('2.')
                                .map((generatedBio) => {
                                  return (
                                    <div
                                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          generatedBio
                                        );
                                      }}
                                      key={generatedBio}
                                    >
                                      <p>{generatedBio}</p>
                                    </div>
                                  );
                                })}
                            </div>
                          </>
                        )}

                        <div className="mt-4">
                          <Separator />
                        </div>

                        <div className="flex justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            {!loading && (
                              <Button
                                onClick={() => {
                                  setGptEnabled(!gptEnabled);
                                  console.log(log.text);
                                }}
                              >
                                Chat with log (GPT4)
                              </Button>
                            )}

                            {loading && (
                              <Button>
                                <Loader2 size={24} className="animate-spin" />
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              onClick={() => {
                                setRenamingId(log.id);
                              }}
                            >
                              <Pen className="h-5 w-5 mr-2" />
                              Edit Log
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            onClick={() => deleteLogItem(log.id)}
                          >
                            <Trash className="h-5 w-5 mr-2" />
                            Delete Log
                          </Button>
                        </div>

                        {gptEnabled && (
                          <ScrollArea className="h-96">
                            <div className="mt-4">
                              <Input placeholder="Tell me a little about yourself" />
                            </div>
                          </ScrollArea>
                        )}
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
