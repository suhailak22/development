import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function BiaxialBarChart() {
  const data = [
    {
      name: 'January',
      PropertiesPosted: 4000,
      PropertiesSaled: 2400,
      amt: 2400,
    },
    {
      name: 'February',
      PropertiesPosted: 3000,
      PropertiesSaled: 1398,
      amt: 2210,
    },
    {
      name: 'March',
      PropertiesPosted: 2000,
      PropertiesSaled: 9800,
      amt: 2290,
    },
    {
      name: 'April',
      PropertiesPosted: 2780,
      PropertiesSaled: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      PropertiesPosted: 1890,
      PropertiesSaled: 4800,
      amt: 2181,
    },
    {
      name: 'June',
      PropertiesPosted: 2390,
      PropertiesSaled: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      PropertiesPosted: 3490,
      PropertiesSaled: 4300,
      amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={2/1.2}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" stroke="#8C193F" />
      <YAxis yAxisId="right" orientation="right" stroke="#E57097" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="PropertiesPosted" fill="#8C193F" />
      <Bar yAxisId="right" dataKey="PropertiesSaled" fill="#E57097" />
    </BarChart>
  </ResponsiveContainer>
   
  )
}

export default BiaxialBarChart