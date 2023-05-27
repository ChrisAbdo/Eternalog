'use client';

import React from 'react';
import Navbar from '@/components/navbar';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BarChart4, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

import { Skeleton } from '@/components/ui/skeleton';

import StatBlock from '@/components/stats';

import GraphModal from '@/components/graph-modal';

import { Separator } from '@/components/ui/separator';
import TeamSwitcher from '@/components/team-switcher';
import { CountUp } from 'use-count-up';

import dynamic from 'next/dynamic';

import CategoryCommandDialog from '@/components/command/category-command';
import LogCommandDialog from '@/components/command/log-command';
import InitialCommandDialog from '@/components/command/initial-command';

import TableData from '@/components/table/table-data';

const Footer = dynamic(() => import('@/components/footer'), {
  ssr: false,
});

import CommandDialogWrapper from '@/components/command/command-dialog';

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

  let [currentCategory, setCurrentCategory] = React.useState<string>('');

  let [open, setOpen] = React.useState(false);

  let [inputText, setInputText] = React.useState<string>('');
  let [logText, setLogText] = React.useState<string>('');

  let [savedTexts, setSavedTexts] = React.useState<TextItem[]>([]);
  let [savedLogs, setSavedLogs] = React.useState<LogItem[]>([]);

  let [renamingText, setRenamingText] = React.useState<string | null>(null);
  let [renamingId, setRenamingId] = React.useState<number | null>(null);

  let [selectedCategory, setSelectedCategory] = React.useState<string>('');
  let [query, setQuery] = React.useState<string>('');

  let filteredTexts = savedLogs.filter((log) => {
    if (
      query !== '' &&
      // !textItem.text.toLowerCase().includes(query.toLowerCase())
      !log.text.toLowerCase().includes(query.toLowerCase()) &&
      !log.category.toLowerCase().includes(query.toLowerCase())
    ) {
      return false;
    }
    if (selectedCategory !== '' && !log.category.includes(selectedCategory)) {
      return false;
    }
    return true;
  });

  let stats = [
    {
      name: 'Number of logs',
      value:
        savedLogs && savedLogs.length > 0 ? (
          <CountUp isCounting end={savedLogs.length} duration={3.2} />
        ) : (
          <Skeleton className="w-[100px] h-[30px] rounded-md" />
        ),
    },
    {
      name: 'Number of categories',
      value:
        savedTexts && savedTexts.length > 0 ? (
          <CountUp isCounting end={savedTexts.length} duration={3.2} />
        ) : (
          <Skeleton className="w-[100px] h-[30px] rounded-md" />
        ),
    },
    {
      name: 'Storage used',
      value:
        useStoragePercentage && useStoragePercentage > 0 ? (
          <>
            <CountUp isCounting end={useStoragePercentage} duration={3.2} /> %
          </>
        ) : (
          <Skeleton className="w-[100px] h-[30px] rounded-md" />
        ),
    },
    {
      name: 'Remaining Storage',
      value:
        remainingSpace && remainingSpace > 0 ? (
          <>
            <CountUp
              isCounting
              end={remainingSpace}
              duration={3.2}
              formatter={(value) => Number(value).toLocaleString()}
            />{' '}
            KB
          </>
        ) : (
          <Skeleton className="w-[100px] h-[25px] rounded-md" />
        ),
    },
  ];

  let logsByDay = {};

  savedLogs.forEach((log) => {
    let date = new Date(log.createdTime);
    let key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    //   @ts-ignore
    if (!logsByDay[key]) {
      //   @ts-ignore
      logsByDay[key] = 1; // initialize the counter
    } else {
      //   @ts-ignore
      logsByDay[key]++; // increment the counter
    }
  });

  let logs = Object.entries(logsByDay).map(([key, count]) => ({
    date: new Date(key),
    value: count,
  }));
  //   @ts-ignore
  logs.sort((a, b) => a.date - b.date);

  let data = logs;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && e.metaKey) || (e.key === 'k' && e.ctrlKey)) {
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  React.useEffect(() => {
    let storedTexts = localStorage.getItem('texts');
    let storedLogs = localStorage.getItem('logs');

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
    console.log('Create category called with event: ', event);

    if (inputText === '') return;

    const newTexts: TextItem[] = [
      ...savedTexts,
      {
        text: inputText,
        // id should increment by 1
        id: savedTexts.length + 1,
      },
    ];

    localStorage.setItem('texts', JSON.stringify(newTexts));
    setSavedTexts(newTexts);
    setInputText('');

    toast({
      title: 'Category created',
    });

    logRemainingLocalStorageSpace();
    console.log(newTexts);
  }

  async function createLog(event: React.SyntheticEvent) {
    if (logText === '') return;

    let sizeInBytes = new Blob([logText], { type: 'text/plain' }).size;

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

    localStorage.setItem('logs', JSON.stringify(newLogs));
    setSavedLogs(newLogs);
    setLogText('');

    logRemainingLocalStorageSpace();

    toast({
      title: 'Log created',
    });

    console.log(newLogs);
  }

  function renameTextItem(id: number) {
    let oldCategoryName =
      savedTexts.find((textItem) => textItem.id === id)?.text || '';
    let updatedTexts = savedTexts.map((textItem) =>
      textItem.id === id ? { ...textItem, text: renamingText || '' } : textItem
    );

    let updatedLogs = savedLogs.map((logItem) =>
      logItem.category === oldCategoryName
        ? { ...logItem, category: renamingText || '' }
        : logItem
    );

    localStorage.setItem('texts', JSON.stringify(updatedTexts));
    localStorage.setItem('logs', JSON.stringify(updatedLogs));

    setSavedTexts(updatedTexts);
    setSavedLogs(updatedLogs);

    setRenamingText(null);
    setRenamingId(null);

    toast({
      title: 'Category renamed',
    });

    logRemainingLocalStorageSpace();
  }

  function renameLogItem(id: number) {
    let updatedLogs = savedLogs.map((logItem) =>
      logItem.id === id ? { ...logItem, text: renamingText || '' } : logItem
    );

    localStorage.setItem('logs', JSON.stringify(updatedLogs));

    setSavedLogs(updatedLogs);

    setRenamingText(null);
    setRenamingId(null);

    toast({
      title: 'Log renamed',
    });

    logRemainingLocalStorageSpace();
  }

  function deleteTextItem(id: number) {
    let categoryNameToDelete =
      savedTexts.find((textItem) => textItem.id === id)?.text || '';
    let filteredTexts = savedTexts.filter((textItem) => textItem.id !== id);
    let filteredLogs = savedLogs.filter(
      (logItem) => logItem.category !== categoryNameToDelete
    );

    localStorage.setItem('texts', JSON.stringify(filteredTexts));
    localStorage.setItem('logs', JSON.stringify(filteredLogs));
    setSavedTexts(filteredTexts);
    setSavedLogs(filteredLogs);

    toast({
      title: 'Category deleted',
    });

    if (renamingId === id) {
      setRenamingText(null);
      setRenamingId(null);
    }

    logRemainingLocalStorageSpace();
  }

  function deleteLogItem(id: number) {
    let filteredLogs = savedLogs.filter((logItem) => logItem.id !== id);
    localStorage.setItem('logs', JSON.stringify(filteredLogs));
    setSavedLogs(filteredLogs);

    logRemainingLocalStorageSpace();
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
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are zero indexed
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  return (
    <>
      <div>
        <Navbar />

        <div>
          <main>
            <header>
              <div className="flex justify-between items-center p-4">
                <h1 className="text-xl">Logs</h1>
                {mounted ? (
                  <GraphModal data={data} />
                ) : (
                  <Button variant="outline" disabled>
                    <BarChart4 className="w-6 h-6 mr-2" />
                    Analytics
                  </Button>
                )}
              </div>

              <div>
                {/* @ts-ignore */}
                <StatBlock stats={stats} />

                <div className="mt-4 px-4">
                  <Separator />
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 px-4 mt-4">
                  <div className="flex items-center space-x-4 w-full">
                    <Input
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search for logs..."
                      type="search"
                      name="search"
                      autoComplete="off"
                      className="flex justify-center items-center max-w-[25rem] rounded-md"
                    />

                    {/* Category Switcher */}
                    <TeamSwitcher
                      // @ts-ignore
                      savedLogs={savedLogs}
                      // @ts-ignore
                      onSelect={(selectedTeam) => {
                        // @ts-ignore
                        setQuery(selectedTeam.label);
                      }}
                      createCategory={createCategory}
                    />
                  </div>

                  {/* Button to open Command Dialog */}
                  <Button
                    onClick={() => setOpen(true)}
                    variant="default"
                    className="w-full flex items-center sm:max-w-[25rem] max-w-full"
                  >
                    <span className="sr-only">Create a new log</span>
                    <Plus className="h-5 w-5 mr-2 order-first" />
                    <span className="mx-auto">Create</span>
                    <kbd className="bg-primary pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </Button>
                </div>
              </div>
            </header>

            <div>
              <CommandDialogWrapper
                open={open}
                setOpen={setOpen}
                setLogCommand={setLogCommand}
                setInitialCommand={setInitialCommand}
                setCategoryCommand={setCategoryCommand}
                setRenamingId={setRenamingId}
                setRenamingText={setRenamingText}
              >
                {initialCommand && (
                  <InitialCommandDialog
                    setInitialCommand={setInitialCommand}
                    setCategoryCommand={setCategoryCommand}
                    setLogCommand={setLogCommand}
                    setCurrentCategory={setCurrentCategory}
                    savedTexts={savedTexts}
                    renamingId={renamingId}
                    setRenamingId={setRenamingId}
                    setRenamingText={setRenamingText}
                    renameTextItem={renameTextItem}
                    deleteTextItem={deleteTextItem}
                  />
                )}

                {logCommand && (
                  <LogCommandDialog
                    currentCategory={currentCategory}
                    handleLogChange={handleLogChange}
                    createLog={createLog}
                    setCategoryCommand={setCategoryCommand}
                    setLogCommand={setLogCommand}
                    setInitialCommand={setInitialCommand}
                    setOpen={setOpen}
                    logText={logText}
                  />
                )}

                {categoryCommand && (
                  <CategoryCommandDialog
                    handleInputChange={handleInputChange}
                    inputText={inputText}
                    createCategory={createCategory}
                    setInitialCommand={setInitialCommand}
                    setCategoryCommand={setCategoryCommand}
                  />
                )}
              </CommandDialogWrapper>

              <div className="mb-4" />

              <TableData
                filteredTexts={filteredTexts}
                renamingId={renamingId}
                setRenamingId={setRenamingId}
                setRenamingText={setRenamingText}
                renameLogItem={renameLogItem}
                deleteLogItem={deleteLogItem}
              />
            </div>
          </main>
        </div>
      </div>

      <Footer
        //  @ts-ignore
        remainingStoragePercentage={remainingStoragePercentage}
        remainingSpace={remainingSpace}
      />
    </>
  );
}
