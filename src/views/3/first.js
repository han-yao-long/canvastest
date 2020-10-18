
export class Canvas {
    constructor(canvasDom) {
        this.ctx = canvasDom.getContext('2d');
    }

    /**
     * 绘制圆
     *
     * @params actor 圆的 item 类
     */
    drawCircle(actor) {
        this.ctx.beginPath();
        this.ctx.arc(actor.position.x, actor.position.y, actor.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fillStyle = actor.color;
        this.ctx.fill();
    }
}

// 绘制圆的类
export class Ball {
    constructor(x = 20, y = 20, color = 'red', radius = 10) {
        this.color = color;
        this.position = { x: x, y: y };
        this.radius = radius;
    }
}