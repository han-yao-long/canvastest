<template>
  <div>
    <canvas tabindex="0" id="canvas" width="400" height="400"></canvas>
  </div>
</template>
<script>
import { Canvas, Ball } from "./index";
export default {
  data() {
    return {};
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
    canvas.addItem(actor2);
  },
};
</script>