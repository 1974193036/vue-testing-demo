import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoApp/TodoItem.vue'

describe('TodoItem.vue', () => {
  test('show', () => {
    const todo = {
      id: 1,
      text: 'hello world',
      done: true
    }
    const wrapper = shallowMount(TodoItem, { // 挂载组件
      propsData: {
        todo
      }
    })
    console.log(wrapper.find('label[data-testid="todo-text"]').text())
  })
  // test('New Todo', async () => {
  //   const $route = {
  //     path: '/'
  //   }
  //   const wrapper = shallowMount(TodoApp, { // 挂载组件
  //     mocks: {
  //       $route
  //     }
  //   })
  //   const text = 'hello'
  //   wrapper.vm.handleNewTodo(text) // 通过 .vm 获取到vue中的实例
  //   const todo = wrapper.vm.todos.find(v => v.text === text)
  //   expect(todo).toBeTruthy()
  //   expect(todo.text).toBe(text)
  // })

  // test('Todo List', async () => {
  //   const $route = {
  //     path: '/'
  //   }
  //   const wrapper = shallowMount(TodoApp, { // 挂载组件
  //     mocks: {
  //       $route
  //     }
  //   })
  //   const todos = [
  //     { id: 1, text: 'eat', done: false },
  //     { id: 2, text: 'play', done: true },
  //     { id: 3, text: 'sleep', done: false }
  //   ]
  //   await wrapper.setData({ // 给组件内的todos变量赋值并且等待更新视图
  //     todos
  //   })
  //   expect(wrapper.findAllComponents(TodoItem).length).toBe(todos.length) // 查找组件内的TodoItem的数量
  // })
})
