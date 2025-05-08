
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import TodoForm from '../TodoForm.vue'
import { useTodoStore } from '../../store/todoStore'


vi.mock('vue3-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}))

describe('TodoForm.vue', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTodoStore()
    vi.spyOn(store, 'addTodo')
  })

  it('shows error if input is empty', async () => {
    const wrapper = mount(TodoForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Todo cannot be empty')
  })

  it('adds a todo and resets input field', async () => {
    const wrapper = mount(TodoForm)

    await wrapper.find('input').setValue('Test Task')
    await wrapper.find('select').setValue('high')
    await wrapper.find('form').trigger('submit.prevent')

    expect(store.addTodo).toHaveBeenCalledWith('Test Task', 'high')
    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.find('select').element.value).toBe('medium')
  })
})
