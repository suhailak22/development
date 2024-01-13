import React from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';




function BiaxialBarChart() {
  const data1 = [
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
  const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
      cnt: 490,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
      cnt: 590,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
      cnt: 350,
    },
    {
      name: 'Page D',
      uv: 590,
      pv: 1200,
      amt: 1228,
      cnt: 480,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
      cnt: 460,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
      cnt: 380,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={3/1.2}>
    <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >

          <XAxis dataKey="name" color={"white"} />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Area type="monotone" dataKey="amt" fill="#666" stroke="#FFC72C" strokeWidth={"3px"} opacity={0.2}/>
          <Bar dataKey="pv" barSize={20} fill="#8C193F" />
          <Line type="monotone" strokeWidth={"3px"} dataKey="uv"  stroke="#ff7300" />
         
        </ComposedChart>
  </ResponsiveContainer>
   
  )
}

export default BiaxialBarChart