import { m as microApp } from "./index-JJf14dij.mjs";
async function initMicroApp(isBaseApp, app, options, router, store) {
  if (isBaseApp) {
    console.log(`📌${options.projectName}为主应用, 注册主应用!`);
    microApp.router.setBaseAppRouter(router);
    const { getMainAppConfigs } = await import("./index-JJf14dij.mjs").then((n) => n.j);
    const MainAppConfigs = await getMainAppConfigs();
    microApp.start(MainAppConfigs);
  } else {
    console.log(`📌${options.projectName}为子应用, 注册子应用!`);
    if (window) {
      window.unmount = () => {
        router = null;
      };
    }
  }
}
export {
  initMicroApp
};
