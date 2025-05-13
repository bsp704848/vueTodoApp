<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../store/todoStore';
import EditModal from './EditModal.vue'
import DeleteModal from './DeleteModal.vue'
import RemoveAllModal from './RemoveAllModal.vue'

const store = useTodoStore();
const filter = ref('all')
const priorityFilter = ref('all')
const editingTodo = ref(null);
const deleteId = ref(null)
const showRemoveAllModal = ref(false)

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
        <button class="remove-btn" @click="showRemoveAllModal = true">Remove All</button>
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
    <RemoveAllModal v-if="showRemoveAllModal" :onConfirm="() => { store.removeAll(); showRemoveAllModal = false; }"
      :onCancel="() => showRemoveAllModal = false" />

  </div>
</template> 

<style scoped>
table {
  width: 100%;
 border-collapse: collapse;
  margin-top: 20px;
}

 th, td {
  padding: 12px;
  border: 1px solid #000000;
  text-align: center;
}

th {
  background-color: #f0f0f0;
}

.edit-btn {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(0, 255, 21);
  color: #0a0a0a;
}
.delete-btn {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: rgb(255, 81, 0);
  color: #f0f0f0;
  transition: transform 0.2s ease, background-color 0.3s ease;
} 
.remove-btn{
  padding: 8px ;
  cursor: pointer;
  background-color: rgb(255, 81, 0);
  color: #f0f0f0;
  font-weight: bold;
  width: 150px;
  
}

.remove-btn:hover{
  background-color: rgb(180, 22, 22);
  color:  #fffefe;
  transition: transform 0.2s ease, background-color 0.3s ease;
  transform: scale(0.9);
}
.filter-controls {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  gap: 4rem;
  align-items: center;
} 

@media (max-width: 768px) {
  .filter-controls {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .remove-btn {
    width: 100%;
    font-size: 15px;
  }

  table,
  th,
  td {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .edit-btn,
  .delete-btn {
    padding: 4px 8px;
    font-size: 13px;
  }

  th, td {
    padding: 8px;
  }
}

</style>
