// 初始化数据通信实例
export async function initMicroAppMessage() {
    const { default: MicroAppMessage } = await import('./message.ts')
    const microAppUtils = await import('../utils.ts')

    const { getMicroApp, isBaseApp } = microAppUtils.default
    const { getMainAppConfigs } = await import('../appConfigs.ts')
    const MainAppConfigs = await getMainAppConfigs()

    // 初始化数据通信实例
    const microAppMessage = new MicroAppMessage(getMicroApp(), isBaseApp(), MainAppConfigs['disable-sandbox'] || false)

    return microAppMessage
}
