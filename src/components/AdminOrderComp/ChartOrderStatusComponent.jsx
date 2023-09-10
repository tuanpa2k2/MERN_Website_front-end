import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { convertDataStatus } from "../../until";

import "./AdminOrderComponent.scss";

const ChartOrderStatusComponent = (props) => {
  const dataStatus = convertDataStatus(props.data, "isPaid");

  const COLORS = ["#1622ff", "#ff1616"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="wrapper-chart">
      <div className="title">Trạng thái thanh toán</div>
      <ResponsiveContainer width="100%" height="118%">
        <PieChart>
          <Pie
            data={dataStatus}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip backgroundColor="blue" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartOrderStatusComponent;
