// components/HabitList.tsx
"use client";

import HabitItem from "./HabitItem";
import { Habit } from "../lib/types";

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: number) => void;
}

export default function HabitList({ habits, toggleHabit }: HabitListProps) {
  return (
    <div>
      {habits.map(habit => ( //Para cada habit, renderiza un HabitItem.
        <HabitItem
          key={habit.id}
          habit={habit} // pasa el objeto completo del hábito a HabitItem.
          toggleHabit={toggleHabit}
        // Esto permite que cada HabitItem sea independiente y tenga su propio botón de completar/desmarcar.
        />
      ))}
    </div>
  );
}