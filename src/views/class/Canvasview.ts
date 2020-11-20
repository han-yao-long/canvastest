
import { Point } from "./Point"
export class Canvasview {
    /** canvas 视图 */
    protected readonly canvasView: HTMLCanvasElement;
    /** 宽度 */
    get width(): number {
        return this.canvasView.width;
    }

    /** 高度 */
    get height(): number {
        return this.canvasView.height;
    }

    /** 可否进行平移操作 */
    moveable = true;

    /** 原点坐标 */
    private _origin = new Point();
    get origin(): Point {
        return this._origin;
    }
    set origin(v: Point) {
        if (!this.moveable) {
            return;
        }
        this._origin.x = v.x;
        this._origin.y = v.y;
        // this._needDraw = true;
    }
    /** 缩放比例 */
    private _scale: number = 1;
    get scale(): number {
        return this._scale;
    }
    set scale(v: number) {
        this._scale = v;
    }

    /** 鼠标滚轮缩放速度 */
    wheelZoom = 1.05;
    /** 最小缩放比例 */
    minScale = 0.000001;
    /** 最大缩放比例 */
    maxScale = 1000000;
    constructor(id: string) {
        this.canvasView = document.getElementById(id) as HTMLCanvasElement;;  //canvas 上下文
        // 绑定事件
        this.event(this.canvasView)
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
    event(element: HTMLCanvasElement) {
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