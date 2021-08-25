import { shallowMount } from '@vue/test-utils'
import TodoApp from '@/components/TodoApp/index.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'

describe('TodoApp.vue', () => {
  // 测试新增后todos的数据发生变更的逻辑
  test('New Todo', async () => {
    const $route = {
      path: '/'
    }
    const wrapper = shallowMount(TodoApp, { // 挂载组件
      mocks: {
        $route
      }
    })
    const text = 'hello'
    wrapper.vm.handleNewTodo(text) // 通过 .vm 获取到vue中的实例
    const todo = wrapper.vm.todos.find(v => v.text === text)
    expect(todo).toBeTruthy()
    expect(todo.text).toBe(text)
  })

  // 测试TodoItem组件的数量
  test('Todo List', async () => {
    const $route = {
      path: '/'
    }
    const wrapper = shallowMount(TodoApp, { // 挂载组件
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
    await wrapper.setData({ // 给组件内的todos变量赋值并且等待更新视图
      todos
    })
    expect(wrapper.findAllComponents(TodoItem).length).toBe(todos.length) // 查找组件内的TodoItem的数量
  })
})
