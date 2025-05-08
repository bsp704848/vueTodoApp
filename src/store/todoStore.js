import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref(JSON.parse(localStorage.getItem('todos')) || [])

    function addTodo(text, priority = 'medium') {
        const newTodo = {
            id: Date.now(),
            text,
            priority,
            completed: false
        }
        todos.value.push(newTodo)
    }

    function updateTodo(id, newText, newPriority) {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.text = newText;
            todo.priority = newPriority
        }

    }

    function toggleCompleted(id) {
        const todo = todos.value.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    function getFilteredTodos(filter) {
        if (filter === 'completed') {
            return todos.value.filter(todo => todo.completed);
        }
        else if (filter === 'pending') {
            return todos.value.filter(todo => !todo.completed);
        } else {
            return todos.value;
        }
    }

    function deleteTodo(id) {
        todos.value = todos.value.filter(todo => todo.id !== id)
    }

    function removeAll() {
        toast.success("Task deleted successfully!")
        todos.value = [];
    }

    watch(todos, (newTodos) => {
        localStorage.setItem('todos', JSON.stringify(newTodos))
    }, { deep: true })

    return {
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleCompleted,
        getFilteredTodos,
        removeAll,
    }


})