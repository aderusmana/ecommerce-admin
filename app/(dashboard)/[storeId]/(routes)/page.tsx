import React from 'react';
import prismadb from '@/lib/prismadb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote, CreditCard, Package } from 'lucide-react';
import { formatter } from '@/lib/utils';
import { getTotalRevenue } from '@/action/getTotalRevenue';
import { getTotalSales } from '@/action/getTotalSales';
import { getTotalProduct } from '@/action/getTotalProducts';
import Overview from '@/components/overview';
import { getChartRevenue } from '@/action/getChartRevenue';

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);
  const totalProduct = await getTotalProduct(params.storeId);
  const chartRevenue = await getChartRevenue(params.storeId);
  return (
    <div className="flex-col">
  <div className="flex-1 space-y-4 p-8 pt-6">
    <Heading title="Dashboard" description="Overview of your store" />
    <Separator />
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="w-full sm:w-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-4">
          <CardTitle className="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <Banknote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatter.format(totalRevenue)}
          </div>
        </CardContent>
      </Card>
      <Card className="w-full sm:w-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-4">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{totalSales}</div>
        </CardContent>
      </Card>
      <Card className="w-full sm:w-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-4">
          <CardTitle className="text-sm font-medium">
            Product in Stock
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProduct}</div>
        </CardContent>
      </Card>
      <Card className="sm:col-span-3">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={chartRevenue} />
        </CardContent>
      </Card>
    </div>
  </div>
</div>

  );
};
export default DashboardPage;
