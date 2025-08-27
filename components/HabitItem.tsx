// components/HabitItem.tsx
"use client";

import { Habit } from "../lib/types";

interface HabitItemProps {
  habit: Habit;
  toggleHabit: (id: number) => void;
}

export default function HabitItem({ habit, toggleHabit }: HabitItemProps) {
  return (
    <div className={habit-item ${habit.completed ? "completed" : "pending"}}>
      <span>{habit.name}</span>
      <button onClick={() => toggleHabit(habit.id)}>
        {habit.completed ? "Desmarcar" : "Completar"}
      </button>

      {habit.history.length > 0 && (
        <details>
          <summary>📅 Historial</summary>
          <ul>
            {habit.history.map((date, i) => (
              <li key={i}>{date}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}