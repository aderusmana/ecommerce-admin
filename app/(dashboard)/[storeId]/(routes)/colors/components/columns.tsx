'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CellAction from './cellAction';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Color Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'value',
    header: "Value",
    cell: ({ row }) => {
      return (
        <div
          className="w-10 h-10 rounded-full"
          style={{ backgroundColor: row.original.value }}
        />
      );
    }
  },
        
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
