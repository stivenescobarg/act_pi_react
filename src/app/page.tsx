"use client";

import { useState, useEffect } from "react";
import HabitList from "../../components/HabitList";
import { Habit } from "../../lib/types";
import Link from "next/link";
import UserProfile from "../../components/UserProfile";
import ProgressChart from "../../components/ProgressChart";

export default function Page() {
  const [habitTime, setHabitTime] = useState<"morning" | "night">("morning"); // "morning" o "night", por defecto "morning", literal type
  const [userName, setUserName] = useState<string>("Invitado"); // nombre del usuario, por defecto "Invitado"
  const [userAvatar, setUserAvatar] = useState<string>(""); // URL del avatar, por defecto vacío

  // Maneja la actualización del perfil del usuario
  // Recibe el nombre y avatar desde UserProfile y actualiza el estado


  const handleUserUpdate = (name: string, avatar: string) => {
    setUserName(name || "Invitado");
    setUserAvatar(avatar || "");
  };

// Estados para hábitos de la mañana y noche
// Cada hábito tiene id, nombre, estado de completado y un historial de fechas
// Inicialmente, todos los hábitos están incompletos y sin historial
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
   // Estado para el nuevo hábito a agregar
  const [newHabit, setNewHabit] = useState("");

    // Cambia el fondo según el momento del día y carga perfil guardado
    // Se ejecuta al montar el componente y cuando habitTime cambia
    // Actualiza la clase del body para cambiar el tema (claro/oscuro)
    // Recupera nombre y avatar del localStorage si existen
  useEffect(() => {
    document.body.className = habitTime === "morning" ? "morning" : "night";
    const savedName = localStorage.getItem("userName");
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedName) setUserName(savedName);
    if (savedAvatar) setUserAvatar(savedAvatar);
  }, [habitTime]);

  // Alterna el estado de completado de un hábito y actualiza su historial
  // Recibe el id del hábito a modificar
  // Busca el hábito en la lista correspondiente (mañana o noche)

  const toggleHabit = (id: number) => { //habito id
    // Obtiene la fecha actual en formato local
    const date = new Date().toLocaleDateString();
    if (habitTime === "morning") {
      setMorningHabits(habits => // actualiza la lista de hábitos de la mañana
        habits.map(h =>
          h.id === id // encuentra el hábito con el id dado
            ? { ...h, completed: !h.completed, history: !h. completed ? [...h.history, date] : h.history } // si es el correcto, invierte completed y añade la fecha si se completa
            : h //| si no es el correcto, lo deja igual
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

  // Agrega un nuevo hábito a la lista correspondiente
  // Usa el estado newHabit para el nombre y habitTime para decidir la lista
  // Crea un nuevo objeto hábito con id único, nombre, incompleto y sin historial
  // Limpia el campo de entrada después de agregar

  const addHabit = () => {
    if (!newHabit.trim()) return;
    const habit: Habit = {
      id: Date.now(),
      name: newHabit,
      completed: false,
      history: [],
    };
    // Añade el nuevo hábito a la lista correcta según el momento del día
    if (habitTime === "morning") {
      setMorningHabits([...morningHabits, habit]);
    } else {
      setNightHabits([...nightHabits, habit]);
    }
    setNewHabit("");
  };

  // Determina qué lista de hábitos mostrar según el momento del día
  // Calcula el número de hábitos completados y el total para la gráfica
  //CurrentHabits: lista de hábitos a mostrar (mañana o noche)
  //completedCount: cuenta de hábitos completados en la lista actual
  //totalCount: total de hábitos en la lista actual

  const currentHabits = habitTime === "morning" ? morningHabits : nightHabits;
  const completedCount = currentHabits.filter(h => h.completed).length;  // Filter se usa para contar solo los hábitos completados
  const totalCount = currentHabits.length;

 // jsx principal
  return (
    <div className="dashboard-container">
      {/* Panel izquierdo: Perfil */}
      <aside className="dashboard-left"> {/* Contenedor del perfil */}
        <div className="user-header"> {/* Encabezado con avatar y nombre */}
          {userAvatar && <img src={userAvatar} alt="avatar" className="avatar" />}
          <h1>Hola, {userName}! 🌟</h1>
        </div>
        <UserProfile onUserUpdate={handleUserUpdate} /> {/* Componente para editar perfil */}
      </aside>

      {/* Panel derecho: Rutinas y gráfica */}
      <main className="dashboard-right">
        <div className="selector">
          <label htmlFor="habitTime">Selecciona momento:</label>
          <select // selector para elegir mañana o noche
            id="habitTime"
            value={habitTime}
            onChange={(e) => setHabitTime(e.target.value as "morning" | "night")} // type assertion para asegurar los valores válidos
          >
            <option value="morning">Mañana 🌅</option>
            <option value="night">Noche 🌙</option>
          </select>
        </div>
          {/* Añadir nuevo hábito */}
        <div className="add-habit">
          <input
            type="text"
            placeholder="Nuevo hábito..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={addHabit}>➕ Agregar</button>
        </div>
        {/* Gráfica de progreso */}
        <div className="progress-chart">
          <ProgressChart completed={completedCount} total={totalCount} />
        </div>
        {/* Lista de hábitos */}
        <div className="habit-list">
          <HabitList habits={currentHabits} toggleHabit={toggleHabit} />
        </div>
        {/* Botón para ver rutina recomendada */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/rutina">
            <button className="rutina-btn">⚡ Ver Rutina Recomendada</button>
          </Link>
        </div>
      </main>
    </div>
  );
}