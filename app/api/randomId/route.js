// app/api/random-id/route.js


  // app/api/random-id/route.js

export async function GET(request) {
    const randomId = Math.random().toString(36).substr(2, 9);
  
    return new Response(JSON.stringify({ randomId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  