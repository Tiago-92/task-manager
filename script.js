import { tasks } from './tasks.js';

const taskContainer = document.getElementById('task-container');
const taskTemplate = document.getElementById('task-template');

const statusContainer = document.getElementById('status-container');
const statusTemplate = document.getElementById('status-template');

// Função para contar tarefas por status
function countTasksByStatus(tasks) {
  return tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
}

// Contagem de tarefas
const taskCounts = countTasksByStatus(tasks);

// Lista de status para exibição
const statusList = ['Em execução', 'Pendente', 'Concluído'];

// Renderiza os status no status-container
statusList.forEach(status => {
  const statusElement = statusTemplate.content.cloneNode(true);
  statusElement.querySelector('.status-text').textContent = status;
  statusElement.querySelector('.status-length').textContent = taskCounts[status] || 0;
  
  statusContainer.appendChild(statusElement);
});

// Função para renderizar tarefas no task-container
function renderTasks(tasksToRender) {
  taskContainer.innerHTML = '';
  tasksToRender.forEach(task => {
    const taskElement = taskTemplate.content.cloneNode(true);
    taskElement.querySelector('.task-title').textContent = task.title;
    
    const daysAgo = Math.floor((new Date() - new Date(task.createdAt)) / (1000 * 60 * 60 * 24));
    taskElement.querySelector('.task-date').textContent = `a ${daysAgo} dias`;
    
    taskElement.querySelector('.task-description').textContent = task.description;

    taskContainer.appendChild(taskElement);
  });
}

// Renderiza todas as tarefas inicialmente
renderTasks(tasks);

// Filtro de tarefas com base no input
const inputElement = document.getElementById('task-filter');
inputElement.addEventListener('input', (e) => {
  const inputed = e.target.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(inputed) ||
    task.description.toLowerCase().includes(inputed)
  );
  renderTasks(filteredTasks.length > 0 || inputed ? filteredTasks : tasks);
});
