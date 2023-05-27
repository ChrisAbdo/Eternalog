import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Progress } from './ui/progress';

export default function Footer({
  remainingStoragePercentage,
  remainingSpace,
}: any) {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="bg-background p-4 z-50 border-t">
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
    </div>
  );
}
