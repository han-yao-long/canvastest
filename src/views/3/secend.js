
export class Canvas {
    constructor(canvasDom, w, h) {
        this.ctx = canvasDom.getContext('2d');
        this.actorList = [];
        this.width = w;
        this.height = h;
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
                item.panter()
            })
        }
        // 遍历
        this.requestAnimationFrame()
    }

    /**
     * 清空
     */
    clearDisplay() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, .4)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    // additem
    addItem(item) {
        item.view = this;
        this.actorList.push(item)
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
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        // 移动圆
        this.move()
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