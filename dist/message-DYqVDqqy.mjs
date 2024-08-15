import { g as getAllApps, E as EventCenterForMicroApp, a as microAppUtils } from "./index-SBhHXQui.mjs";
const { getMicroAppName } = microAppUtils;
class MicroAppMessage {
  constructor(app, isBaseApp, disableSandbox) {
    this.app = app;
    this.isBaseApp = isBaseApp;
    this.disableSandbox = disableSandbox;
    if (disableSandbox) {
      if (isBaseApp) {
        for (let appName of getAllApps()) {
          window[`eventCenterForApp${appName}`] = new EventCenterForMicroApp(appName);
        }
      } else {
        const appName = getMicroAppName();
        if (appName && window) {
          if (!window[`eventCenterForApp${appName}`]) {
            window[`eventCenterForApp${appName}`] = new EventCenterForMicroApp(appName);
          }
          this.app = window[`eventCenterForApp${appName}`];
        } else {
          throw Error("❌应用通信初始化失败！");
        }
      }
    }
  }
  /**
   *发送数据
   * @param data 传递的数据
   * @param appName 应用名称
   */
  sendMessage({ data, appName, callback }) {
    if (this.isBaseApp) {
      this.app.setData(appName, data, callback);
    } else {
      this.app.dispatch(data, callback);
    }
  }
  /**
   * 全局发送数据
   * @param data 传递的数据
   * @param appName 应用名称
   */
  sendGlobal({ data, appName, callback }) {
    this.app.setGlobalData(data, callback);
  }
  /**
   * 强制发送数据，无论数据是否变化。
   * @param data 传递的数据
   * @param appName 应用名称
   */
  forceSend({ data, appName, callback }) {
    if (this.isBaseApp) {
      this.app.forceSetData(appName, data, callback);
    } else {
      this.app.forceDispatch(data, callback);
    }
  }
  /**
   * 强制全局发送数据，无论数据是否变化。
   * @param data 传递的数据
   * @param appName 应用名称
   */
  forceSendGlobal({ data, appName, callback }) {
    this.app.forceSetGlobalData(data, callback);
  }
  /**
   *获取数据
   * @param appName
   */
  getMessage(appName) {
    if (this.isBaseApp) {
      return this.app.getData(appName);
    } else {
      return this.app.getData();
    }
  }
  /**
   *获取全局数据
   * @param appName
   */
  getGlobalMessage() {
    return this.app.getGlobalData();
  }
  /**
   *清除数据
   * @param appName
   */
  clearMessage(appName) {
    if (this.isBaseApp) {
      this.app.clearData(appName);
    } else {
      this.app.clearData();
    }
  }
  /**
   *清除全局数据
   * @param appName
   */
  clearGlobalMessage() {
    this.app.clearGlobalData();
  }
}
export {
  MicroAppMessage as default
};
