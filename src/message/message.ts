/**
 * 由于主应用和子应用的通信方法不同：
 * 主应用：microApp.setData(appName, {type: '新的数据'})、  microApp.getData(appName)、microApp.clearData(appName)
 * 子应用：window.microApp.dispatch({type: '子应用发送给主应用的数据'})、window.microApp.getData()、window.microApp.clearData()
 * 在此处会自动识别该应用为主应用还是子应用，因此需要统一的通信方法。
 * 为了提供统一的通信方法，需要对以上通信方法做二次封装。
 */
import { EventCenterForMicroApp, getAllApps } from '@micro-zoe/micro-app'
import microAppUtils from '../utils.ts'

const { getMicroAppName } = microAppUtils

interface MessageParamsType {
  data: object // 发送的数据内容
  appName?: string // 接收数据应用名称,当且仅当主应用发送数据时需要传入
  callback?: Function // 回调函数
}

class MicroAppMessage {
  app: EventCenterForMicroApp | any; // 通信对象
  isBaseApp: boolean;
  disableSandbox: boolean;

  constructor(app, isBaseApp, disableSandbox) {
    this.app = app
    this.isBaseApp = isBaseApp
    this.disableSandbox = disableSandbox
    // 沙箱关闭后，子应用默认的通信功能失效，此时可以通过手动注册通信对象实现一致的功能。
    if (disableSandbox) {
      if (isBaseApp) {
        // 注册方式：在主应用中为子应用初始化通信对象
        for (let appName of getAllApps()) { // 获取所有子应用，包含已卸载和预加载的应用 [子应用name, 子应用name, ...]
          // 注意：每个子应用根据appName单独分配一个通信对象,子应用就可以通过注册的eventCenterForAppxx对象进行通信，其api和window.microApp一致，主应用通信方式没有任何变化。
          window[`eventCenterForApp${appName}`] = new EventCenterForMicroApp(appName)
        }
      } else {
        //子应用：从 window 获取主应用为该子应用注册的通信对象
        const appName = getMicroAppName()
        if (appName && window) {
          // 如果主应用已经为该子应用注册了通信对象，则直接使用，否则创建一个通信对象
          if(!window[`eventCenterForApp${appName}`]){
            window[`eventCenterForApp${appName}`] = new EventCenterForMicroApp(appName)
          }
          this.app = window[`eventCenterForApp${appName}`]
        } else {
          throw Error('❌应用通信初始化失败！')
        }
      }
    }
    // console.log("🐷AppName", getMicroAppName(), "🐷isBaseApp", this.isBaseApp, "🐷disableSandbox", this.disableSandbox)
  }

  /**
   *发送数据
   * @param data 传递的数据
   * @param appName 应用名称
   */
  sendMessage({ data, appName, callback }: MessageParamsType): void {
    if (this.isBaseApp) {
      this.app.setData(appName, data, callback)
    } else {
      this.app.dispatch(data, callback)
    }
  }

  /**
   * 全局发送数据
   * @param data 传递的数据
   * @param appName 应用名称
   */
  sendGlobal({ data, appName, callback }: MessageParamsType) {
    this.app.setGlobalData(data, callback)
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
  forceSendGlobal({ data, appName, callback }: MessageParamsType): void {
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

export default MicroAppMessage
