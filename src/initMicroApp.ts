import microApp from '@micro-zoe/micro-app'
import type { microAppConfig } from "./types/config"

// 初始化 microApp
export async function initMicroApp(isBaseApp: boolean, app: object, options: microAppConfig, router?: any, store?: any) {
    // 为主应用时，注册主应用
    if (isBaseApp) {
        console.log(`📌${options.projectName}为主应用, 注册主应用!`)
        // 注册主应用路由
        // docs:https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/router?id=%e5%ad%90%e5%ba%94%e7%94%a8%e6%8e%a7%e5%88%b6%e4%b8%bb%e5%ba%94%e7%94%a8%e8%b7%b3%e8%bd%ac
        microApp.router.setBaseAppRouter(router)

        const { getMainAppConfigs } = await import('./appConfigs.ts')
        const MainAppConfigs = await getMainAppConfigs()
        // 等待导入appConfigs.ts并启动microApp  
        microApp.start(MainAppConfigs) // micro-app注册函数，全局执行一次
    } else {
        console.log(`📌${options.projectName}为子应用, 注册子应用!`)

        // 为子应用时, 注册子应用相关方法
        if (window) {
            window.unmount = () => {
                app?.unmount && app.unmount()
                router = null
                store = null
            }
        }
    }
}