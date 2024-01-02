'use client';
import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';

import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';
import {
  ColorColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/colors/components/columns';

interface ColorClientProps {
  data: ColorColumn[];
}
const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();

  const params = useParams();

  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Colors (${data.length})`}
          description={'Manage colors for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className={'mr-2 h-4 w-4'} /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={'name'} columns={columns} data={data} />
      <Heading title={'API'} description={'API Calls for Colors'} />
      <Separator />
      <ApiList entityName={'colors'} entityIdName={'colorId'} />
    </div>
  );
};

export default ColorClient;
