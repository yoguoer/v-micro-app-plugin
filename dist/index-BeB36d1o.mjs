async function initMicroAppMessage() {
  const { default: MicroAppMessage } = await import("./message-tMwvANlt.mjs");
  const microAppUtils = await import("./index-D15vt_Hl.mjs").then((n) => n.u);
  const { getMicroApp, isBaseApp } = microAppUtils.default;
  const { getMainAppConfigs } = await import("./index-D15vt_Hl.mjs").then((n) => n.j);
  const MainAppConfigs = await getMainAppConfigs();
  const microAppMessage = new MicroAppMessage(getMicroApp(), isBaseApp(), MainAppConfigs["disable-sandbox"] || false);
  return microAppMessage;
}
export {
  initMicroAppMessage
};
