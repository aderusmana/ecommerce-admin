'use client';
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface OverviewProps {
  data: any[];
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width={'100%'} height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey={'name'}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false} 
          tickFormatter={(value) => `Rp.${(value / 1000)}`} />
          <Bar dataKey={'total'} fill='#349Bdb' radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;
