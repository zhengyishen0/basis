import type { APIRoute } from 'astro';
import { removeTodo } from '../../../lib/todoStore';

// Enable server-side rendering for this API route
export const prerender = false;

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id as string;
    
    if (!id) {
      return new Response('Invalid ID', { status: 400 });
    }
    
    const success = removeTodo(id);
    
    if (!success) {
      return new Response('Todo not found', { status: 404 });
    }
    
    // Return empty response (HTMX will remove the element from DOM)
    return new Response('', { status: 200 });
  } catch (error) {
    return new Response('Server error', { status: 500 });
  }
};