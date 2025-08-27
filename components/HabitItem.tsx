"use client";

import { Habit } from "../lib/types";

interface HabitItemProps {
  habit: Habit;
  toggleHabit: (id: number) => void;
}

export default function HabitItem({ habit, toggleHabit }: HabitItemProps) {
  return (
    <div className={`habit-item ${habit.completed ? "completed" : "pending"}`}>
      {/* Nombre del hábito */}
      <span>{habit.name}</span>

      {/* Botón para marcar/desmarcar */}
      <button onClick={() => toggleHabit(habit.id)}>
        {habit.completed ? "Desmarcar" : "Completar"}
      </button>

      {/* Historial de fechas completadas */}
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
