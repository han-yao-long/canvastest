export class Point {
    /** X轴坐标 */
    x: number;
    /** Y轴坐标 */
    y: number;

    /**
    * 构造函数(重载实现)
    *
    * @param x     X 轴坐标 | 点 | undefined
    * @param y     Y 轴坐标
    */
    constructor(x?: number | Point, y?: number) {
        if (x == undefined) {
            this.x = 0;
            this.y = 0;
        } else if (x instanceof Point) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x as number;
            this.y = y as number;
        }
    }

    /**
    * 直线得长度
    *
    * @return 返回 |X| + |Y|
    */
    manhattanLength(): number {
        // noinspection JSSuspiciousNameCombination
        return Math.abs(this.x) + Math.abs(this.y);
    }

    /**
     * 平移点
     *
     * @param dx    X 轴位移
     * @param dy    Y 轴位移
     */
    translate(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

}