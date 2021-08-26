import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

test('HelloWorld.vue', async () => {
  // 挂载组件
  // 通过 shallowMount 方法是 浅渲染，只挂载一个组件而不渲染其子组件(即保留它们的存根)
  // mount是 深渲染
  const wrapper = shallowMount(HelloWorld, {
    propsData: {
      msg: 'hello hahaha'
    }
  })
  // console.log(wrapper.element.innerHTML) // 获取组件html元素，无法获取组件根元素
  // console.log(wrapper.html()) // 获取组件html元素，可以获取到组件根元素
  // expect(wrapper.element.innerHTML).toMatch('hello')
  // expect(wrapper.html()).toContain('hello')

  /** 测试点击button之后，count变量+1变成1，p标签内的值变成1 */
  const button = wrapper.find('button') // 相当于querySelector
  await button.trigger('click') // 触发vue中写的@click事件
  expect(wrapper.vm.count).toBe(1) // wrapper.vm获取到vue中的实例

  const p = wrapper.find('[data-id="count-text"]')
  expect(p.text()).toBe('1')

  /** 测试点击btn2之后，组件对外发布了一个emit自定义事件，参数是123 */
  const btn2 = wrapper.find('[data-id="btn2"]')
  // console.log(wrapper.emitted()) // [Object: null prototype] {}  获取对外发布的自定义事件
  await btn2.trigger('click')
  // console.log(wrapper.emitted()) // [Object: null prototype] { hello: [ [ '123' ] ] }
  expect(wrapper.emitted().hello).toBeTruthy()
  expect(wrapper.emitted().hello[0][0]).toBe('123')
})

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
