学习笔记
---
# 语言通识

## 按语法分类

#### 非形式语言
  - 中文,英文

#### 形式语言
  - 0型: 无限制文法

    ?::=?
  - 1型: 上下文相关文法

    ?\<A>?::=?\<B>?
  - 2型: 上下文无关文法

    \<A>::=?
  - 3型: 正则文法

    \<A>::=\<A>?

## BNF

- 尖括号扩起的名称标示语法结构名
- 语法结构分为基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称为终结符
  - 复合结构称为非终结符
- 引号和中间的字符标示终结符
- 可以有括号
- *表示重复多次
- ｜表示或
- +表示至少一次

## 图灵完备

就是可以用来解决计算可以解决的问题就是图灵完备

- 命令式 - 图灵机
  - goto
  - if和while
- 声明式 - lambda
  - 递归

### 标记语言
- SGML
- HTML
- XML
- XHTML


### 编程语言
#### 声明式
	
##### 函数式	
- FP
- Haskell
- Scala
- Erlang
- Elixir
- Clean
- Miranda
- Logo
- Wolfram语言(Mathematica)
- Clojure
- Common Lisp
- Lisp
- Racket
- Scheme
- ML
- Standard ML
- OCaml
- F#

##### 逻辑式	
- Prolog

#### 指令式

##### 结构化	
- BASIC
- Fortran
- C
- Pascal
- Go
- Smalltalk
- Java
- C#
- Objective-C
- C++
- Eiffel
- Python
- Ruby
- Rust
- Swift

##### 非结构化	
- COBOL
- SNOBOL

#### 元编程

##### 泛型
- C++
- D
- Ada
- C#
- Delphi
- Eiffel
- Java
- Swift
- Visual Basic .NET

##### 反射化
- C#
- ECMAScript
- Java
- Perl
- PHP
- Python
- R
- Ruby

## 类型

- 动态
  - 在用户设备/服务器上
  - 产品实际运行时
  - Runtime
- 静态
  - 在程序员设备上
  - 产品开发时
  - Compiletime

# 重学Javascript

## 类型
### Number: 

#### IEEE 754 Double Float 64位

- 1 Sign 符号位

- 11 Exponent 指数位

- 52 Fraction 精度位

例：

6 = 0 符号位

10000000001 指数位

1100000... 精度位

10000000000 基准 2^0

指数位去基准

指数位：2^1 = 2

精度位：1.1000......

精度位*指数位

1.1*2^2

1.5*4 = 6

- 小数精度位有损失，小于Number.EPSILON，差值比较 0.1+0.2-0.3<绝对值最小的精度比较。

#### 其他

0b10二进制

0o0-7八进制

0x0-F十六

1.toString()，1.是数字。

### String
  - ASCII字符集
  - unicode字符集

  UTF-8 16编码
  
### Boolean
  true false 保留字

### null
  type of 是Object Object的原型

### undifined
  可被赋值 void 0代替

### Object
对象

- 不应该受到语言描述的干扰
- 在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则。

语法

- {}.[]Object.defineProperty
- Object.create/Object.setPrototypeOf/Object.getPrototypeOf
- new/class/extends
- new/function/prototype

### Symbol