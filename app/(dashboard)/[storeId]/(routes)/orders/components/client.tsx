'use client';
import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import {
  BillboardColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/billboards/components/columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface BillboardClientProps {
  data: BillboardColumn[];
}
const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();

  const params = useParams();

  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Billboards (${data.length})`}
          description={'Manage billboard for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className={'mr-2 h-4 w-4'} /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={'label'} columns={columns} data={data} />
      <Heading title={'API'} description={'API Calls for Billboards'} />
      <Separator />
      <ApiList entityName={'billboards'} entityIdName={'billboardsId'} />
    </div>
  );
};

export default BillboardClient;
