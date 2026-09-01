/**
 * DOM wiring for TaskFlow. All list transformations are delegated to the
 * pure helpers in ./todo.js; this file only reads the DOM, calls those
 * helpers, persists the result, and re-renders.
 */
import {
  addTask,
  deleteTask,
  toggleTask,
  clearCompleted,
  filterTasks,
  activeCount,
  FILTERS,
} from './todo.js';
import { loadTasks, saveTasks } from './storage.js';

const els = {
  form: document.querySelector('#task-form'),
  input: document.querySelector('#task-input'),
  list: document.querySelector('#task-list'),
  count: document.querySelector('#task-count'),
  filters: document.querySelector('#filters'),
  clear: document.querySelector('#clear-completed'),
  empty: document.querySelector('#empty-state'),
};

let tasks = loadTasks();
let currentFilter = 'all';

function persist() {
  saveTasks(tasks);
}

function render() {
  const visible = filterTasks(tasks, currentFilter);
  els.list.innerHTML = '';

  for (const task of visible) {
    const item = document.createElement('li');
    item.className = `task${task.completed ? ' task--done' : ''}`;
    item.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task__check';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark "${task.text}" complete`);

    const label = document.createElement('span');
    label.className = 'task__text';
    label.textContent = task.text;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'task__delete';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Delete "${task.text}"`);

    item.append(checkbox, label, remove);
    els.list.append(item);
  }

  const remaining = activeCount(tasks);
  els.count.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
  els.empty.hidden = visible.length > 0;

  els.filters.querySelectorAll('button').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.filter === currentFilter);
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === currentFilter));
  });
}

els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const next = addTask(tasks, els.input.value);
  if (next === tasks) return; // empty / invalid input
  tasks = next;
  els.input.value = '';
  els.input.focus();
  persist();
  render();
});

els.list.addEventListener('click', (event) => {
  const item = event.target.closest('.task');
  if (!item) return;
  const { id } = item.dataset;

  if (event.target.matches('.task__check')) {
    tasks = toggleTask(tasks, id);
  } else if (event.target.matches('.task__delete')) {
    tasks = deleteTask(tasks, id);
  } else {
    return;
  }
  persist();
  render();
});

els.filters.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-filter]');
  if (!btn || !FILTERS.includes(btn.dataset.filter)) return;
  currentFilter = btn.dataset.filter;
  render();
});

els.clear.addEventListener('click', () => {
  tasks = clearCompleted(tasks);
  persist();
  render();
});

render();
els.input.focus();
