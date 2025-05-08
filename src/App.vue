<script setup>

import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

</script>

<template>
  <div class="todo-wrapper">
    <h1>To do App</h1>
   <TodoForm/>
   <TodoList/>
  </div>
 
</template>

<style scoped>
h1 {
  font-family:fantasy;
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #4db6d3, #ff00ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; 
  text-align: center;
  margin-bottom: 20px;
}


</style>
