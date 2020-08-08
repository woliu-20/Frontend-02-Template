## CSS
### 总论
##### CSS总体结构(2.1)
- @charset
- @import
- rules (可出现多个，无顺序要求)
    - @media
    - @page
    - rule

##### @规则
- @charset https://www.w3.org/TR/css-syntax-3/
- @import https://www.w3.org/TR/css-cascade-4/
- @media https://www.w3.org/TR/css3-conditional/
- @page https://www.w3.org/TR/css-page-3/
- @counter-style https://www.w3.org/TR/css-counter-style-3/
- @keyframes https://www.w3.org/TR/css-animations-1/
- @fontface https://www.w3.org/TR/css-fonts-3/
- @supports https://www.w3.org/TR/css3-conditional/
- @namespace https://www.w3.org/TR/css-namespaces-3/

- 历史 document,color-profile,font-feature

##### 规则
- selector https://www.w3.org/TR/selectors-3/ https://www.w3.org/TR/selectors-4/
    - selector_group
    - selector
        - \>
        - <\sp>
        - \+
        - ~
    - simple_selector
        - type
        - []
        - *
        - .
        - #
        - :
        - ::
        - :not
- key
    - properties
    - variables https://www.w3.org/TR/css-variables/
- value https://www.w3.org/TR/css-value-4/
    - calc
    - number
    - length
    - ...

### 选择器
#### 选择器语法
##### 简单选择器
- \* 通用选择器，选择任何元素
- div svg|a  type selector 类型选择器。 namespace|
- .class class选择器
- #id id选择器
- \[attr=value] 属性选择器
- :hover 伪类
- ::before 伪元素


##### 复合选择器
- <简单选择器><简单选择器><简单选择器>   与的关系
- *或者div必须写在最前，伪类伪元素写在最后
##### 复杂选择器
- <符合选择器><\sp><复合选择器> 子孙
- <符合选择器>">"<复合选择器> 子
- <符合选择器>"~"<复合选择器> 后续兄弟
- <符合选择器>"+"<复合选择器> 相邻兄弟
- <符合选择器>"||"<复合选择器> css level4 列

##### 优先级
- \[0,2,1,1] https://www.w3.org/TR/selectors-3/#specificity
- S = 0*N3 + 2*N2 + 1*N1 + 1

##### 伪类
- 链接/行为
    - :any-link
    - :link
    - :visited
    - :hover
    - :active
    - :focus
    - :target
- 树结构
    - :empty
    - :nth-child()
    - :nth-last-child();
    - :first-child :last-child :only-child
- 逻辑
    - :not(简单选择器)
    - :where :has   css leve4

##### 伪元素
- ::before
- ::after
- ::first-line
    - font
    - color
    - background
    - word-spacing
    - letter-spacing
    - text-decoration
    - text-transform
    - line-height
- ::first-letter
    - font
    - color
    - background
    - text-decoration
    - text-transform
    - letter-spacing
    - word-spacing
    - line-height
    - float
    - vertical-align
    - 盒模型系列：margin padding border
```
    <div>
        <::before>
        content
        <::after>
    </div>
    <div>
        <::first-letter>c</::first-letter>ontent
    </div>
```
