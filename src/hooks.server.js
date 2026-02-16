import { DIRECTUS_URL } from '$lib/server/directus.js';

export async function handle({ event, resolve }) {
  const access_token = event.cookies.get('access_token');
  const refresh_token = event.cookies.get('refresh_token');

  if (access_token) {
    // Validate token by fetching current user
    const res = await fetch(`${DIRECTUS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    if (res.ok) {
      event.locals.user = await res.json();
    }
  }

  // If access_token expired but refresh_token exists → refresh
  if (!event.locals.user && refresh_token) {
    const res = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token, mode: 'json' })
    });
    if (res.ok) {
      const { data } = await res.json();
      event.cookies.set('access_token', data.access_token, {
        path: '/', httpOnly: true, secure: true, sameSite: 'lax',
        maxAge: 60 * 15 // 15 minutes
      });
      event.cookies.set('refresh_token', data.refresh_token, {
        path: '/', httpOnly: true, secure: true, sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      // Fetch user with new token
      const userRes = await fetch(`${DIRECTUS_URL}/users/me`, {
        headers: { Authorization: `Bearer ${data.access_token}` }
      });
      if (userRes.ok) event.locals.user = await userRes.json();
    }
  }

  return resolve(event);
}