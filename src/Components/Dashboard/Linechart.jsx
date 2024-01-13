import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
function Linechart() {
  return (
   
        <ResponsiveContainer width="80%" height="100%" aspect={1/0.8}>
    <LineChart width={300} height={100} data={data}>
      <Line type="monotone" dataKey="PropertiesPosted" stroke="#8884d8" strokeWidth={2} />
      {/* <Tooltip /> */}

    </LineChart>
  </ResponsiveContainer>  
  )
}

export default Linechart