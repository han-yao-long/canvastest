

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