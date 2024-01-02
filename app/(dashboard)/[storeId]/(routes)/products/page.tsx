import React from 'react';
import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import { ProductColumn } from './components/columns';
import ProductClient from './components/client';

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size : true,
      color : true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price : formatter.format(item.price.toNumber()) ,
    isFeatured : item.isFeatured,
    isArchived : item.isArchived,
    category: item.category.name,
    size : item.size.value,
    color : item.color.value,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className={'flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'}>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
