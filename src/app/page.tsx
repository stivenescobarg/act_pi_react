"use client";

import { useState, useEffect } from "react";
import HabitList from "../../components/HabitList";
import { Habit } from "../../lib/types";
import Link from "next/link";

export default function Page() {
  const [habitTime, setHabitTime] = useState<"morning" | "night">("morning");

  const [morningHabits, setMorningHabits] = useState<Habit[]>([
    { id: 1, name: "Beber agua", completed: false, history: [] },
    { id: 2, name: "Meditar 10 min", completed: false, history: [] },
    { id: 3, name: "Caminar 30 min", completed: false, history: [] },
  ]);

  const [nightHabits, setNightHabits] = useState<Habit[]>([
    { id: 4, name: "Leer 10 páginas", completed: false, history: [] },
    { id: 5, name: "Escribir diario", completed: false, history: [] },
    { id: 6, name: "Planear el día siguiente", completed: false, history: [] },
  ]);

  const [newHabit, setNewHabit] = useState("");

  // 👉 Cambiar la clase del body
  useEffect(() => {
    document.body.className = habitTime === "morning" ? "morning" : "night";
  }, [habitTime]);

  // Función para alternar hábitos completados
  const toggleHabit = (id: number) => {
    const date = new Date().toLocaleDateString();

    if (habitTime === "morning") {
      setMorningHabits(habits =>
        habits.map(h =>
          h.id === id
            ? { ...h, completed: !h.completed, history: !h.completed ? [...h.history, date] : h.history }
            : h
        )
      );
    } else {
      setNightHabits(habits =>
        habits.map(h =>
          h.id === id
            ? { ...h, completed: !h.completed, history: !h.completed ? [...h.history, date] : h.history }
            : h
        )
      );
    }
  };

  // ✅ Función para agregar un hábito nuevo
  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habit: Habit = {
      id: Date.now(),
      name: newHabit,
      completed: false,
      history: [],
    };

    if (habitTime === "morning") {
      setMorningHabits([...morningHabits, habit]);
    } else {
      setNightHabits([...nightHabits, habit]);
    }

    setNewHabit(""); // limpiar input
  };

  const currentHabits = habitTime === "morning" ? morningHabits : nightHabits;

  return (
    <div className="app-container">
      <h1>🌅 🌙 Mis Hábitos</h1>

      {/* Selector */}
      <div className="selector">
        <label htmlFor="habitTime">Selecciona momento:</label>
        <select
          id="habitTime"
          value={habitTime}
          onChange={(e) => setHabitTime(e.target.value as "morning" | "night")}
        >
          <option value="morning">Mañana 🌅</option>
          <option value="night">Noche 🌙</option>
        </select>
      </div>

      {/* Formulario para agregar hábitos */}
      <div className="add-habit">
        <input
          type="text"
          placeholder="Nuevo hábito..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>➕ Agregar</button>
      </div>

      {/* Lista de hábitos */}
      <HabitList habits={currentHabits} toggleHabit={toggleHabit} />
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/rutina">
          <button>⚡ Ver Rutina Recomendada</button>
        </Link>
      </div>
    </div>
     
  );
}
