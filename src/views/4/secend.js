
export class Canvas {
    constructor(canvasDom, w, h) {
        this.ctx = canvasDom.getContext('2d');
        this.actorList = [];
        this.width = w;
        this.height = h;
        this.scale = 1;
        this.isOnmouseDown = false;
        this.omMouseDownPosi = {};// 鼠标按下坐标
        /** 原点 */
        this.position = {
            x: 0,
            y: 0
        }
        this.movePoint = {   //鼠标移动事件
            x: 0,
            y: 0
        }
        // 绑定事件
        this.event(canvasDom)
        // 根据帧动画绘制
        this.requestAnimationFrame();
    }

    /**
     * 循环绘制
     */
    requestAnimationFrame() {
        // 切记必须加bind，改变this指向
        window.requestAnimationFrame(this.loop.bind(this));
    }

    //
    loop() {
        // 清空画板
        this.clearDisplay();
        // 遍历插入的对象 对其进行绘制
        if (this.actorList.length) {
            this.actorList.forEach(item => {
                this.ctx.save();
                this.translatePosition(this.scale, 0, 0, this.scale, this.position.x, this.position.y);
                item.panter()
            })
        }
        // 遍历
        this.requestAnimationFrame()
    }
    /**
     * @param element canvas事件绑定
     */
    event(element) {
        element.onclick = this.onClick.bind(this);
        element.onwheel = this.onMouseWheel.bind(this);
        element.onmousedown = this.onMouseDown.bind(this);
        element.onmousemove = this.onMouseMove.bind(this);
        element.onmouseup = this.onMouseUp.bind(this);
    }

    //    点击事件
    onClick() {
        console.log(this)
    }
    // 鼠标滚轮事件
    onMouseWheel(e) {
        // // 改变时变化缩放比例
        if (e.deltaY < 0) {
            this.scale = this.scale + 0.1;
        } else if (e.deltaY > 0) {
            this.scale = this.scale - 0.1;
        };
        // 注 放大必须大于 1；

    }

    /**
     * 缩放视图时计算视图的位置与缩放比例
     *
     * @param zoom        缩放比例
     * @param x0          缩放计算的中心点 X 坐标
     * @param y0          缩放计算的中心点 Y 坐标
     */
    scaleByPoint(zoom, x0, y0) {
        if (!this.scalable) {
            return;
        }

        let z = zoom;
        /**
         * 缩放比例在最小比例和最大比例范围内
        */
        if (this.scale * zoom >= this.maxScale) {
            z = this.maxScale / this.scale;
            this.scale = this.maxScale;
        } else if (this.scale * zoom <= this.minScale) {
            z = this.minScale / this.scale;
            this.scale = this.minScale;
        } else {
            this.scale *= zoom;
        }

        this.origin.x = x0 - (x0 - this.origin.x) * z;
        this.origin.y = y0 - (y0 - this.origin.y) * z;
    } // Function scaleByPoint()

    onMouseDown(e) {
        this.omMouseDownPosi = {
            x: e.offsetX,
            y: e.offsetY
        };
        console.log(this.omMouseDownPosi)
        this.isOnmouseDown = true;
    }
    onMouseMove(e) {
        if (this.isOnmouseDown && this.ctx) {
            this.position.x = e.offsetX - this.omMouseDownPosi.x + this.position.x;
            this.position.y = e.offsetY - this.omMouseDownPosi.y + this.position.y;
            this.omMouseDownPosi.x = e.offsetX;
            this.omMouseDownPosi.y = e.offsetY;
        }
        this.movePoint = {
            x: e.offsetX,
            y: e.offsetY
        }
    }
    onMouseUp(e) {
        this.isOnmouseDown = false;
        this.omMouseDownPosi.x = 0;
        this.omMouseDownPosi.y = 0;
        this.ctx.restore()
    }
    /**
     * 清空
     */
    clearDisplay() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        // this.translate(0,0);
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    // additem
    addItem(item) {
        item.view = this;
        this.actorList.push(item)
    }

    /**
     * 设置缩放比例
     */
    setScale(x, y) {
        const foolX = Math.floor(x * 100) / 100;
        const fooly = Math.floor(y * 100) / 100;
        this.ctx.scale(foolX, fooly);
    }

    /**
     *  拖动位移
     */
    translatePosition(a = 1, b = 0, c = 0, d = 1, dx, dy) {
        this.ctx.transform(a, b, c, d, dx, dy);
    }
}

// 绘制圆的类
export class Ball {
    constructor(x = 20, y = 20, color = 'red', radius = 10) {
        this.color = color;
        this.position = { x: x, y: y };
        this.radius = radius;
        this.view = null;
        this.movePoint = {
            x: 1,
            y: 2
        }
    }
    // 绘制
    panter() {
        if (!this.view) return;
        const ctx = this.view.ctx;
        // ctx.scale(.5, .5);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        // 移动圆
        // this.move()
    }

    // 移动
    move() {
        if (!this.view) return;

        if (this.position.x < 0 || this.position.x > this.view.width) {
            this.movePoint.x = -this.movePoint.x;
            this.movePoint.y = this.movePoint.y
        }
        if (this.position.y < 0 || this.position.y > this.view.height) {
            this.movePoint.x = this.movePoint.x;
            this.movePoint.y = -this.movePoint.y
        }
        this.position.x = this.position.x + this.movePoint.x;
        this.position.y = this.position.y + this.movePoint.y
    }
}