// 主应用配置项
export interface microAppConfig {
    projectName?: string; // 项目名称
    microAppUrl?: Object; // 微前端配置
    subAppConfigs?: Object; // 子应用配置
    isBaseApp?: boolean; // 是否为 micro-app 主应用（env.VITE_BASE_MICRO_APP）
    basePath?: string; // 打包路径（env.VITE_BASE_PATH）
}