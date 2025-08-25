// app/page.tsx
"use client";

import { useState } from "react";
import HabitList from "../../components/HabitList";
import { Habit } from "../../lib/types";

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Leer 10 páginas", completed: false },
    { id: 2, name: "Beber agua", completed: false },
    { id: 3, name: "Hacer ejercicio", completed: false },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };
      const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;

  return (
    <div className="app-container">
      <h1>✅ Checklist de Hábitos Diarios</h1>
      <p>Progreso: {completedCount} de {totalCount} completados</p>

      <HabitList habits={habits} toggleHabit={toggleHabit} />
    </div>
  );

}