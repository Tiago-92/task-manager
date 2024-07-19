import { tasks } from './tasks.js'

const taskContainer = document.getElementById('task-container');
const taskTemplate = document.getElementById('task-template');

const statusContainer = document.getElementById('status-container');
const statusTemplate = document.getElementById('status-template');

function countTasksByStatus(tasks) {
  return tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
}

const taskCounts = countTasksByStatus(tasks);

const statusList = ['Em execução', 'Pendente', 'Concluído'];

statusList.forEach(status => {
  const statusElement = statusTemplate.content.cloneNode(true);
  statusElement.querySelector('.status-text').textContent = status;
  statusElement.querySelector('.status-length').textContent = taskCounts[status] || 0;
  
  statusContainer.appendChild(statusElement);
});

tasks.forEach(task => {
  const taskElement = taskTemplate.content.cloneNode(true);
  taskElement.querySelector('.task-title').textContent = task.title;
  
  const daysAgo = Math.floor((new Date() - new Date(task.createdAt)) / (1000 * 60 * 60 * 24));
  taskElement.querySelector('.task-date').textContent = `a ${daysAgo} dias`;
  
  taskElement.querySelector('.task-description').textContent = task.description;

  taskContainer.appendChild(taskElement);
});

tasks.forEach(status => {
  const statusElement = statusTemplate.content.cloneNode(true);
  statusElement.querySelector('.status').textContent = status.status
  statusElement.querySelector('.status-lenght').textContent = status.status.length

  statusContainer.appendChild(statusElement);
})


