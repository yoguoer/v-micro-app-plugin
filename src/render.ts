import microApp from '@micro-zoe/micro-app'
import { isEmpty } from './utils/is.ts'
import { getSubAppConfigs } from './appConfigs.ts'

/**
 * 渲染所有子应用
 */
export default function renderAllSubApp() {
  const subAppConfigs = getSubAppConfigs()
  
  if (isEmpty(subAppConfigs)) {
    return Error('❗未配置子应用。')
  }
  console.log("🎁subAppConfigs📢：", subAppConfigs)
  for (let appName in subAppConfigs) {
    microApp.renderApp(subAppConfigs[appName]).then((result) => {
      if (result) {
        console.log(`💯子应用${appName}渲染成功！`)
      } else {
        console.log(`❌子应用${appName}渲染失败！`)
      }
    })
  }
}
