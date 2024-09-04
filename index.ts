import type { microAppConfig } from "./src/types/config.d.ts"
import microAppSetting from './src/settings/microAppSetting.ts'
import { initVueRouter, getRounterInstance } from './src/router.ts'

let microAppMessageInstance;

// 初始化微前端框架
async function initMyMicroApp(app: object, options: microAppConfig, router?: any, store?: any) {
  // 全局存储所有初始化参数 
  await microAppSetting.setAllConfig(options)

  // 导入工具函数
  const microAppUtils = await import('./src/utils.ts')
  console.log(`💥microAppUtils已可用:`, microAppUtils.default)
  const { getMicroApp, isBaseApp, isMicroApp, getMicroAppName } = microAppUtils.default

  // 初始化应用
  const { initMicroApp } = await import('./src/initMicroApp.ts')
  initMicroApp(isBaseApp(), app, options, router, store)

  // 初始化路由
  initVueRouter(router)

  // 获取当前微前端实例
  const microAppInst = getMicroApp()
  console.log('===🎉🎉 microApp初始化完成 🎉🎉==', microAppInst)
  console.log(`🚩${options.projectName}当前：`, isMicroApp() ? '在微前端环境' : '不在微前端环境', isBaseApp() ? '主应用' : '子应用',)

  // 初始化通信对象 microAppMessage
  const { initMicroAppMessage } = await import('./src/message/index.ts')
  microAppMessageInstance = await initMicroAppMessage()
  console.log(isBaseApp() ? '主应用' : '子应用', `🐷${getMicroAppName()}:`, "🐬microAppMessage初始化完成", microAppMessageInstance)

  return microAppInst
}
export default initMyMicroApp

// 导出获取microAppMessage的函数（更安全）  
export function getMicroAppMessage() {
  return microAppMessageInstance;
}

export const microAppRouter = getRounterInstance()

// 导出其他模块
export { default as microAppUtils } from './src/utils.ts' // 多种方法
export { default as renderAllSubApp } from './src/render.ts' // renderAllSubApp()方法
export { getMainAppConfigs, getSubAppConfigs } from './src/appConfigs.ts' // subAppConfigs 和 mainAppConfigs
export { microAppSetting }
export * from './src/router.ts' // getRounterInstance()方法