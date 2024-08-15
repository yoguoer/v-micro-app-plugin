# v-micro-app-plugin 使用指南

​	`v-micro-app-plugin` 是一款基于京东MicroApp框架的微前端插件，旨在帮助开发者快速地将微应用集成到不同的系统中，实现高效、灵活的前端模块化开发。以下是详细的使用指南，帮助你快速上手。

# 特性

**快速集成**：通过简单的配置，即可将MicroApp微应用作为插件快速集成到现有系统中。

**灵活部署**：支持动态加载和卸载微应用，便于按需加载，提升页面加载速度和用户体验。

**无缝通信**：内置跨应用通信机制，支持不同微应用间的数据交换和事件传递。

**易于扩展**：插件架构清晰，易于根据业务需求进行定制和扩展。

# 安装

​	你可以通过 npm、pnpm 或 yarn 来安装 `v-micro-app-plugin`。

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

# 参数

## initMyMicroApp 调用参数

| 参数名  | 介绍         | 类型           |
| ------- | ------------ | -------------- |
| app     | 应用实例     | object         |
| options | 配置参数     | microAppConfig |
| router  | Router 实例  | any            |
| store   | 状态管理实例 | any            |

注意：`microAppConfig`的类型声明如下：

```typescript
export interface microAppConfig {
    projectName?: string; 
    subAppConfigs?: Object; 
    isBaseApp?: boolean; 
    basePath?: string; 
}
```

## options 参数介绍

​	在配置 `v-micro-app-plugin` 时，你需要准备一个符合条件的  `options` 对象，该对象包含以下参数：

| 参数名        | 介绍                                 | 类型    |
| ------------- | ------------------------------------ | ------- |
| projectName   | 项目名称                             | string  |
| subAppConfigs | 子应用配置对象，包含多个子应用的配置 | Object  |
| isBaseApp     | 标记当前应用是否为主应用             | boolean |
| basePath      | 打包路径或其他基础路径               | string  |

注意：`subAppConfigs` 对象中每个子应用的配置包括：

- `name`：子应用名称
- `url`：子应用的运行地址

# 使用

## 引入插件

​	在你的主应用或目标系统的入口文件中，引入 `v-micro-app-plugin`。

```
import initMyMicroApp from 'v-micro-app-plugin'
```

## 配置和启动

​	你需要准备一个配置对象 `options`，包含项目名称、子应用配置、是否为MicroApp主应用以及打包路径等信息。然后，使用 `initMyMicroApp` 函数进行初始化。这里假设你已经有了一个 Vue 应用实例 `app` , Vue Router 实例 `router`，以及状态管理实例 store。

```typescript
const options = {  
  projectName: 'micro-app-Name',  
  subAppConfigs: {  
    'oldRDM': {  
      name: 'appFirst',  
      url: 'http://localhost:4000/#/' // 微应用的运行地址  
    },  
    'newRDM': {  
      name: 'appSecond',  
      url: 'http://localhost:3000/#/' // 另一个微应用的运行地址  
    }  
  },  
  isBaseApp: true, // 标记当前应用为主应用
  basePath: '/vivien', // 打包路径或其他基础路径 
};  

// 初始化微前端插件  
await initMyMicroApp(app, options, router, store); 
```

## 环境变量配置

​	为了在不同环境下（如开发、测试、生产）使用不同的微应用地址，你可以使用环境变量来动态设置 `url`。这里提供一个示例：

```typescript
// 假设你已经在项目中配置了环境变量，例如使用 Vite 的 .env 文件   import.meta.env.MODE
const env = import.meta.env.MODE; // 这里使用的是 Vite 默认的 MODE 变量 
const microAppUrl = {  
  appFirst: {  
    development: 'http://localhost:4000/#/',  
    test: 'https://test.example.com/vivien/appFirst/',  
    production: 'https://www.example.com/vivien/appFirst/'  
  },  
  appSecond: {  
    development: 'http://localhost:4000/#/',  
    test: 'https://test.example.com/vivien/appSecond/',  
    production: 'https://www.example.com/vivien/appSecond/'  
  },  
};  
  
const options = {  
  projectName: 'micro-app-Name',  
  subAppConfigs: {  
    'appFirst': {  
      name: 'appFirst',  
      url: microAppUrl['appFirst'][env]  
    },  
    'appSecond': {  
      name: 'appSecond',  
      url: microAppUrl['appSecond'][env]  
    }  
  },  
  isBaseApp: true, // 是否为主应用  
  basePath: '/vivien', // 打包路径或其他基础路径  
};  
  
await initMyMicroApp(app, options);
```

# 内置对象和方法

​	`v-micro-app-plugin` 提供了一系列可供使用的方法和对象：

## 可直接引入的方法

| 方法名             | 介绍                   | 参数 |
| ------------------ | ---------------------- | ---- |
| getMainAppConfigs  | 获取主应用配置项       | -    |
| getSubAppConfigs   | 获取子应用配置项       | -    |
| getRounterInstance | 获取 Microapp 路由实例 | -    |
| renderAllSubApp    | 渲染所有子应用         | -    |

## microAppUtils 对象

​	该对象用于获取当前应用的一些基本信息，一共包含 3 个属性和 2 个方法。具体如下：

- ### 属性

| 属性名             | 介绍                       | 返回值类型 |
| ------------------ | -------------------------- | ---------- |
| isMicroApp         | 判断应用是否在微前端环境中 | boolean    |
| isBaseApp          | 判断应用是否是主应用       | boolean    |
| microAppBaseRoute  | 子应用的基础路由           | string     |
| microAppPublicPath | 子应用的publicPath目录     | string     |

- ### 方法

| 方法名          | 介绍             | 参数          |
| --------------- | ---------------- | ------------- |
| getMicroAppName | 获取当前应用名称 | name?: string |
| getMicroApp     | 返回当前应用实例 | -             |

## microAppMessage 对象

​	该对象用于实现应用之间的通信，提供一系列 API 方便使用。具体如下：

| 方法名             | 介绍                               | 参数                                           |
| ------------------ | ---------------------------------- | ---------------------------------------------- |
| sendMessage        | 发送数据                           | { data, appName, callback }: MessageParamsType |
| sendGlobal         | 全局发送数据                       | data                                           |
| forceSend          | 强制发送数据，无论数据是否变化     | { data, appName, callback }: MessageParamsType |
| forceSendGlobal    | 强制全局发送数据，无论数据是否变化 | data: object, callback?: Function              |
| getMessage         | 获取数据                           | appName?: string                               |
| getGlobalMessage   | 获取全局数据                       | -                                              |
| clearMessage       | 清除数据                           | appName: string                                |
| clearGlobalMessage | 清除全局数据                       | -                                              |

注意：`MessageParamsType`的类型声明如下：

```typescript
interface MessageParamsType {
  data: object // 发送数据
  appName?: string // 接收数据应用名称,仅当主应用发送时需要传入
  callback?: Function // 回调函数
}
```
