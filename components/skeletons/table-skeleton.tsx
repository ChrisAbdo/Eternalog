import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className="font-medium">
            <Skeleton className="w-[125px] h-[30px] rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[75px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[75px] h-[30px] rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[75px] h-[30px] rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
