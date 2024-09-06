/**
 * 所有子应用配置项,导出对象为：
 *   {
 *    子应用名称： 子应用选项
 *   }
 */
import microAppSetting from './settings/microAppSetting.ts'

//  子应用配置项
export function getSubAppConfigs(): { [key: string]: any } {
  return microAppSetting.getAllSubAppConfigs()
}


// 主应用配置项
export function getMainAppConfigs(): { [key: string]: any } {
  return microAppSetting.getMainAppConfigs()
}
