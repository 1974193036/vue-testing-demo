import { shallowMount } from '@vue/test-utils'
import TodoItem from '@/components/TodoApp/TodoItem.vue'

describe('TodoItem.vue', () => {
  // 声明wrapper类型，写代码时候wrapper下的属性有智能提示
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  // 每个测试用例执行之前，会执行这个钩子
  beforeEach(() => {
    const todo = {
      id: 1,
      text: 'hello world',
      done: true
    }
    wrapper = shallowMount(TodoItem, { // 挂载组件
      propsData: {
        todo
      }
    })
  })

  // 测试TodoItem组件渲染后的内容
  test('text', () => {
    expect(wrapper.find('label[data-testid="todo-text"]').text()).toBe(wrapper.vm.todo.text)
  })

  // 测试TodoItem组件渲染后的checked属性和样式
  test('done', async () => {
    const done = wrapper.find('input[data-testid="todo-done"]')
    const todoItem = wrapper.find('li[data-testid="todo-item"]')
    expect(done.element.checked).toBe(true)
    expect(todoItem.classes()).toContain('completed')

    await done.setChecked(false) // 取消选中
    expect(done.element.checked).toBe(false)
    expect(todoItem.classes('completed')).toBeFalsy()
  })

  // 测试删除的点击事件
  test('delete todo', async () => {
    const deleteBtn = wrapper.find('button[data-testid="delete"]')
    await deleteBtn.trigger('click')
    // console.log(wrapper.emitted()) // { 'delete-todo': [ [ 1 ] ] }  // 获取对外发布的自定义事件
    expect(wrapper.emitted()['delete-todo']).toBeTruthy()
    expect(wrapper.emitted()['delete-todo'][0][0]).toBe(wrapper.vm.todo.id)
  })

  // 测试双击获得编辑状态，验证是否有 editing 这个class
  test('edit todo style', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]')
    const todoItem = wrapper.find('li[data-testid="todo-item"]')
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]')
    await label.trigger('dblclick')
    expect(todoItem.classes()).toContain('editing') // li标签的class中是否包含editing

    await todoEdit.trigger('blur')
    expect(todoItem.classes('editing')).toBeFalsy() // li标签的class中是否不存在editing
  })

  // 测试编辑敲回车后
  test('save edit todo', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]')
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]')
    await label.trigger('dbclick')
    // 编辑文本框中的内容展示
    expect(todoEdit.element.value).toBe(wrapper.vm.todo.text)

    // 修改文本框的值
    const text = 'hello'
    await todoEdit.setValue(text)

    // 触发回车事件
    await todoEdit.trigger('keyup.enter')
    // console.log(wrapper.emitted()) // { 'edit-todo': [ [ [Object] ] ] } // 获取对外发布的自定义事件
    expect(wrapper.emitted()['edit-todo']).toBeTruthy()
    expect(wrapper.emitted()['edit-todo'][0][0]).toEqual({
      id: wrapper.vm.todo.id,
      text
    })

    // 确保取消了编辑状态
    expect(wrapper.vm.isEditing).toBeFalsy()
  })

  // 测试取消编辑
  test('cancel edit todo', async () => {
    const label = wrapper.find('label[data-testid="todo-text"]')
    const todoEdit = wrapper.find('input[data-testid="todo-edit"]')
    await label.trigger('dbclick')

    const text = wrapper.vm.todo.text // 记录初始值
    await todoEdit.setValue('bbb')
    await todoEdit.trigger('keyup.esc') // 触发取消的事件

    expect(wrapper.vm.todo.text).toBe(text) // 验证字段没有被修改

    expect(wrapper.vm.isEditing).toBeFalsy() // 验证编辑状态被取消
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
