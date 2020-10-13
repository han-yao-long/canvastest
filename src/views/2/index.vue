<template>
  <div>
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <img :src="this.img2" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      canvasWidth: 800,
      canvasHeight: 600,
      canvascontext: null,
      img:
        "data:image/png;base64,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",
      img2:
        "/image-service/common/image_get?systemId=dataPlatform&key=1602487995304.jpg",
    };
  },
  methods: {
    // 获取canvas绘制上下文
    initCanvas() {
      var canvas = document.getElementById("canvas");
      this.canvascontext = canvas.getContext("2d");
    },
    // 绘制线
    drawLine() {
      if (!this.canvascontext) return;

      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(300, 300); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#123123";
      this.canvascontext.stroke();

      //canvas中的绘制方法（如stroke, fill），都会以“上一次beginPath”之后的所有路径为基础进行绘制。
      this.canvascontext.beginPath();

      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(300, 400); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#DDD";
      this.canvascontext.stroke();
    },

    // 绘制矩形

    drawRect(x, y, width, height) {
      //   this.canvascontext.moveTo(x, y);
      //   this.canvascontext.lineTo(x + width, y);
      //   this.canvascontext.lineTo(x + width, y + height);
      //   this.canvascontext.lineTo(x, y + height);
      //   this.canvascontext.lineTo(x, y);
      //   this.canvascontext.lineWidth = 10;
      //   this.canvascontext.strokeStyle = "#DDD";

      //   this.canvascontext.stroke();
      //优化方案

      //   this.canvascontext.lineWidth = 10;
      //   this.canvascontext.strokeStyle = "#DDD";
      //   this.canvascontext.rect(x, y, width, height);
      //   this.canvascontext.stroke();

      //   //填充矩形
      //   this.canvascontext.lineWidth = 10;
      //   this.canvascontext.strokeStyle = "#DDD";
      //   this.canvascontext.fillRect(x, y, width, height);
      //   //画边框
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#DDD";
      this.canvascontext.strokeRect(x, y, width, height); // strokeRect() = fillRect() + stroke()
    },

    //   测试save reStore 的作用
    saveAndreStore() {
      // 开始绘制矩形
      this.canvascontext.fillStyle = "red";
      this.canvascontext.strokeStyle = "blue";
      this.canvascontext.fillRect(20, 20, 100, 100);
      this.canvascontext.strokeRect(10, 10, 120, 120);
      this.canvascontext.fill();
      this.canvascontext.stroke();
      // 保存当前Canvas状态
      //   save 对上面 fillStyle 和strokStyle做了保存（推入栈中）
      this.canvascontext.save();
      // 绘制另一个矩形
      this.canvascontext.fillStyle = "orange";
      this.canvascontext.strokeStyle = "green";
      this.canvascontext.fillRect(150, 20, 100, 100);
      this.canvascontext.strokeRect(140, 10, 120, 120);
      this.canvascontext.fill();
      //   stroke 对之前save的数据保存做了释放
      this.canvascontext.stroke();
      // // 恢复第一个矩形的状态
      this.canvascontext.restore();
      //   // // 绘制两个矩形
      this.canvascontext.fillRect(20, 140, 50, 50);
      this.canvascontext.strokeRect(140, 140, 50, 50);
    },

    // canvas 旋转平移坐标空间
    translateCanvas(dx, dy) {
      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(500, 50); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#123123";
      this.canvascontext.stroke();
      this.canvascontext.save();
      this.canvascontext.translate(dx, dy);

      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(500, 50); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "red";
      this.canvascontext.stroke();
      this.canvascontext.restore();
      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(1000, 50); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "red";
      this.canvascontext.stroke();
    },

    // canvas 旋转坐标空间
    rotateCanvas() {
      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(500, 50); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#123123";
      this.canvascontext.stroke();
      this.canvascontext.save();

      this.canvascontext.translate(200, 200);
      this.canvascontext.rotate((Math.PI * 1) / 2);
      this.canvascontext.moveTo(50, 50); // 状态设置
      this.canvascontext.lineTo(500, 50); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#123123";
      this.canvascontext.stroke();

      this.canvascontext.restore();
      this.canvascontext.moveTo(50, 80); // 状态设置
      this.canvascontext.lineTo(800, 80); // 状态设置
      this.canvascontext.lineWidth = 10;
      this.canvascontext.strokeStyle = "#123123";
      this.canvascontext.stroke();
    },

    /**
     *
     * canvas drawImage
     */
    Imgcanvas() {
      const img = new Image();
      img.src = this.img2;
      this.canvascontext.drawImage(img, 100, 100);
      // if (this.isUrlIdentical(imgSrc)) {
      // this.canvascontext.drawImage(img, 100, 100);
      img.onload = (e) => {
        // @ts-ignore
      //  alert(JSON.stringify(e));
      //   const imgSrc = e.path[0].src;
      //   alert(JSON.stringify(imgSrc));
        // if (this.isUrlIdentical(imgSrc)) {
        this.canvascontext.drawImage(img, 100, 100);
        // }
      };
    },
  },
  mounted() {
    this.initCanvas();
    // 绘制直线
    // this.drawLine();
    // 绘制矩形
    // this.drawRect(100, 100, 200, 200);
    // 测试saveAndStore
    // this.saveAndreStore();
    // 测试translate
    // this.translateCanvas(100, 100);
    // 测试旋转
    // this.rotateCanvas();
    // 绘制图片
    this.Imgcanvas();
  },
};
</script>