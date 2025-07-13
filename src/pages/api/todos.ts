import type { APIRoute } from 'astro';
import { addTodo, getTodos } from '../../lib/todoStore';

// Enable server-side rendering for this API route
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const todo = formData.get('todo') as string;
    
    if (todo && todo.trim()) {
      const todoId = addTodo(todo.trim());
      
      // Return HTML fragment for HTMX
      return new Response(
        `<li class="flex justify-between items-center p-2 bg-white rounded border">
          <span>${todo.trim()}</span>
          <button 
            hx-delete="/api/todos/${todoId}" 
            hx-target="closest li" 
            hx-swap="outerHTML"
            class="text-red-500 hover:text-red-700"
          >×</button>
        </li>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }
    
    return new Response('Invalid todo', { status: 400 });
  } catch (error) {
    return new Response('Server error', { status: 500 });
  }
};

export const GET: APIRoute = async () => {
  // Return all todos as HTML fragments
  const todos = getTodos();
  const todoHTML = todos.map((todo, index) => 
    `<li class="flex justify-between items-center p-2 bg-white rounded border">
      <span>${todo}</span>
      <button 
        hx-delete="/api/todos/${index}" 
        hx-target="closest li" 
        hx-swap="outerHTML"
        class="text-red-500 hover:text-red-700"
      >×</button>
    </li>`
  ).join('');
  
  return new Response(todoHTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};