import { writable } from 'svelte/store'

/**
 * Global loading store.
 * Set to `true` to show the loading overlay, `false` to hide it.
 */
export const loading = writable(false)
