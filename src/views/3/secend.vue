<template>
  <div>
    <h2>显示一个移动的圆</h2>
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>
<script>
import { Ball, Canvas, State, runAnimation } from "./secend";
export default {
  data() {
    return {
      canvasWidth: 400,
      canvasHeight: 400,
    };
  },
  mounted() {
    const dom = document.getElementById(
      "canvas",
      this.canvasWidth,
      this.canvasHeight
    );
    let canvas = new Canvas(dom, 400, 400);
    //   获取类的方法
    const actor1 = new Ball();
    const actor2 = new Ball(60, 60, "green", 20);
    canvas.addItem(actor1);
    canvas.addItem(actor2)
  },
};
</script>
<style lang="less">
#canvas {
  border: 1px solid #ccc;
}
</style>
