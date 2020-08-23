## HTML
#### 定义
- XML与SGML
- 到html5已经独立

##### DTD与XML namespace
- DTD是SGML规定的定义其子集的文档格式
- http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
- http://www.w3.org/1992/xhtml

##### 实体
- nbsp(no-break space)，多空格用white-space 或者 pre
- quot 引号
- amp &
- lt 小于
- gt 大于

#### 标签语义
- 以wikipedia为示例
- hgroup
- figure
    - img
    - figcaption
- strong 重要性强调 em 重音强调
- dfn
- samp
- pre
- code
- ...

#### HTML语法
##### 合法元素
- element <\tagname>...<\/tagname>
- text text
- comment <\!-- comments>
- documenttype <\!Doctype html>
- processingInstruction 预处理语法 <?a 1?>
- CDATA <\![CDATA[]]>

##### 字符引用
- &\#161;
- &\amp;
- &\lt;
- &\quot;
- ...

## 浏览器api
### DOM api
- node
    - element 元素与标签对应
        - HTMlElement
            - HTMLAnchorElement a
            - HTMLAppletElement
            - HTMLAreaElement
            - HTMLAudioElement
            - HTMLBaseElement
            - ...
        - SVGElement
            - SVGAElement
            - SVGAltGlyphElement
            - ...
    - Document 文档根节点
    - CharacterData 字符数据
        - Text 文本
            - CDATASection CDATA节点
        - Comment 注释
        - ProcessingInstructon 处理信息
    - DocumentFragment 文档片段
    - DocumentType 文档类型

##### 导航类操作
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibiling

- parentElement
- children
- firstElementChild
- lastElementChild
- nextElementSibiling
- previousElementSibiling

##### 修改操作
- appendChild
- insertBefore
- removeChild
- replaceChild

##### 高级操作
- compareDocumentPosition 是一个用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一节点，可用js的===代替
- cloneNode 复制一个节点，传入true则连同子节点做深拷贝

##### 事件api
- passive true不会调用preventDefault，调用控制台会报黄条。https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E7%9A%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD
- 冒泡和捕获

##### Range API
- 创建划范围
    - range.setStartBefore
    - range.setEndBefore
    - range.setStartAfter
    - range.setEndAfter
    - range.selectNode
    - range.selectNodeContents
```
var range = new Range();
range.setStart(element, 9);
range.setEnd(element, 4);

var range = document.getSelection().getRangeAt(0);

```
- 用
    - var fragment = range.extractContents() 取
    - range.insertNode() 加
```
// reverseChildren
<div id="a">
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>
<script>
let ele = document.getElementById("a");
function reversChildren(ele){
    let range = new Range();
    range.selectNodeContents(element);
    let fragment = range.extractContents();
    let l = fragment.childNodes.length;
    while(l-- >0){
        fragment.appendChild(fragment.childNodes[l]);
    }
    element.appendChild(fragment);
}
reversChildren(element);
</script>
```
### CSSOM
- document.styleSheets

##### rules
- document.styleSheets[0].cssRules
- dcoument.styleSheets[0].insertRule("p{color:pink;}",0) 0是位置
- document.styleSheets[0].removeRule(0)

##### rule
- CSSStyleRule
    - selectorText String
    - style K-V结构
- CSSCharsetRule
- CSSImportRule
- ...基本对应之前的css语法

##### getComputedStyle
- window.getComputedStyle(elt, pseudoElt);
    - elt想要获取的元素
    - pseudoElt 可选 伪元素
- 获取计算好的样式。animation的中间态这种。
- 可以访问到伪元素

#### CSSOM View
##### window
- window.innerHeight,window.innerWidth viewport
- window.outerWidth,window.outerHeight 浏览器
- window.devicePixelRatio 物理逻辑像素比
- window.screen 屏幕
    - window.screen.width
    - window.screen.height
    - window.screen.availWidth 去掉虚拟导航键的，不见得准。。
    - window.screen.availHeight

- window.open("about:blank", "_blanl","width=100,height,left=100,right=100")指定打开窗口的宽高位置
- moveTo(x,y)
- moveBy(x,y)
- resizeTo(x,y)
- resizeBy(x,y)

##### scroll
- scroll
    - scrollTop
    - scrollLeft
    - scrollWidth
    - scrollHeight
    - scroll(x,y)
    - scrollBy(x,y) 当前基础
    - scrollIntoView() 滚到可视区域
- window
    - scrollX
    - scrollY
    - scroll(x,y)
    - scrollBy(x,y)
##### layout
- getClientRects() 取每个盒
- getBoundingClientRect() 包住所有盒的大盒

### 其他
##### 来源
- khronos
    - WebGL
- ECMA
    - ECMAScript
- WHATWG
    - HTML
- W3C
    - webaudio
    - CG(Community Group)/WG(Working Group)