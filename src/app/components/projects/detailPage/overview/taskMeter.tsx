import { ITask } from "../../../../../types/models";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps {
  tasks: ITask[];
}

const SemiCircleChart: React.FC<PieChartProps> = ({ tasks }) => {

  const statuses = countTaskStatuses(tasks);

  const data = [
      { name: "Completed", value: statuses['completed'] },
      { name: "In-Progress", value: statuses['in-progress'] },
      { name: "Blocked", value: statuses['blocked'] },
      { name: "To-Do", value: statuses["to-do"] },
  ];

  const completedTaskPercentage = (statuses['completed'] / tasks.length) * 100;

  const COLORS = ["#36A2EB", "#FFCE56", "#FF6384", "#D3D3D3"];

  return (<div className="flex flex-col lg:w-4/6 w-[100%]">
    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
      <h2 className="absolute text-sm text-center">Project Progress</h2>
      <h2 className="top-[50%] left-[44%] absolute text-4xl text-center text-blue-500">{Math.round(completedTaskPercentage)}%</h2>
      <h2 className="top-[65%] left-[38.5%] lg:left-[40.5%] absolute text-sm text-center text-gray-700 dark:text-gray-100">Tasks Completed</h2>
      <div className="w-full h-64">
      <ResponsiveContainer> 
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="90%"
            innerRadius={115}
            outerRadius={150}
            fill="#8884d8"
            label
            startAngle={180}
            endAngle={0}
            cornerRadius={5 }
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend iconSize={8} layout="horizontal" verticalAlign="bottom" align="center"/>
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  </div>
  );
};

export default SemiCircleChart;

const countTaskStatuses = (tasks: ITask[]): StatusCount => {
  return tasks.reduce<StatusCount>((acc, task) => {
      acc[task.status as keyof StatusCount] = (acc[task.status as keyof StatusCount] || 0) + 1;
      return acc;
  }, {
      "to-do": 0,
      "in-progress": 0,
      "completed": 0,
      "blocked": 0,
      "in-review": 0
  });
};