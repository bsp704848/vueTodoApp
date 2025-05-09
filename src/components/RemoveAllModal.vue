
<script setup>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps(['onConfirm', 'onCancel'])

function confirmRemoveAll() {
  props.onConfirm()
  toast.success("All tasks deleted successfully!")
}
</script>

<template>
  <teleport to="body">
    <div class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete <strong>all</strong> tasks?</p>
        <div class="button-group">
          <button class="yes-btn" @click="confirmRemoveAll">Yes <font-awesome-icon icon="thumbs-up" /></button>
          <button class="no-btn" @click="props.onCancel">No <font-awesome-icon icon="thumbs-down" /></button>
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
}
.modal-content {
  background: white;
  padding: 20px;
  width: 400px;
  text-align: center;
  border-radius: 8px;
}
.modal-content p {
  margin-bottom: 20px;
  font-size: 20px;
}
.yes-btn {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: red;
  color: white;
  font-weight: bold;
}
.yes-btn:hover {
  background-color: darkred;
}
.no-btn {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: green;
  color: white;
  font-weight: bold;
}
.no-btn:hover {
  background-color: darkgreen;
}
.button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
