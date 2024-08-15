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
    projectName?: string; // 项目名称
    subAppConfigs?: Object; // 子应用配置
    isBaseApp?: boolean; // 是否为 micro-app 主应用
    basePath?: string; // 打包路径
    disableSandbox?: boolean; // 是否禁用沙箱
    iframe?: boolean; // 是否使用 iframe
}
```

## options 参数介绍

​	在配置 `v-micro-app-plugin` 时，你需要准备一个符合条件的  `options` 对象，该对象包含以下参数：

| 参数名         | 介绍                                    | 类型    |
| -------------- | --------------------------------------- | ------- |
| projectName    | 项目名称                                | string  |
| subAppConfigs  | 子应用配置对象，包含多个子应用的配置    | Object  |
| isBaseApp      | 标记当前应用是否为主应用（默认为 true） | boolean |
| basePath       | 打包路径或其他基础路径                  | string  |
| disableSandbox | 是否禁用沙箱（默认为 false）            | boolean |
| iframe         | 是否使用 iframe（默认为 true）          | boolean |

注意：`subAppConfigs` 对象中每个子应用的配置包括：

- `name`：子应用名称
- `url`：子应用的运行地址

# 使用

## 引入插件

​	在你的主应用或目标系统的入口文件中，引入 `v-micro-app-plugin`。

```typescript
import initMyMicroApp from 'v-micro-app-plugin'
```

## 配置和启动

​	你需要准备一个配置对象 `options`，包含项目名称、子应用配置、是否为MicroApp主应用以及打包路径等信息。然后，使用 `initMyMicroApp` 函数进行初始化。这里假设你已经有了一个 Vue 应用实例 `app` , Vue Router 实例 `router`，以及状态管理实例 store。

```typescript
const options = {  
  projectName: 'v-micro-app-plugin',  
  subAppConfigs: {  
    'appFirst': {  
      name: 'appFirst',  
      url: 'http://localhost:4000/#/' // 微应用的运行地址  
    },  
    'appSecond': {  
      name: 'appSecond',  
      url: 'http://localhost:3000/#/' // 另一个微应用的运行地址  
    }  
  },  
  isBaseApp: true, // 当前应用是否为主应用
  basePath: '/', // 打包路径或其他基础路径 
  disableSandbox: false, // 是否禁用沙箱
  iframe: true, // 是否使用 iframe
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
    development: 'http://localhost:3000/#/',  
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
  basePath: '/', // 打包路径或其他基础路径  
  disableSandbox: false, // 是否禁用沙箱
  iframe: true, // 是否使用 iframe
};  
  
await initMyMicroApp(app, options, router, store);
```

> ⚠**注意**：
>
> 不管是主应用还是子应用，都必须安装插件，根据需要进行不同的配置。

# 对象和方法

​	`v-micro-app-plugin` 提供了一系列可供使用的方法和对象：

## microAppUtils 对象

​	该对象用于获取当前应用的一些基本信息，提供多个方法。具体如下：

| 方法名                | 介绍                       | 参数          |
| --------------------- | -------------------------- | ------------- |
| isMicroApp            | 判断应用是否在微前端环境中 | -             |
| isBaseApp             | 判断应用是否是主应用       | -             |
| getMicroAppBaseRoute  | 获取子应用的基础路由       | -             |
| getMicroAppPublicPath | 获取子应用的publicPath目录 | -             |
| getMicroAppName       | 获取当前应用名称           | name?: string |
| getMicroApp           | 返回当前应用实例           | -             |

> 使用示例：
>
> ```typescript
> import { microAppUtils } from "v-micro-app-plugin";
> 
> const { isMicroApp, isBaseApp } = microAppUtils;
> import { onBeforeMount } from "vue";
> 
> onBeforeMount(() => {
>   	console.log('是否在微前端环境中：',isMicroApp(), '是否为主应用：'isBaseApp())
> })
> ```

## getMicroAppMessage 方法

​	此方法直接返回一个通信实例对象，该对象用于实现应用之间的通信，提供一系列 API 方便使用。具体如下：

| 方法名             | 介绍                               | 参数                                           |
| ------------------ | ---------------------------------- | ---------------------------------------------- |
| sendMessage        | 发送数据                           | { data, appName, callback }: MessageParamsType |
| sendGlobal         | 全局发送数据                       | { data, appName, callback }: MessageParamsType |
| forceSend          | 强制发送数据，无论数据是否变化     | { data, appName, callback }: MessageParamsType |
| forceSendGlobal    | 强制全局发送数据，无论数据是否变化 | { data, appName, callback }: MessageParamsType |
| getMessage         | 获取数据                           | appName?: string                               |
| getGlobalMessage   | 获取全局数据                       | -                                              |
| clearMessage       | 清除数据                           | appName: string                                |
| clearGlobalMessage | 清除全局数据                       | -                                              |

注意：`MessageParamsType`的类型声明如下：

```typescript
interface MessageParamsType {
  data: object // 发送的数据内容
  appName?: string // 接收数据应用名称,当且仅当主应用发送数据时需要传入
  callback?: Function // 回调函数
}
```

> 使用示例：
>
> 在子应用 appFirst 中，使用 sendMessage 给子应用发出数据，使用发出 sendGlobal 全局数据：
>
> ```typescript
> import { getMicroAppMessage } from "v-micro-app-plugin";
> 
> function testSendMessage(){
>     const microAppMessage = getMicroAppMessage()
>     microAppMessage.sendMessage({
>      data: { type: 'sendMessage', value: 'appFirst给主应用发送数据~' },
>      callback: () => {
>        console.log('使用sendMessage发送数据成功，执行回调！')
>      }
>     })
>     microAppMessage.sendGlobal({
>      data: { fun: 'sendGlobal', text: 'appFirst给全局发送数据~' },
>      callback: () => {
>        console.log('使用sendGlobal发送数据成功，执行回调！')
>      }
>     })
>     setTimeout(() => {
>        console.log("getGlobalMessage:", microAppMessage.getGlobalMessage(),"getMessage:", microAppMessage.getMessage())
>     },3000)
> }
> // 结果发现：子应用 => 可以接收到全局信息，但接收不到自己发给主应用的信息。
> ```
>
> 在主应用中，使用 getMessage 接收子应用发来的数据，使用 getGlobalMessage 接收全局数据：
>
> ```typescript
> import { getMicroAppMessage } from "v-micro-app-plugin";
> 
> function testGetMessage() {
>     const microAppMessage = getMicroAppMessage()
>     setTimeout(() => {
>      console.log('getGlobalMessage:',microAppMessage.getGlobalMessage(),'getMessage:',microAppMessage.getMessage('appFirst'))
>     }, 3000)
> }
> // 结果发现：主应用 => 可以接收到全局信息，也可以收到 appFirst 发来的信息。
> ```
>
> **Tip**：其它通信 API 方法的使用方式同上。
>
> ⚠**注意**：**子**应用发送数据给主应用时，**无需**传递`appName`参数；而**主**应用发送数据给子应用时，则**需**通过`appName`参数来指定某个具体子应用名称。同理，清空当前**子**应用发送给主应用的数据时，**无需**传递`appName`参数；而清空**主**应用发送给子应用的数据时，则**需**通过`appName`参数来指定某个具体子应用名称。

## 可直接引入的方法

| 方法名             | 介绍                   | 参数 |
| ------------------ | ---------------------- | ---- |
| getMainAppConfigs  | 获取主应用配置项       | -    |
| getSubAppConfigs   | 获取子应用配置项       | -    |
| getRounterInstance | 获取 Microapp 路由实例 | -    |
| renderAllSubApp    | 渲染所有子应用         | -    |

> 使用示例：
>
> ```typescript
> import { getMainAppConfigs, getSubAppConfigs } from "v-micro-app-plugin";
> import { onBeforeMount } from "vue";
> 
> onBeforeMount(() => {
> 	console.log('使用示例：',getMainAppConfigs(), getSubAppConfigs())
> })
> // 将会输出当前主应用配置信息，以及其包含的子应用配置信息
> ```

## 其它

​	为了照顾到一些微前端小白，在这里，我附上一些必要的、可能会有所帮助的信息。

### 配置路由信息

 有了主子应用之后，我们就需要**在主应用中**给子应用配置路由信息，这里一共有 2 个子应用，我们为它们分别进行配置。

::: tip 资源地址

 微前端插件 v-micro-app-plugin 源码地址：https://github.com/yoguoer/v-micro-app-plugin.git

 用该插件搭建的的示例项目 vMicroVerseHub 源码地址：https://github.com/yoguoer/vMicroVerseHub.git

:::

- appFirst：

```typescript
import microAppSetting from '@/settings/microAppSetting'

export default {
  path: '/appFirst',
  name: 'appFirst',
  component: Layout,
  order: 1,
  hidden: false,
  meta: {
    title: 'appFirst',
    hideBreadcrumb: false,
    icon: Document,
    microAppOptions: microAppSetting.subAppConfigs!['appFirst']
  }
}
```

- appSecond：

```typescript
import microAppSetting from '@/settings/microAppSetting'

export default {
  path: '/appSecond',
  name: 'appSecond',
  component: Layout,
  order: 2,
  hidden: false,
  
  meta: {
    title: 'appSecond',
    hideBreadcrumb: false,
    icon: Document,
    microAppOptions: microAppSetting.subAppConfigs!['appSecond'],
  }
}
```

### 封装 MicroAppContainer 

 众所周知，路由切换时，可以给`<router-view />`填充上对应路径的内容，同理，microApp中的`<micro-app></micro-app>`也有同样的功能。我们可以对其进行二次封装，结合`v-if`，以便于根据是路由指向的是子应用，还是本系统自由模块，来判断究竟是渲染微应用视图，还是渲染普通视图。

 为了达到这个目的，我们可以新建一个 MicroAppContainer 文件夹，在其中创建一个`index.vue`，然后键入以下内容：

```typescript
<template>
  <div :class="[`${prefixCls}-container`]">
    <!-- name：应用名称, url：应用地址 -->
    <micro-app v-bind="options" :name="options.name" keep-alive></micro-app>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";

const props = defineProps<{
  options: {
    [key: string]: any;
  };
}>();

let prefixCls = props.options.name

watch(
  () => props.options,
  (newValue) => {
    prefixCls = newValue.name
  },
  { immediate: true, deep: true }
);
</script>
<style></style>
```

> **⚠注意：**keep-alive 属性可根据需要决定是否设置。

### 区分是否微应用视图

- 在你需要加载子应用页面的地方：

```html
        <div :class="[`${prefixCls}-viewer-microapp`]" v-if="isMicroAppView">
          <MicroAppContainer :options="microAppOptions" />
        </div>
        <div v-else>
          <router-view />
        </div>
```

- 一些必要的逻辑语句：

```typescript
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let isMicroAppView: Ref = ref(false)
let microAppOptions: Ref = ref({})
watchEffect(async () => {
  microAppOptions.value = route.meta.microAppOptions
  isMicroAppView.value = !isNullOrUnDef(microAppOptions.value) && !isEmpty(microAppOptions.value)
})
```
