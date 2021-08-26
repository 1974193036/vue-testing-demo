import { shallowMount } from '@vue/test-utils'
import TodoApp from '@/components/TodoApp/index.vue'
import TodoItem from '@/components/TodoApp/TodoItem.vue'
import Vue from 'vue'

describe('TodoApp.vue', () => {
  // 声明wrapper类型，写代码时候wrapper下的属性有智能提示
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  // 每个测试用例执行之前，会执行这个钩子
  beforeEach(async () => {
    const $route = {
      path: '/'
    }
    wrapper = shallowMount(TodoApp, {
      mocks: {
        $route
      }
    })
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]

    // 给组件内的todos变量赋值并且等待更新视图
    await wrapper.setData({
      todos
    })
  })

  // 测试新增后todos的数据发生变更的逻辑
  test('New Todo', async () => {
    const text = 'hello'
    wrapper.vm.handleNewTodo(text) // 通过 .vm 获取到vue中的实例
    const todo = wrapper.vm.todos.find(v => v.text === text)
    expect(todo).toBeTruthy()
    expect(todo.text).toBe(text)
  })

  // 测试TodoItem组件的数量
  test('Todo List', async () => {
    expect(wrapper.findAllComponents(TodoItem).length).toBe(wrapper.vm.todos.length) // 查找组件内的TodoItem的数量
  })

  // 测试删除操作
  test('Delete Todo', async () => {
    await wrapper.vm.handleDelteTodo(1)
    expect(wrapper.vm.todos.length).toBe(2)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2)
  })

  // 反向测试删除操作，当id不存在
  test('Delete Todo', async () => {
    await wrapper.vm.handleDelteTodo(123)
    expect(wrapper.vm.todos.length).toBe(3)
    expect(wrapper.findAllComponents(TodoItem).length).toBe(3)
  })

  // 测试编辑
  test('Edit Todo', async () => {
    const todo = { id: 2, text: 'abc' }
    wrapper.vm.handleEditTodo(todo)
    expect(wrapper.vm.todos[1].text).toBe(todo.text)

    todo.text = ''
    wrapper.vm.handleEditTodo(todo)
    expect(wrapper.vm.todos.find(v => v.id === todo.id)).toBeFalsy()
  })

  // 测试全选，全不选
  test('Toggle All', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')
    await toggleAll.setChecked(true)
    // 断言所有的子任务都被选中了
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeTruthy()
    })

    // 取消完成状态
    await toggleAll.setChecked(false)
    wrapper.vm.todos.forEach(todo => {
      expect(todo.done).toBeFalsy()
    })
  })

  // 测试全选，全不选
  test('Toggle All State', async () => {
    const toggleAll = wrapper.find('input[data-testid="toggle-all"]')
    // 让所有任务都变成完成状态
    wrapper.vm.todos.forEach(todo => {
      todo.done = true
    })
    await Vue.nextTick()
    // 断言 toggleAll 也选中了
    expect(toggleAll.element.checked).toBeTruthy()

    // 取消某个任务未完成，断言 toggleAll 未完成
    wrapper.vm.todos[0].done = false
    await Vue.nextTick()
    expect(toggleAll.element.checked).toBeFalsy()
  })
})
