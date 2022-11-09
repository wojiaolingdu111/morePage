<template>
  <div class="WorldCup">
    <van-image
      width="100"
      height="100"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
  </div>
</template>
<script setup>
// import { onMounted, reactive } from "vue";
// import { isIpad, isIpod, isIphone } from "../../utils/isTerminal";
/**
 * window.$originData.orginParames.title 页面标题
 * window.$originData.orginParames.parameters 固定参数值
 * window.$originData.urlParames url参数
 */
console.log(window.$originData);
</script>
<style>
.WorldCup {
  width: 100vw;
  height: 100vh;
}
</style>
