"use client";
import { useState } from "react";
import HabitList from "../../components/HabitList";
import { Habit } from "../../lib/types";

export default function Page() {
  const [morningHabits, setMorningHabits] = useState<Habit[]>([
    { id: 1, name: "Beber agua", completed: false, history: [] },
    { id: 2, name: "Meditar 10 min", completed: false, history: [] },
  ]);
  const [nightHabits, setNightHabits] = useState<Habit[]>([
    { id: 3, name: "Leer 20 páginas", completed: false, history: [] },
    { id: 4, name: "Escribir en el diario", completed: false, history: [] },
  ]);

  const [newHabit, setNewHabit] = useState("");
  const [habitTime, setHabitTime] = useState<"morning" | "night">("morning");

  // ✅ Marcar completado y guardar fecha
  const toggleHabit = (id: number, isMorning: boolean) => {
    const timestamp = new Date().toLocaleString();

    const update = (habits: Habit[]) =>
      habits.map((h) =>
        h.id === id
          ? {
              ...h,
              completed: !h.completed,
              history: !h.completed ? [...h.history, timestamp] : h.history,
            }
          : h
      );

    if (isMorning) setMorningHabits(update(morningHabits));
    else setNightHabits(update(nightHabits));
  };

  // ✅ Agregar hábito nuevo
  const addHabit = () => {
    if (!newHabit.trim()) return;

    const newHabitObj: Habit = {
      id: Date.now(),
      name: newHabit,
      completed: false,
      history: [],
    };

    if (habitTime === "morning") {
      setMorningHabits([...morningHabits, newHabitObj]);
    } else {
      setNightHabits([...nightHabits, newHabitObj]);
    }

    setNewHabit(""); // limpiar input
  };

  return (
    <div className="app-container">
      <h1>🌅🌙 Mis Hábitos</h1>

      {/* Formulario para agregar hábitos */}
      <div className="add-habit">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Nuevo hábito..."
        />
        <select
          value={habitTime}
          onChange={(e) => setHabitTime(e.target.value as "morning" | "night")}
        >
          <option value="morning">Mañana 🌅</option>
          <option value="night">Noche 🌙</option>
        </select>
        <button onClick={addHabit}>➕ Agregar</button>
      </div>

      {/* Lista mañana */}
      <HabitList
        title="🌅 Mañana"
        habits={morningHabits}
        toggleHabit={(id) => toggleHabit(id, true)}
      />

      {/* Lista noche */}
      <HabitList
        title="🌙 Noche"
        habits={nightHabits}
        toggleHabit={(id) => toggleHabit(id, false)}
      />
    </div>
  );
}
