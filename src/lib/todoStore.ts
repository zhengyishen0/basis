// Simple in-memory todo store (replace with database in production)
interface Todo {
  id: string;
  text: string;
}

export let todos: Todo[] = [];
let nextId = 1;

export function addTodo(text: string): string {
  const id = String(nextId++);
  todos.push({ id, text });
  return id;
}

export function removeTodo(id: string): boolean {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return true;
  }
  return false;
}

export function getTodos(): Todo[] {
  return [...todos];
}