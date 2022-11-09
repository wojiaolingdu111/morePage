
        import App from './index.vue'
        import "@/assets/js/common"
        import {createApp} from 'vue'
        import {getPageParameters, environment} from "../../config/pageConfig"
        // 判断环境
        environment();
        window.$originData = getPageParameters();
        document.title = window.$originData.orginParames.title || "";
        createApp(App).mount('#app');
        