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
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          toggleHabit={toggleHabit}
        />
      ))}
    </div>
  );
}