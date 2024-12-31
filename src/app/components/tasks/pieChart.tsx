import { ITask } from "@/types/models";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps {
  tasks: ITask[];
}

const CustomPieChart: React.FC<PieChartProps> = ({ tasks }) => {

  const statuses = countTaskStatuses(tasks);
  

  const data = [
    { name: "To-Do", value: statuses["to-do"] },
    { name: "In-Review", value: statuses["in-review"] },
    { name: "Completed", value: statuses['completed'] },
    { name: "Blocked", value: statuses['blocked'] },
    { name: "In-Progress", value: statuses['in-progress'] },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"];

  return (<div className="flex flex-col lg:w-2/6 mt-4 lg:mt-0">
    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full">
      <h2 className="absolute text-sm text-center">TASKS CHART</h2>
      <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
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

export default CustomPieChart;

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