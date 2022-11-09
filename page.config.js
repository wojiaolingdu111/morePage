const fs = require("fs");
const pageJSON = require("./src/config/page.json");

/**
 * 生成page所有页面
 */
class pageConfig {
  constructor() {
    this.config = {
      path: process.cwd().split("\\").join("/"),
      parameters: this.getArgv(),
    };
    this.output = {};
    this.isOrNot(); // 页面是否存在
    this.getPagename(this.config.path + "/src/view");
  }
  getArgv() {
    const argv = {};
    process.argv.splice(2, process.argv.length).map(v => {
      const k = v.split("=");
      argv[k[0]] = k[1];
    });
    return argv;
  }
  /**
   * 判断page.json中的页面是否存在，如果不存在则创建该文件
   */
  isOrNot() {
    const keys = Object.keys(pageJSON);
    const baseUrl = this.config.path + "/src/view";
    for (let i = 0; i < keys.length; i++) {
      const v = keys[i];
      const baseU = baseUrl + "/" + v;
      const nameVue = baseU + "/index.vue";
      const nameJs = baseU + "/index.js";
      const isDir = fs.existsSync(baseU);
      if (!isDir) fs.mkdirSync(baseU);
      const isVue = fs.existsSync(nameVue);
      const isJs = fs.existsSync(nameJs);
      if (isVue && isJs) continue;

      const templateVue = `
        <template>
            <div class="${v}"></div>
        </template>
        <script setup>
            // import { onMounted, reactive } from "vue";
            // import { isIpad, isIpod, isIphone } from "../../utils/isTerminal";
            /**
             * window.$originData.orginParames.title 页面标题
             * window.$originData.orginParames.parameters 固定参数值
             * window.$originData.urlParames url参数
             */
            console.log(window.$originData)
        </script>
        <style>
            .${v} {
                width: 100vw;
                height: 100vh;
            }
        </style>
        `;
      const templateJS = `
        import App from './index.vue'
        import "@/assets/js/common"
        import {createApp} from 'vue'
        import {getPageParameters, environment} from "../../config/pageConfig"
        // 判断环境
        environment();
        window.$originData = getPageParameters();
        document.title = window.$originData.orginParames.title || "";
        createApp(App).mount('#app');
        `;
      if (!isVue) fs.writeFileSync(nameVue, templateVue);
      if (!isJs) fs.writeFileSync(nameJs, templateJS);
    }
  }
  /**
   * 获取页面列表
   */
  getPagename(viewPath) {
    const dirList = viewPath ? fs.readdirSync(viewPath) : [];
    if (!dirList.length) return;
    for (let i = 0; i < dirList.length; i++) {
      const path = viewPath + "/" + dirList[i];
      const stat = fs.lstatSync(path);
      if (!pageJSON[dirList[i]] && stat.isDirectory()) {
        this.removePage(path);
        continue;
      }
      this.output[dirList[i]] = {
        entry: path + "/index.js",
        template: "public/index.html",
        path: dirList[i],
        config: pageJSON[dirList[i]],
        filename: dirList[i] + ".html",
      };
    }
  }
  /**
   * 删除文件夹以及内部文件
   */
  removePage(path) {
    const dirList = path ? fs.readdirSync(path) : [];
    for (let i = 0; i < dirList.length; i++) {
      const fileName = path + "/" + dirList[i];
      const stat = fs.lstatSync(fileName);
      if (stat.isDirectory()) this.removePage(fileName);
      else fs.unlinkSync(fileName);
    }
    fs.rmdirSync(path);
  }
}

module.exports = new pageConfig();
