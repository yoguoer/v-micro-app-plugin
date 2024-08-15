import type { microAppConfig } from "./src/types/config.d.ts"
import microApp from '@micro-zoe/micro-app'
import microAppSetting from './src/settings/microAppSetting.ts'
import { getMainAppConfigs } from './src/appConfigs.ts'
import { initVueRouter } from './src/router.ts'

async function initMyMicroApp(app: object, options: microAppConfig, router?: any, store?: any) {
  // 全局存储所有初始化参数 
  await microAppSetting.setAllConfig(options)

  const microAppUtils = await import('./src/utils.ts')
  const { getMicroApp, isBaseApp, isMicroApp } = microAppUtils.default
  console.log(`💥microAppUtils已可用:`, microAppUtils.default)

  // 为主应用时，注册主应用
  if (isBaseApp()) {
    console.log(`🍒 ${options.projectName}为主应用, 注册主应用📌`)
    // 注册主应用路由,
    // docs:https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/router?id=%e5%ad%90%e5%ba%94%e7%94%a8%e6%8e%a7%e5%88%b6%e4%b8%bb%e5%ba%94%e7%94%a8%e8%b7%b3%e8%bd%ac
    microApp.router.setBaseAppRouter(router)
    // 等待导入appConfigs.ts并启动microApp  
    microApp.start(getMainAppConfigs());
  } else {
    console.log(`🍍 ${options.projectName}为子应用, 注册子应用📌`)

    // 为子应用时, 注册子应用相关方法
    if (window) {
      window.unmount = () => {
        app.unmount()
        router = null
        store = null
      }
    }
  }

  initVueRouter(router)

  const microAppInst = getMicroApp()

  console.log('===🎉🎉 microApp初始化完成 🎉🎉==', microAppInst)
  console.log(`🚩${options.projectName}当前：`, isMicroApp() ? '在微前端环境' : '不在微前端环境', isBaseApp() ? '主应用' : '子应用',)

  return microAppInst
}
export default initMyMicroApp

export { default as microAppUtils } from './src/utils.ts' // 多种方法
export { default as renderAllSubApp } from './src/render.ts' // renderAllSubApp()方法
export { default as microAppMessage } from './src/message.ts' // 数据通信实例
export * from './src/router.ts' // getRounterInstance()方法
export { getMainAppConfigs, getSubAppConfigs } from './src/appConfigs.ts' // subAppConfigs 和 mainAppConfigs
export { microAppSetting }

