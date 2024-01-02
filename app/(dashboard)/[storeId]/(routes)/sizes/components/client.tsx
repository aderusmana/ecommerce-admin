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
  SizeColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns';

interface SizeClientProps {
  data: SizeColumn[];
}
const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();

  const params = useParams();

  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Sizes (${data.length})`}
          description={'Manage sizes for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className={'mr-2 h-4 w-4'} /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={'name'} columns={columns} data={data} />
      <Heading title={'API'} description={'API Calls for Sizex'} />
      <Separator />
      <ApiList entityName={'sizes'} entityIdName={'sizeId'} />
    </div>
  );
};

export default SizeClient;
