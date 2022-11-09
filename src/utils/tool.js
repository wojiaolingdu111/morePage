/**
 * 动态加载script
 * @param {string} url 
 * @param {string} callback 
 */
 export function loadScript(url, callback) {
    let script = document.createElement("script");
    if (script.readyState) {
      // IE
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // 其他浏览器
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }