<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store/todoStore';
import './TodoForm.css'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const store = useTodoStore()
const newTodo = ref('')
const error = ref('')
const priority = ref('medium')

function add() {
    if (!newTodo.value.trim()) {
        error.value = "Todo cannot be empty"
        return
    }

    store.addTodo(newTodo.value, priority.value)
    toast.success('Task added successfully!') 
    newTodo.value = ''
    error.value = ''
    priority.value = 'medium'

}

</script>

<template>
    <form @submit.prevent='add'>
          <div class="input-group">
        <input v-model="newTodo" placeholder="Enter todo" />
        <select v-model="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        </div>
        <p v-if="error" style="color:red">{{ error }}</p>
        <button class="add-btn">Add</button>
    </form>
</template>

