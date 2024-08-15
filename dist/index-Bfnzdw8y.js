"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
async function initMicroAppMessage() {
  const { default: MicroAppMessage } = await Promise.resolve().then(() => require("./message-BG01zB3b.js"));
  const microAppUtils = await Promise.resolve().then(() => require("./index-DaOQJQGa.js")).then((n) => n.utils);
  const { getMicroApp, isBaseApp } = microAppUtils.default;
  const { getMainAppConfigs } = await Promise.resolve().then(() => require("./index-DaOQJQGa.js")).then((n) => n.appConfigs);
  const MainAppConfigs = await getMainAppConfigs();
  const microAppMessage = new MicroAppMessage(getMicroApp(), isBaseApp(), MainAppConfigs["disable-sandbox"] || false);
  return microAppMessage;
}
exports.initMicroAppMessage = initMicroAppMessage;
