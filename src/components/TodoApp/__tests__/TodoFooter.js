import { createLocalVue, mount } from '@vue/test-utils'
import TodoFooter from '@/components/TodoApp/TodoFooter.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({ // 需要拿到真实的<router-link>组件，就不适合mock一个router了
  linkActiveClass: 'selected'
})

describe('TodoFooter.vue', () => {
  // 声明wrapper类型，写代码时候wrapper下的属性有智能提示
  /** @type {import('@vue/test-utils').Wrapper} */
  let wrapper = null

  beforeEach(async () => {
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: true },
      { id: 3, text: 'sleep', done: false }
    ]
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    })
  })

  // 测试未完成的数量
  test('Done todos count', () => {
    const count = wrapper.vm.todos.filter(v => !v.done).length
    const countEl = wrapper.find('strong[data-testid="done-todos-count"]')
    expect(Number(countEl.text())).toBe(count)
  })

  // 测试是否显示清除按钮
  test('Clear Completed Show', async () => {
    const btn = wrapper.find('button[data-testid="clear-completed"]')
    expect(btn.exists()).toBeTruthy()

    // props数据无法修改，重新渲染下组件
    const todos = [
      { id: 1, text: 'eat', done: false },
      { id: 2, text: 'play', done: false },
      { id: 3, text: 'sleep', done: false }
    ]
    wrapper = mount(TodoFooter, {
      propsData: {
        todos
      },
      localVue,
      router
    })
    expect(wrapper.find('button[data-testid="clear-completed"]').exists()).toBeFalsy()
  })

  // 测试清除功能
  test('Clear Completed', async () => {
    const button = wrapper.find('button[data-testid="clear-completed"]')
    await button.trigger('click')
    // console.log(wrapper.emitted()) // { 'clear-completed': [ [] ] }
    expect(wrapper.emitted()['clear-completed']).toBeTruthy() // 获取对外发布的自定义事件
  })

  // 测试路由功能，切换路由路由内的组件样式高亮改变
  test('Router Link ActiveClass', async () => {
    // console.log(wrapper.findAllComponents({ name: 'RouterLink' }))
    const links = wrapper.findAllComponents({ name: 'RouterLink' })

    router.push('/active')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i) // links不是一个真实的数组
      if (link.vm.to === '/active') {
        expect(link.classes()).toContain('selected') // 需要拿到渲染出来的组件内的样式，就要使用mount，而不是shallowMount
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }

    router.push('/completed')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/completed') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }

    router.push('/')
    await localVue.nextTick()
    for (let i = 0; i < links.length; i++) {
      const link = links.at(i)
      if (link.vm.to === '/') {
        expect(link.classes()).toContain('selected')
      } else {
        expect(link.classes('selected')).toBeFalsy()
      }
    }
  })

  test('snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
