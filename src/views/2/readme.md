# canvas 基本操作

注：
+ canvas 坐标轴在左上角
+ canvas中的绘制方法（如stroke, fill），都会以“上一次beginPath”之后的所有路径为基础进行绘制。
+ save 和 restore 会对当前状态做保存和释放，比如 颜色，平移转换等
+ translate 会改变canvas的坐标远点；所以用之前记得用save保存之前的坐标系

+ rotate 会改变canvas的坐标旋转角度；所以用之前记得用save保存之前的坐标系