<template>
  <div id="body">
    <div class="example">
      <h2>成品展示</h2>
      <div class="item1"></div>
    </div>
  </div>
</template>
<script>
import { Canvas, collidingBalls } from "./canvas";
export default {
  data() {
    return {
      canvasWidth: 400,
      canvasHeight: 400,
    };
  },
  methods: {},
  mounted() {
    // 成品演示
    const dom = document.getElementsByClassName("item1")[0];
    collidingBalls(400, 400, dom, 500);
  },
};
</script>
<style lang="less">
  #body{
    width: 100%;
    .example{
      position: relative;
      .item1{
        position: relative;
      }
    }
  }
</style>