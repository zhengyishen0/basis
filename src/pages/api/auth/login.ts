import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wiqivthmlgjwtlrnynsq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpcWl2dGhtbGdqd3Rscm55bnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NTY1MDgsImV4cCI6MjA2ODEzMjUwOH0.1Nh6nIbXolEkrpSFYzF-l3LqYmkQw0d4xzdi1xoez9M';

export const POST: APIRoute = async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  try {
    const { data, error } = await supabase.auth.signInAnonymously();
    
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      access_token: data.session?.access_token,
      user_id: data.user?.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};