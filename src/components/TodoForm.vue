<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../store/todoStore';
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

<style scoped>

form {
  max-width: 600px;
  width: 400px;
  margin: 0 0 40px 0 ;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px 30px;
  border-radius: 10px;
  background-color: rgb(248, 248, 248);
}

.input-group {
  display: flex;
  gap: 20px;
  flex-direction: column;
}

input,
select {
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
}

input:focus, select:focus {
  border-color: #3b82f6;
  outline: none;
}
input:hover{
  cursor: pointer;
  background-color: aliceblue;
}


.add-btn {
  background-color: #28c76f;
  color: white;
  font-size: 16px;
  font-weight:600;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
  width:150px;
  align-self: center;
}

.add-btn:hover {
  background-color: #12e474;
   transform: scale(0.9);
}

p {
  margin: 0;
  font-size: 14px;
  color: red;
  text-align: center;
}


@media (max-width: 600px) {
  form {
    width: 90%;
    padding: 20px;
  }

  .input-group {
    gap: 10px;
  }


  .add-btn {
    width: 100%;
    font-size: 15px;
  }
}


</style>

