### CSS排版
##### 盒（Box）
- 排版和渲染的基本单位
- 盒模型 boxsizing contentbox width是content，border-box width包含padding和border。

##### 正常流
- 收集盒和文字进行
- 计算盒和文字在行中的排布
- 计算行的排布
- BFC(block-level-formatting-context) 从上到下
- IFC(inline-level-formatting-context) 从左到右

##### 行级排布
- baseline
- text

##### 行模型
- text-top text-bottom字体大小和文字决定
- line-top line-bottom
- baseline
- inline-block会根据文字的baseline，推荐手动设置。

##### 块级排布
- float 影响行排布 可堆叠，clear 找空行排
- BFC margin collapse，以大的为准，margin是留白。

##### block
- block container 里面有BFC
    - block
    - inline-block
    - table-cell
    - flex item
    - grid cell
    - table-caption
- block-level Box 外面有BFC
    - block level
    - inline level
    - display: run-in 跟上一个元素。。

- block box = block container + block-level box 内外都有BFC设立BFC
##### BFC合并
- block box && overflow：visible
- 影响float和margin collapse

##### flex
- 收集盒进行
    - 根据主轴尺寸，把元素分进行
    - 设置了no-warp，强行第一行
- 计算盒在主轴方向的排布
    - 找出所有flex元素
    - 把主轴方向的剩余尺寸，按比例分配给元素
    - 若剩余空间为附属，所有flex元素为0，等比压缩剩余元素
- 计算盒在交叉轴方向的排布
    - 根据每一行中的最大尺寸计算行高
    - 根据行高flex-align和item-align，确定元素具体位置

##### 动画
- @keyframes定义
    - from to
    - %
    - 关键帧中使用transition定义timing-funciton，可以更细致。。
- animation
    - name keyframes
    - duration 时长
    - timing-function 时间曲线
    - delay 延迟
    - iteration-count 次数
    - direction 方向
- transition
    - property 属性
    - duration 时长
    - timing-function 曲线
    - delay 延迟

##### 三次贝塞尔曲线
- https://cubic-bezier.com/
- x时间 y进度
- 可以拟合抛物线

##### 颜色
- CMYK印刷，RGB光
- HSL HSV，Hue色相，Saturation纯度，Lightness亮度，Value指明度。

##### 绘制
- 几何图形
    - border
    - box-shadow
    - border-radius
- 文字
    - font
    - text-decoration
- 位图
    - background-image

##### 技巧
- data uri+svg