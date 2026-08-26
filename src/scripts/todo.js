/**
 * Pure task-list logic for TaskFlow.
 *
 * Every function is side-effect free and returns a NEW array so the module
 * can be unit-tested without a DOM or browser storage.
 *
 * A task has the shape:
 *   { id: string, text: string, completed: boolean, createdAt: number }
 */

export const FILTERS = Object.freeze(['all', 'active', 'completed']);

/** Generate a reasonably unique id (works in browser and Node test runner). */
export function makeId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Create a task object from raw text.
 * Returns `null` when the text is empty / whitespace only (input validation).
 */
export function createTask(text) {
  const trimmed = String(text ?? '').trim();
  if (trimmed.length === 0) return null;
  return {
    id: makeId(),
    text: trimmed.slice(0, 200),
    completed: false,
    createdAt: Date.now(),
  };
}

/** Add a task built from `text`. Invalid text is ignored (array unchanged). */
export function addTask(tasks, text) {
  const task = createTask(text);
  if (!task) return tasks;
  return [...tasks, task];
}
