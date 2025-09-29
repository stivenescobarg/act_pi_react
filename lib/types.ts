// lib/types.ts
export interface Habit {
  id: number;
  name: string;
  completed: boolean;
  history: string[]; // << nuevo campo para registrar fechas
}

// gracias a este archivo, podemos importar Habit en cualquier componente
// y TypeScript sabrá qué propiedades tiene un hábito.