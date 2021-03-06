import { shallowMount } from '@vue/test-utils'
import TodoHeader from '@/components/TodoApp/TodoHeader.vue'

describe('TodoHeader.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(TodoHeader) // 挂载组件
  })

  // 测试头部新增按回车的逻辑
  test('New Todo', async () => {
    const input = wrapper.find('input[data-testid="new-todo"]')
    const text = 'hello'
    await input.setValue(text)
    await input.trigger('keyup.enter')
    // console.log(wrapper.emitted()) // { 'new-todo': [ [ 'hello' ] ] }  获取对外发布的自定义事件
    expect(wrapper.emitted()['new-todo']).toBeTruthy()
    expect(wrapper.emitted()['new-todo'][0][0]).toBe(text)
    expect(input.element.value).toBe('')
  })

  test('New Todo empty', async () => {
    const input = wrapper.find('input[data-testid="new-todo"]')
    await input.setValue('')
    await input.trigger('keyup.enter')
    expect(wrapper.emitted()['new-todo']).toBeFalsy()
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
