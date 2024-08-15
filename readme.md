# v-micro-app-plugin



# 🚀 快速上手你的微前端之旅

​	v-micro-app-plugin 是一款基于京东MicroApp框架构建的微前端插件，旨在帮助开发者快速构建、安装并集成微应用到多个系统中，实现高效、灵活的前端模块化开发。通过此插件，你可以轻松地在不同系统中共享和复用前端组件或服务，提升开发效率和系统间的互操作性。

# 🎯 特性

💎 快速集成：简单配置，即可将MicroApp微应用作为插件快速集成到现有系统中。

💎 灵活部署：支持动态加载和卸载微应用，便于按需加载，提升页面加载速度。

💎 无缝通信：内置跨应用通信机制，支持不同微应用间的数据交换和事件传递。

💎 易于扩展：插件架构清晰，易于根据业务需求进行定制和扩展。

# 📦 安装

- 通过 npm 安装

```bash
npm i v-micro-app-plugin --save
```

- 通过 pnpm 安装

```bash
pnpm i v-micro-app-plugin --save
```

- 通过 yarn 安装

```bash
yarn add v-micro-app-plugin
```

# 🔧 使用

​	**以下是一个简单使用的例子：**

```typescript
const options = {
  projectName: 'micro-app-Name',
  subAppConfigs: {
    'oldRDM': {
      name: 'appFirst',
      url: 'http://localhost:3000/#/'
    },
    'newRDM': {
      name: 'appSecond',
      url: 'http://localhost:4000/#/'
    }
  },
  isBaseApp: true,
  basePath: '/vivien',
}

await initMyMicroApp(app, options, router)
```

​	**具体使用指南：**

1、首先要确保你有一个符合条件的 options 参数，参数类型定义如下：

```typescript
export interface microAppConfig {
  projectName?: string; // 项目名称
  subAppConfigs?: Object; // 子应用配置
  isBaseApp?: boolean; // 是否为 micro-app 主应用（env.VITE_BASE_MICRO_APP）
  basePath?: string; // 打包路径（env.VITE_BASE_PATH）
}
```



2、定义微前端配置项

​	在插件配置中指定微应用的入口、名称、子应用信息等等。



3、传入参数并启用插件

```
initMyMicroApp(app, options，router)
```

