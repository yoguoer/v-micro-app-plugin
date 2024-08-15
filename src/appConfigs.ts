/**
 * 所有子应用配置项,导出对象为：
 *   {
 *    子应用名称： 子应用选项
 *   }
 */
import microAppSetting from './settings/microAppSetting.ts'

//  子应用配置项
export function getSubAppConfigs(): { [key: string]: any } {
  return microAppSetting.getConfig('subAppConfigs')
}


// 主应用配置项
export function getMainAppConfigs(): { [key: string]: any } {
  return {
    name: microAppSetting.getConfig('projectName'), //应用名称
    'disable-sandbox': microAppSetting.getConfig('disableSandbox'), //是否禁用沙箱
    iframe: microAppSetting.getConfig('iframe'), //是否使用iframe
    lifeCycles: {
      created(e, appName) {
        console.log(`💨子应用【${appName}】被创建！`)
      },
      beforemount(e, appName) {
        console.log(`💥子应用【${appName}】即将渲染！`)
      },
      mounted(e, appName) {
        console.log(`💯子应用【${appName}】已经渲染完成！`)
      },
      unmount(e, appName) {
        console.log(`❎子应用【${appName}】已经卸载！`)
      },
      error(e, appName) {
        console.log(`❌子应用【${appName}】加载出错！`)
      }
    }
  }
}
