'use client';

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CopyIcon, EditIcon, MoreHorizontalIcon, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';
import { SizeColumn } from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns';

interface CellActionsProps {
  data: SizeColumn;
}
const CellAction: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID has copied to the clipboard');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      router.refresh();
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Make sure you delete all products using this category');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={'h-8 w-8 p-0'} variant={'ghost'}>
            <span className={'sr-only'}>Open Menu</span>
            <MoreHorizontalIcon className={'h-4 w-4'} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'}>
          <DropdownMenuLabel>
            Actions
            <DropdownMenuItem onClick={() => onCopy(data.id)}>
              <CopyIcon className={'mr-2 w-4 h-4'} /> Copy ID
            </DropdownMenuItem>{' '}
            <DropdownMenuItem
              onClick={() =>
                router.push(`/${params.storeId}/sizes/${data.id}`)
              }
            >
              <EditIcon className={'mr-2 w-4 h-4'} /> Update
            </DropdownMenuItem>{' '}
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash className={'mr-2 w-4 h-4'} /> Delete
            </DropdownMenuItem>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
