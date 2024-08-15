/**
 * 微前端相关函数
 */
import microApp from '@micro-zoe/micro-app'
import microAppSetting from './settings/microAppSetting.ts'


/**
 * 判断应用是否在微前端环境中
 * @returns
 */
export function IsMicroApp(): boolean {
  const isBaseApp = microAppSetting.getConfig('isBaseApp').toString() === 'true'
  return isBaseApp ? true : window.__MICRO_APP_ENVIRONMENT__ || false
}

/**
 * 判断应用是否是主应用
 * @returns
 */
export function IsBaseApp(): boolean {
  return microAppSetting.getConfig('isBaseApp').toString() === 'true'
}

/**
 * 应用名称
 * @returns
 */
export function MicroAppName(name?: string): string {
  const isMicroApp = IsMicroApp()
  if (isMicroApp && window?.__MICRO_APP_NAME__) {
    return window.__MICRO_APP_NAME__
  }
  return name ? `${microAppSetting.getConfig('projectName')}-${name}` : microAppSetting.getConfig('projectName')
}

/**
 * 子应用的基础路由
 * @returns
 */
export function MicroAppBaseRoute(): string {
  if (IsMicroApp()) {
    return window.__MICRO_APP_BASE_ROUTE__
  }
  return microAppSetting.getConfig('basePath') || '/'
}

/**
 * 子应用的基础路由
 * @returns
 */
export function MicroAppPublicPath(): string {
  if (IsMicroApp()) {
    return window.__MICRO_APP_PUBLIC_PATH__
  }
  return microAppSetting.getConfig('basePath') || '/'
}

/**
 *
 * @returns
 */
export function getMicroApp(): object {
  const isBaseApp = IsBaseApp()
  // 基座应用返回 microApp 实例， 子应用中返回 window.microApp
  return isBaseApp ? microApp : window && window.microApp ? window.microApp : microApp
}

export default {
  isMicroApp: IsMicroApp(),
  isBaseApp: IsBaseApp(),
  microAppBaseRoute: MicroAppBaseRoute(),
  microAppPublicPath: MicroAppPublicPath(),
  getMicroAppName: MicroAppName,
  getMicroApp: getMicroApp
}
