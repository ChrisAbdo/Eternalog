import React from "react";
import Chart from "./chart";

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
import { Button } from "./ui/button";
import { BarChart4 } from "lucide-react";

export default function GraphModal({ data }: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">
          <BarChart4 className="w-6 h-6 mr-2" />
          Analytics
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Analytics | Work in progress</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 p-4">
              <div className="col-span-2 h-60">
                {/*   @ts-ignore */}
                <Chart data={data} />
              </div>
              <div className="h-40">
                {/*   @ts-ignore */}
                <Chart data={data} />
              </div>
              <div className="h-40">
                {/*   @ts-ignore */}
                <Chart data={data} />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
