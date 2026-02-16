import { redirect } from '@sveltejs/kit';
import { DIRECTUS_URL } from '$lib/server/directus.js';

export async function load({ cookies }) {
  const refresh_token = cookies.get('refresh_token');

  // Tell Directus to invalidate the refresh token
  if (refresh_token) {
    await fetch(`${DIRECTUS_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token })
    }).catch((error) => {
      console.error('Failed to log out from Directus:', error);
    });
  }

  cookies.delete('access_token', { path: '/' });
  cookies.delete('refresh_token', { path: '/' });

  throw redirect(303, '/admin/login');
}
