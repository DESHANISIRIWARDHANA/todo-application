/**
 * Thin wrapper around localStorage so the rest of the app never touches
 * the Web Storage API directly. Every access is guarded: a private window,
 * disabled site data, or corrupt JSON all fall back to an empty list
 * instead of throwing.
 */

const STORAGE_KEY = 'taskflow.tasks.v1';

export function loadTasks() {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* storage unavailable — the in-memory list still works for this session */
  }
}
