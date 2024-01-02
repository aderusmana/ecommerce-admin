'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CellAction from './cellAction';

export type SizeColumn = {
  id: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
