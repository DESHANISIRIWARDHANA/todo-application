import { describe, it, expect } from 'vitest';
import {
  createTask,
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearCompleted,
  filterTasks,
  activeCount,
} from '../src/scripts/todo.js';

describe('createTask', () => {
  it('builds a task from valid text', () => {
    const task = createTask('  Buy milk  ');
    expect(task).toMatchObject({ text: 'Buy milk', completed: false });
    expect(typeof task.id).toBe('string');
  });

  it('rejects empty or whitespace-only text (input validation)', () => {
    expect(createTask('')).toBeNull();
    expect(createTask('   ')).toBeNull();
    expect(createTask(null)).toBeNull();
  });
});

describe('addTask', () => {
  it('appends a new task without mutating the original array', () => {
    const original = [];
    const next = addTask(original, 'Write tests');
    expect(next).toHaveLength(1);
    expect(original).toHaveLength(0);
  });

  it('ignores invalid input and returns the same array reference', () => {
    const tasks = [];
    expect(addTask(tasks, '   ')).toBe(tasks);
  });
});

describe('deleteTask', () => {
  it('removes only the matching task', () => {
    const a = addTask([], 'A');
    const both = addTask(a, 'B');
    const result = deleteTask(both, both[0].id);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('B');
  });
});

describe('toggleTask', () => {
  it('flips completed state for the matching task', () => {
    const tasks = addTask([], 'Task');
    const toggled = toggleTask(tasks, tasks[0].id);
    expect(toggled[0].completed).toBe(true);
    expect(toggleTask(toggled, tasks[0].id)[0].completed).toBe(false);
  });
});

describe('editTask', () => {
  it('updates the text of the matching task', () => {
    const tasks = addTask([], 'old');
    const edited = editTask(tasks, tasks[0].id, 'new');
    expect(edited[0].text).toBe('new');
  });

  it('ignores empty replacement text', () => {
    const tasks = addTask([], 'keep');
    expect(editTask(tasks, tasks[0].id, '  ')[0].text).toBe('keep');
  });
});

describe('filterTasks', () => {
  const build = () => {
    let tasks = addTask([], 'active one');
    tasks = addTask(tasks, 'done one');
    tasks = toggleTask(tasks, tasks[1].id);
    return tasks;
  };

  it('returns all tasks for the "all" filter', () => {
    expect(filterTasks(build(), 'all')).toHaveLength(2);
  });

  it('returns only incomplete tasks for "active"', () => {
    const result = filterTasks(build(), 'active');
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('active one');
  });

  it('returns only completed tasks for "completed"', () => {
    const result = filterTasks(build(), 'completed');
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('done one');
  });
});

describe('activeCount', () => {
  it('counts only incomplete tasks', () => {
    let tasks = addTask([], 'one');
    tasks = addTask(tasks, 'two');
    tasks = addTask(tasks, 'three');
    tasks = toggleTask(tasks, tasks[0].id);
    expect(activeCount(tasks)).toBe(2);
  });
});

describe('clearCompleted', () => {
  it('drops every completed task', () => {
    let tasks = addTask([], 'one');
    tasks = addTask(tasks, 'two');
    tasks = toggleTask(tasks, tasks[0].id);
    const result = clearCompleted(tasks);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('two');
  });
});
