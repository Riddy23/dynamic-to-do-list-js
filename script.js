// Run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load saved tasks when the page loads
  loadTasks();

  // Add task on button click
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  // Add task on Enter key press
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  /**
   * Load tasks from Local Storage and display them
   */
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
      addTask(taskText, false); // Don't save again to avoid duplication
    });
  }

  /**
   * Add a task to the list and optionally save it
   */
  function addTask(taskText, save = true) {
    if (!taskText) {
      alert('Please enter a task');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn'; // ✅ still no classList.add

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';

    if (save) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  /**
   * Remove a task from Local Storage
   */
  function removeTaskFromStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
});
