import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import SizeClient from '@/app/(dashboard)/[storeId]/(routes)/sizes/components/client';
import { SizeColumn } from './components/columns';

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSize: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name:item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className={'flex-col'}>
      <div className={'flex-1 spacex-y-4 p-8 pt-6'}>
        <SizeClient data={formattedSize} />
      </div>
    </div>
  );
};

export default SizePage;
