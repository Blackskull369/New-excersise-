const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')
const emptyState = document.getElementById('emptyState')
const totalCount = document.getElementById('totalCount')
const doneCount = document.getElementById('doneCount')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Update the stats bar
function updateStats() {
  const total = tasks.length
  const done = tasks.filter(t => t.done).length
  totalCount.textContent = total === 1 ? '1 task' : `${total} tasks`
  doneCount.textContent = `${done} done`

  // Show or hide empty state
  if (total === 0) {
    emptyState.classList.add('visible')
  } else {
    emptyState.classList.remove('visible')
  }
}

// Render all tasks to the DOM
function renderTasks() {
  taskList.innerHTML = ''

  tasks.forEach((task, index) => {
    const li = document.createElement('li')
    li.classList.add('task-item')
    if (task.done) li.classList.add('done')

    // Checkbox
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.done
    checkbox.addEventListener('change', () => toggleTask(index))

    // Task text
    const span = document.createElement('span')
    span.classList.add('task-text')
    span.textContent = task.text

    // Delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = '✕'
    deleteBtn.title = 'Delete task'
    deleteBtn.addEventListener('click', () => deleteTask(index))

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(deleteBtn)
    taskList.appendChild(li)
  })

  updateStats()
}

// Add a new task
function addTask() {
  const text = taskInput.value.trim()
  if (!text) return

  tasks.unshift({ text, done: false }) // add to top
  saveTasks()
  renderTasks()

  taskInput.value = ''
  taskInput.focus()
}

// Toggle done/undone
function toggleTask(index) {
  tasks[index].done = !tasks[index].done
  saveTasks()
  renderTasks()
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1)
  saveTasks()
  renderTasks()
}

// Add task on button click
addBtn.addEventListener('click', addTask)

// Add task on Enter key
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask()
})

// First render on page load
renderTasks()
