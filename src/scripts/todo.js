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

/** Remove the task with the given id. */
export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

/** Flip the completed flag for the task with the given id. */
export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

/** Replace the text of a task (ignored when the new text is empty). */
export function editTask(tasks, id, text) {
  const trimmed = String(text ?? '').trim();
  if (trimmed.length === 0) return tasks;
  return tasks.map((task) =>
    task.id === id ? { ...task, text: trimmed.slice(0, 200) } : task
  );
}

/** Remove every completed task. */
export function clearCompleted(tasks) {
  return tasks.filter((task) => !task.completed);
}

/** Return the subset of tasks matching the active filter. */
export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    case 'all':
    default:
      return [...tasks];
  }
}

/** Count of tasks still to do. */
export function activeCount(tasks) {
  return tasks.reduce((count, task) => (task.completed ? count : count + 1), 0);
}
