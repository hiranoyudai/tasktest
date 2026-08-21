const STORAGE_KEY = 'simple-task-manager.tasks';
const FILTERS = { all: 'all', active: 'active', done: 'done' };

const taskForm = document.querySelector('#task-form');
const taskTitle = document.querySelector('#task-title');
const taskList = document.querySelector('#task-list');
const emptyState = document.querySelector('#empty-state');
const clearCompletedButton = document.querySelector('#clear-completed');
const filterButtons = document.querySelectorAll('[data-filter]');
const remainingCount = document.querySelector('#remaining-count');
const completedCount = document.querySelector('#completed-count');
const totalCount = document.querySelector('#total-count');

let tasks = loadTasks();
let currentFilter = FILTERS.all;

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.warn('保存済みタスクの読み込みに失敗しました。', error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

function getVisibleTasks() {
  if (currentFilter === FILTERS.active) return tasks.filter((task) => !task.done);
  if (currentFilter === FILTERS.done) return tasks.filter((task) => task.done);
  return tasks;
}

function render() {
  const visibleTasks = getVisibleTasks();
  const remainingTasks = tasks.filter((task) => !task.done).length;
  const completedTasks = tasks.length - remainingTasks;

  taskList.innerHTML = '';
  visibleTasks.forEach((task) => taskList.append(createTaskElement(task)));

  emptyState.hidden = visibleTasks.length > 0;
  clearCompletedButton.hidden = completedTasks === 0;
  remainingCount.textContent = `未完了: ${remainingTasks}`;
  completedCount.textContent = `完了: ${completedTasks}`;
  totalCount.textContent = `合計: ${tasks.length}`;

  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === currentFilter);
  });
}

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = task.done ? 'task done' : 'task';

  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const title = document.createElement('span');
  title.textContent = task.title;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = '削除';
  deleteButton.setAttribute('aria-label', `${task.title}を削除`);
  deleteButton.addEventListener('click', () => deleteTask(task.id));

  label.append(checkbox, title);
  item.append(label, deleteButton);
  return item;
}

function addTask(event) {
  event.preventDefault();
  const title = taskTitle.value.trim();
  if (!title) return;

  tasks = [createTask(title), ...tasks];
  taskTitle.value = '';
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.done);
  saveTasks();
  render();
}

taskForm.addEventListener('submit', addTask);
clearCompletedButton.addEventListener('click', clearCompleted);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    render();
  });
});

render();
