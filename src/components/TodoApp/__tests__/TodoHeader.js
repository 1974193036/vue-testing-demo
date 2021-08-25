import { shallowMount } from '@vue/test-utils'
import TodoHeader from '@/components/TodoApp/TodoHeader.vue'

describe('TodoHeader.vue', () => {
  // 测试头部新增按回车的逻辑
  test('New Todo', async () => {
    const wrapper = shallowMount(TodoHeader) // 挂载组件
    const input = wrapper.find('input[data-testid="new-todo"]')
    const text = 'hello'
    await input.setValue(text)
    await input.trigger('keyup.enter')
    // console.log(wrapper.emitted()) // { 'new-todo': [ [ 'hello' ] ] }  获取对外发布的自定义事件
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
    expect(input.element.value).toBe('')
  })
})
