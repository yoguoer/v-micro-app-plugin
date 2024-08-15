/**
 * 由于主应用和子应用的通信方法不同：
 * 主应用：microApp.setData(appName, {type: '新的数据'})、  microApp.getData(appName)、microApp.clearData(appName)
 * 子应用：window.microApp.dispatch({type: '子应用发送给主应用的数据'})、window.microApp.getData()、window.microApp.clearData()
 * 在此处会自动识别该应用为主应用还是子应用，因此需要统一的通信方法。
 * 为了提供统一的通信方法，需要对以上通信方法做二次封装。
 */
import { EventCenterForMicroApp, getAllApps } from '@micro-zoe/micro-app'
import microAppUtils from './utils.ts'
import { getMainAppConfigs } from './appConfigs.ts'

const { getMicroAppName, getMicroApp, isBaseApp } = microAppUtils

interface MessageParamsType {
  data: object // 发送数据
  appName?: string // 接收数据应用名称,仅当主应用发送时需要传入
  callback?: Function // 回调函数
}

class MicroAppMessage {
  app
  disableSandbox = false
  isBaseApp = true

  constructor(app, isBaseApp, disableSandbox) {
    this.app = app
    this.isBaseApp = isBaseApp
    this.disableSandbox = disableSandbox
    //沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。
    if (disableSandbox) {
      if (isBaseApp) {
        //主应用：为子应用初始化通信对象
        // getAllApps: https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/api?id=getallapps
        for (let appName of getAllApps()) {
          // const appName = getMicroAppName(key)
          window[`eventCenterForApp${appName}`] = new EventCenterForMicroApp(appName)
        }
      } else {
        //子应用：从 window 获取主应用为该子应用注册的通信对象
        const appName = getMicroAppName()
        if (appName && window) {
          this.app = window[`eventCenterForApp${appName}`]
        } else {
          throw Error('❌应用通信初始化失败！')
        }
      }
    }
  }

  /**
   *发送数据
   * @param data 传递的数据
   * @param appName 应用名称
   */
  sendMessage({ data, appName, callback }: MessageParamsType): void {
    if (this.isBaseApp) {
      this.app.setData(appName, data)
    } else {
      this.app.dispatch(data, callback)
    }
  }

  /**
   * 全局发送数据
   * @param data 传递的数据
   * @param appName 应用名称
   */
  sendGlobal(data: object) {
    this.app.setGlobalData(data)
  }

  /**
   * 强制发送数据，无论数据是否变化。
   * @param data 传递的数据
   * @param appName 应用名称
   */
  forceSend({ data, appName, callback }: MessageParamsType): void {
    if (this.isBaseApp) {
      this.app.forceSetData(appName, data, callback)
    } else {
      this.app.forceDispatch(data, callback)
    }
  }

  /**
   * 强制全局发送数据，无论数据是否变化。
   * @param data 传递的数据
   * @param appName 应用名称
   */
  forceSendGlobal(data: object, callback?: Function): void {
    this.app.forceSetGlobalData(data, callback)
  }

  /**
   *获取数据
   * @param appName
   */
  getMessage(appName?: string): any {
    if (this.isBaseApp) {
      return this.app.getData(appName)
    } else {
      return this.app.getData()
    }
  }

  /**
   *获取全局数据
   * @param appName
   */
  getGlobalMessage(): any {
    return this.app.getGlobalData()
  }

  /**
   *清除数据
   * @param appName
   */
  clearMessage(appName: string): void {
    if (this.isBaseApp) {
      this.app.clearData(appName)
    } else {
      this.app.clearData()
    }
  }

  /**
   *清除全局数据
   * @param appName
   */
  clearGlobalMessage(): void {
    this.app.clearGlobalData()
  }
}

const microAppMessage = new MicroAppMessage(
  getMicroApp(),
  isBaseApp(),
  getMainAppConfigs()['disable-sandbox'] || false
)
export default microAppMessage
