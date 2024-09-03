// 主应用配置项
export interface microAppConfig {
    projectName?: string; // 项目名称
    subAppConfigs?: Object; // 子应用配置
    isBaseApp?: boolean; // 是否为 micro-app 主应用
    basePath?: string; // 打包路径
    disableSandbox?: boolean; // 是否禁用沙箱
    iframe?: boolean; // 是否使用 iframe
    [key: string]: any;
}