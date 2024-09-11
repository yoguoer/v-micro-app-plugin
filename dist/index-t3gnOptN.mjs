async function initMicroAppMessage() {
  const { default: MicroAppMessage } = await import("./message-EASFsPbu.mjs");
  const microAppUtils = await import("./index-BpuVTkrV.mjs").then((n) => n.u);
  const { getMicroApp, isBaseApp } = microAppUtils.default;
  const { getMainAppConfigs } = await import("./index-BpuVTkrV.mjs").then((n) => n.j);
  const MainAppConfigs = await getMainAppConfigs();
  const microAppMessage = new MicroAppMessage(getMicroApp(), isBaseApp(), MainAppConfigs["disable-sandbox"] || false);
  return microAppMessage;
}
export {
  initMicroAppMessage
};
