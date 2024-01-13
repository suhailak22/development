import React from 'react'
import { ResponsiveContainer,BarChart, Bar, Tooltip } from "recharts";


function TinyBarChart() {
    // const data = [
    //     {
    //       name: 'January',
    //       PropertiesPosted: 4000,
    //       PropertiesSaled: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: 'February',
    //       PropertiesPosted: 3000,
    //       PropertiesSaled: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: 'March',
    //       PropertiesPosted: 2000,
    //       PropertiesSaled: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: 'April',
    //       PropertiesPosted: 2780,
    //       PropertiesSaled: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: 'May',
    //       PropertiesPosted: 1890,
    //       PropertiesSaled: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: 'June',
    //       PropertiesPosted: 2390,
    //       PropertiesSaled: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: 'July',
    //       PropertiesPosted: 3490,
    //       PropertiesSaled: 4300,
    //       amt: 2100,
    //     },
    //   ];
    const data = [
        {
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ];
  return (
        <ResponsiveContainer width="80%" height="100%" aspect={2/1}>
        <BarChart data={data}>
          <Bar dataKey="uv" barSize={5} barCategoryGap={2} fill="#8C193F" />
          {/* <Tooltip/> */}
        </BarChart>
      </ResponsiveContainer>
  )
}

export default TinyBarChart