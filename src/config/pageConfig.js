const jsonData = require("./page.json");
const { loadScript } = require("../utils/tool");

/**
 * 解析地址url以及配置传参
 * @returns urlParames url传参
 * @returns orginParames 页面配置传参
 */
export function getPageParameters() {
  const parames = {};
  let searchData = location.search
    ? location.search.replace("?", "").split("&")
    : [];
  for (let i = 0; i < searchData.length; i++) {
    const v = searchData[i].split("=");
    parames[v[0]] = v[1];
  }
  const key = location.pathname.replace("/", "").replace(".html", "");
  return {
    urlParames: parames,
    orginParames: {
      ...jsonData[key],
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      processBaseUrl: process.env.VUE_APP_REQ_URL,
      env: process.env.VUE_APP_ENV,
    },
  };
}

/**
 * 环境配置
 */
export function environment() {
  const env = process.env.VUE_APP_ENV;
  switch (env) {
    case "Dev":
      console.log("--->开发环境下导入eruda");
      loadScript(
        "https://cdn.bootcdn.net/ajax/libs/eruda/2.5.0/eruda.min.js?" +
          Date.now(),
        function () {
          window.eruda &&
            window.eruda.init({
              tool: ["console", "network", "info", "resource"],
            });
        }
      );
      break;
  }
}
