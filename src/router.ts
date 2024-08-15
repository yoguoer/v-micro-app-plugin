/**
  通过虚拟路由系统，我们可以方便的进行跨应用的跳转，如：
    主应用控制子应用跳转
    子应用控制主应用跳转
    子应用控制其它子应用跳转
   主应用和子应用控制路由的方法不同，需要对路由 microapp 路由对象做二次封装，根据当前应用为主应用还是子应用，提供统一的路由方法
   docs: https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/router?id=%e5%af%bc%e8%88%aa
 */
import microApp from '@micro-zoe/micro-app'

let VueRouter = null
export function initVueRouter(router: any) {
  if (!VueRouter) {
    VueRouter = router
  }
  return VueRouter
}

/**
 * 获取 Microapp 路由实例
 * @returns
 */
export async function getRounterInstance() {
  const microAppUtils = await import('./utils.ts')
  const { isMicroApp, isBaseApp } = microAppUtils.default

  if (isMicroApp() && isBaseApp()) {
    return microApp.router
  } else {
    // 获取主应用路由
    if (window?.microApp?.router.getBaseAppRouter) {
      return window?.microApp?.router.getBaseAppRouter()
    } else if (window?.microApp?.router) {
      return window.microApp.router
    } else {
      return VueRouter
    }
  }
}

export default getRounterInstance()
