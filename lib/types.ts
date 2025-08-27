// lib/types.ts
export interface Habit {
  id: number;
  name: string;
  completed: boolean;
  history: string[]; // << nuevo campo para registrar fechas
}
