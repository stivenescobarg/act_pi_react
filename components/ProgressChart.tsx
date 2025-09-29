"use client";

{/* PieChart: contenedor general para gráficos de pastel.

Pie: define la porción del pastel.

Cell: permite colorear cada segmento individual.

Tooltip: muestra información al pasar el mouse.

ResponsiveContainer: hace que el gráfico sea responsivo, se adapta al contenedor padre. */ }

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
      <h1>📊 Progreso Diario</h1>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            
          >{/* Itera sobre data para crear un Cell por segmento.
            fill={COLORS[index % COLORS.length]} → asigna color según el índice.
            % COLORS.length asegura que se repitan los colores si hay más segmentos. */}
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
