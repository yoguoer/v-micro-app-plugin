/**
 * 所有子应用配置项,导出对象为：
 *   {
 *    子应用名称： 子应用选项
 *   }
 * 举个例子：
 * 'subApp1': {
 *    name: 'subApp1',
 *    url: ProjectSetting.microAppUrl['subApp1']
 *  },
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
    'disable-sandbox': false,
    iframe: true,
    lifeCycles: {
      created(e, appName) {
        console.log(`💨子应用${appName}被创建！`)
      },
      beforemount(e, appName) {
        console.log(`💥子应用${appName}即将渲染！`)
      },
      mounted(e, appName) {
        console.log(`💯子应用${appName}已经渲染完成！`)
      },
      unmount(e, appName) {
        console.log(`❎子应用${appName}已经卸载！`)
      },
      error(e, appName) {
        console.log(`❌子应用${appName}加载出错！`)
      }
    }
   }
}

// export const subAppConfigs: {
//   [key: string]: any
// } = microAppSetting.getConfig('subAppConfigs')
// export const mainAppConfigs: {
//   [key: string]: any
// } = {
//   name: microAppSetting.getConfig('projectName'), //应用名称
//   'disable-sandbox': false,
//   iframe: true,
//   lifeCycles: {
//     created(e, appName) {
//       console.log(`💨子应用${appName}被创建！`)
//     },
//     beforemount(e, appName) {
//       console.log(`💥子应用${appName}即将渲染！`)
//     },
//     mounted(e, appName) {
//       console.log(`💯子应用${appName}已经渲染完成！`)
//     },
//     unmount(e, appName) {
//       console.log(`❎子应用${appName}已经卸载！`)
//     },
//     error(e, appName) {
//       console.log(`❌子应用${appName}加载出错！`)
//     }
//   }
// }
