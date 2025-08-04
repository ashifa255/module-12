const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const alertPlaceholder = document.getElementById('alertPlaceholder');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Show Bootstrap alert
function showAlert(message, type = 'success') {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  alertPlaceholder.append(wrapper);

    // Auto remove alert after 3 seconds
  setTimeout(() => {
    // Bootstrap 5 uses 'fade' and 'show' classes for animation
    const alertNode = wrapper.querySelector('.alert');
    if (alertNode) {
      // Remove 'show' class to start fade out
      alertNode.classList.remove('show');

      // After transition ends, remove from DOM
      alertNode.addEventListener('transitionend', () => {
        wrapper.remove();
      });
    }
  }, 3000);
}


 // Render all tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span class="${task.completed ? 'text-decoration-line-through' : ''}">
      <span class="me-2">${index + 1}.</span> ${task.text}</span>
      <div>
        <button class="btn btn-outline-success me-2" onclick="toggleComplete(${index})">✔️</button>
        <button class="btn btn-outline-danger" onclick="deleteTask(${index})">🗑️</button>
      </div>`;
    taskList.appendChild(li);
  });
  taskCount.textContent = tasks.length;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === '') {
    showAlert('Task cannot be empty!', 'danger');
    return;
  }
  tasks.push({ text, completed: false });
  taskInput.value = '';
  renderTasks();
  showAlert('Task added successfully!');
});

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  showAlert('Task deleted successfully!', 'warning');
}

// Initial render
renderTasks();


