import React from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

interface GanttChartProps {
    tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {

    return (
        <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Project Timeline</h2>
            <div className="overflow-auto">
                <Gantt
                    tasks={tasks}
                    viewMode={ViewMode.Day}
                    barCornerRadius={8}
                    fontFamily="sans-serif"
                    columnWidth={72}
                    barProgressColor="#36A2EB"
                    barBackgroundColor="#4CAF50"
                    todayColor="rgba(255, 0, 0, 0.3)"
                    barProgressSelectedColor="#FF6384"
                    fontSize="12px"
                />
            </div>
        </div>
    );
};

export default GanttChart;
