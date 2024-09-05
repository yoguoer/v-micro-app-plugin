import type { microAppConfig } from "../types/config"


// 定义microAppSetting类
class microAppSetting {
    // 定义静态变量，用于存储单例实例
    private static instance: microAppSetting | null = null;

    // 定义私有变量，用于存储配置信息
    private setting: microAppConfig = {
        projectName: '', // 项目名称
        isBaseApp: true, // 是否为 micro-app 主应用
        basePath: '', // 打包路径
        'disable-sandbox': false, // 是否禁用沙箱
        iframe: true, // 是否使用 iframe
    }
    // 子应用配置，用于存储配置信息
    private subAppConfigs: microAppConfig = {}

    // 私有构造函数，确保外部不能直接通过new创建实例  
    private constructor() { }

    // 获取单例实例  
    public static getInstance(): microAppSetting {
        // 如果单例实例不存在，则创建一个新的实例
        if (!microAppSetting.instance || microAppSetting.instance == null) {
            microAppSetting.instance = new microAppSetting();
        }
        // 返回单例实例
        return microAppSetting.instance;
    }

    // 设置单个全局配置 
    public setConfig(key: keyof microAppSetting, value: any): void {
        // 将传入的值赋给对应的配置项
        this.setting[key] = value;
    }

    // 一次性设置全局配置  
    public setAllConfig(initValue: microAppConfig): void {
        // 遍历传入的配置对象
        for (const key in initValue) {
            if(key === 'subAppConfigs') {
                this.subAppConfigs[key] = initValue[key]
            }else {
                this.setting[key] = initValue[key];
            }
        }
        console.log('✅全局配置microAppSetting成功', this.setting)
    }

    // 获取全局配置  
    public getConfig(key: keyof microAppConfig): keyof microAppConfig {
        // 返回对应的配置项
        return this.setting[key];
    }

    // 获取全局配置  
    public getMainAppConfigs(): microAppConfig {
        // 返回对应的配置项
        return this.setting;
    }

    // 获取子应用配置
    public getSubAppConfigs(appName: string): keyof microAppConfig {
        // 返回对应的配置项
        return this.subAppConfigs[appName];
    }

    // 获取子应用配置
    public getAllSubAppConfigs(): microAppConfig {
        // 返回对应的配置项
        return this.subAppConfigs;
    }
}

// 导出单例的getter方法，以便在其他模块中使用  
export default microAppSetting.getInstance();