import { DIRECTUS_URL } from '$lib/server/directus.js';
import { redirect, fail } from '@sveltejs/kit';

export async function load({ locals }) {
  if (locals.user) throw redirect(303, '/admin');
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) return fail(401, { error: 'Invalid credentials' });

    const { data } = await res.json();
    cookies.set('access_token', data.access_token, {
      path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 15
    });
    cookies.set('refresh_token', data.refresh_token, {
      path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7
    });

    throw redirect(303, '/admin');
  }
};