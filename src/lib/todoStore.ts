// Simple in-memory todo store (replace with database in production)
export let todos: string[] = [];

export function addTodo(todo: string): number {
  todos.push(todo);
  return todos.length - 1;
}

export function removeTodo(index: number): boolean {
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    return true;
  }
  return false;
}

export function getTodos(): string[] {
  return [...todos];
}