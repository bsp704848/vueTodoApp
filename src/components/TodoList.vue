<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../store/todoStore';
import '../components/TodoList.css'
import EditModal from './EditModal.vue'
import DeleteModal from './DeleteModal.vue'

const store = useTodoStore();
const filter = ref('all')
const priorityFilter = ref('all')
const editingTodo = ref(null);
const deleteId = ref(null)

const filteredTodos = computed(() => {
  let todos = store.todos


  if (filter.value === 'completed') {
    todos = todos.filter(todo => todo.completed)
  } else if (filter.value === 'pending') {
    todos = todos.filter(todo => !todo.completed)
  }


  if (priorityFilter.value !== 'all') {
    todos = todos.filter(todo => todo.priority === priorityFilter.value)
  }

  return todos
})

function toggleComplete(id) {
  store.toggleCompleted(id)
}
</script>

<template>
  <div>
    <div class="filter-controls">
      <select v-model="filter">
        <option value="all">Status</option>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <select v-model="priorityFilter">
        <option value="all">Priority</option>
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <div>
        <button class="remove-btn" @click="store.removeAll">Remove All</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Task</th>
          <th>Priority</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in filteredTodos" :key="todo.id">
          <td>{{ index + 1 }}</td>
          <td>{{ todo.text }}</td>
          <td>{{ todo.priority }}</td>
          <td>
            <input type="checkbox" :checked="todo.completed" @change="toggleComplete(todo.id)" />
          </td>
          <td>
            <button class="edit-btn" @click="editingTodo = todo">
              <font-awesome-icon icon="edit" />
            </button>
            <button class="delete-btn" @click="deleteId = todo.id">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <EditModal v-if="editingTodo" :todo="editingTodo" :onClose="() => editingTodo = null" />
    <DeleteModal v-if="deleteId" :onConfirm="() => { store.deleteTodo(deleteId); deleteId = null; }"
      :onCancel="() => deleteId = null" />
  </div>
</template>
