#### 使用LL算法构建AST
##### 四则运算
- TokenNumber
    - 0-9的组合
- Operator
    - +-*/
- Whitespace
    - <\SP>
- LineTerminator
    - <\LF><\CR>

##### LL语法分析
- 按照产生式，从左到右扫描归并分析

##### 字符串分析算法
- 字典树
    - 大量高重复字符串的存储和分析 完全匹配
- KMP
    - 在长字符串里找模式 一个字符串是另一个字符串的部分，部分匹配
- Wildcard
    - 带通配符的字符串模式
- 正则
    - 字符串通用模式匹配
- 状态及
    - 通用的字符串分析
- LL LR
    - 字符串多层级结构分析