<script setup>
import { ref, watch } from 'vue'
import { useTodoStore } from '../store/todoStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps(['todo', 'onClose'])
const store = useTodoStore()
const updateText = ref(props.todo.text)
const updatePriority = ref(props.todo.priority)

function saveChanges() {
    store.updateTodo(props.todo.id, updateText.value, updatePriority.value)
     toast.success("Task updated successfully!")
    props.onClose()
}
</script>

<template>
    <teleport to="body">
        <div class="modal">
            <div class="modal-content">
                <h3>Edit Todo</h3>
                <input v-model="updateText" />
                <select v-model="updatePriority">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <div class="button-group">
                    <button class="save-btn" @click="saveChanges">Save</button>
                    <button class="cancel-btn" @click="props.onClose">Cancel</button>
                </div>

            </div>
        </div>
    </teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-content {
    background-color: #fff;
    padding: 25px 30px;
    width: 320px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h3 {
    margin: 0;
    font-size: 20px;
    text-align: center;
    color: #333;
}

input,
select {
    padding: 10px 14px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: 0.3s border-color, 0.3s box-shadow;
}

input:focus,
select:focus {
    border-color: #409eff;
    box-shadow: 0 0 6px rgba(64, 158, 255, 0.2);
}

select {
    background-color: #f9f9f9;
}


button {
    padding: 10px 18px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.save-btn {
    background-color: #28c76f;
    color: white;
}

.save-btn:hover {
    background-color: #20a95d;
}

.cancel-btn {
    background-color: #f44336;
    color: white;
    margin-left: 10px;
}

.cancel-btn:hover {
    background-color: #d32f2f;
}


.button-group {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>