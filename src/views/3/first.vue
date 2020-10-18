<template>
  <div>
    <h2>显示一个圆</h2>
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>
<script>
import { Ball, Canvas } from "./first";
export default {
  data() {
    return {
      canvasWidth: 400,
      canvasHeight: 400,
    };
  },
  mounted() {
    const dom = document.getElementById("canvas");
    let canvas = new Canvas(dom);
    //   获取类的方法
    const actor = new Ball();
    canvas.drawCircle(actor);
  },
};
</script>
<style lang="less">
    #canvas{
        border: 1px solid #ccc;
    }
</style>
