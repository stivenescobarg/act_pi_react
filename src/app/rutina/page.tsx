"use client";

import { useState } from "react";

interface Rutina {
  titulo: string;
  descripcion: string;
  duracion: string;
  intensidad: string;
  link: string;
}

export default function RutinaPage() {
  const [peso, setPeso] = useState<number | "">("");
  const [rutina, setRutina] = useState<Rutina | null>(null);

  const calcularRutina = () => {
    if (peso === "" || peso <= 0) {
      setRutina({
        titulo: "⚠️ Error",
        descripcion: "Por favor ingresa un peso válido.",
        duracion: "-",
        intensidad: "-",
        link: "",
      });
      return;
    }

    if (peso < 60) {
      setRutina({
        titulo: "Rutina ligera 🧘",
        descripcion: "20 min cardio suave + 15 min yoga para flexibilidad.",
        duracion: "35 min",
        intensidad: "Baja",
        link: "https://www.youtube.com/watch?v=--jhKVdZOJM", // yoga beginner
      });
    } else if (peso >= 60 && peso <= 80) {
      setRutina({
        titulo: "Rutina moderada 💪",
        descripcion: "30 min cardio + 20 min entrenamiento con pesas.",
        duracion: "50 min",
        intensidad: "Media",
        link: "https://www.youtube.com/watch?v=ml6cT4AZdqI", // full body workout
      });
    } else {
      setRutina({
        titulo: "Rutina intensa 🔥",
        descripcion: "40 min pesas + 20 min HIIT para quemar grasa.",
        duracion: "60 min",
        intensidad: "Alta",
        link: "https://www.youtube.com/watch?v=ml6cT4AZdqI", // HIIT intense
      });
    }
  };

  return (
    <div className="app-container">
      <h1>⚡ Rutina Recomendada</h1>
      <p>Ingresa tu peso y recibe una rutina adaptada con un video de ejemplo:</p>

      <div className="form-rutina">
        <input
          type="number"
          placeholder="Tu peso en kg"
          value={peso}
          onChange={(e) => setPeso(Number(e.target.value))}
        />
        <button onClick={calcularRutina}>Calcular</button>
      </div>

      {rutina && (
        <div className="resultado">
          <h2>{rutina.titulo}</h2>
          <p>{rutina.descripcion}</p>
          <p><b>Duración:</b> {rutina.duracion}</p>
          <p><b>Intensidad:</b> {rutina.intensidad}</p>

          {rutina.link && (
            <a href={rutina.link} target="_blank" rel="noopener noreferrer">
              🎥 Ver rutina en YouTube
            </a>
          )}
        </div>
      )}
    </div>
  );
}