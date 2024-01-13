import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PieCharts(props) {
  const data=props.data
  return (
    <ResponsiveContainer width={"100%"} height={"100%"} aspect={1/1.1}>
    <PieChart width={"50%"}>
        <Pie
          data={data}
          innerRadius={"70%"}
          outerRadius={"90%"}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Tooltip/>
        </Pie>
      </PieChart>
      </ResponsiveContainer>
  )
}

export default PieCharts