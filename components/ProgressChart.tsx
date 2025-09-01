"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressChartProps {
  completed: number;
  total: number;
}

export default function ProgressChart({ completed, total }: ProgressChartProps) {
  const data = [
    { name: "Completados", value: completed },
    { name: "Pendientes", value: total - completed },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="progress-chart">
      <h3>📊 Progreso Diario</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <p>
        {completed} de {total} hábitos completados
      </p>
    </div>
  );
}
