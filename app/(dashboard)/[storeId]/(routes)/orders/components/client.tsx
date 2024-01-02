'use client';
import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  OrderColumn,
  columns,
} from '@/app/(dashboard)/[storeId]/(routes)/orders/components/columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
  data: OrderColumn[];
}
const OrderClient: React.FC<OrderClientProps> = ({ data }) => {

  return (
    <div>
      <div className={'flex items-center justify-between'}>
        <Heading
          title={`Orders (${data.length})`}
          description={'Manage order for your store'}
        />
      </div>
      <Separator />
      <DataTable searchKey={'products'} columns={columns} data={data} />
    </div>
  );
};

export default OrderClient;
