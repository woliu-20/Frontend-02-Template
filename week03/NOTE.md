学习笔记
---

## JS表达式


#### 运算符和表达式


##### Menber
- a.b
- a[b]
- foo\`string`
- super.b
- super['b']
- new.target
- new Foo()

##### Reference
- Object
- Key

- delete
- assign

##### Call

- foo()
- super()
- foo()['b']
- foo().b
- foo()\`abc`

##### left handside & right handside
- 只有能放到等号左边才是左表达式。
- 除了左表达式都是右表达式。

##### update
- a++
- a--
- --a
- ++a

##### unary
- delete a.b
- void.foo()
- typeof a
- +a
- -a
- ~a
- !a
- await a

##### exponental
- ** 3**(2**3)右结合

##### multiplicative
- */%

##### additive
- +-

##### shift
- << >> >>>

##### relationship
- < > <= >= instanceof in

##### rquality
- == != === !==

##### bitwish
- &^|

##### logical
- && || 短路

##### conditional
- ?: 短路

### 类型转换
- 少用 == ，尽量用===或者先手动转换
- Object转number valueof 转string valueof tostring 转boolean true

##### unboxing
- topremitive
- tostring vs valueof
- symbol.toprimitive

```
var o = {
    toString(){return "2"}
    valueof(){return 1},
    [Symbol.toPrimitive](){return 3}
}

var x = {}
x\[o] = 1
console.log("x" + o)
```
- 定义了\[Symbol.toPrimitive]优先调用
- 用数字优先valueof
- 用字符串优先tostring

##### boxing
- Number
- String
- Boolean
- Symbol
- typeof区分

## Statement

##### completion record
- 存储语句完成的结果
- \[[type]]: normal break continue return or throw
- \[[value]]: 基本类型
- \[[target]]: label 配合break continue

#### 简单语句（不会再容纳其他语句）
- expression expression
- empty ;
- debugger debugger
- throw throw
- continue continue
- break break
- return return

#### 复合语句
- block
- if
- switch(推荐if代替)
- iteration
- with(不推荐)
- labelled
- try try catch finally(括号语句定义不可省略)

##### 标签 循环 break continue
- labelled
- iteration
- continue
- breakstatement
- switch
\[[type]]: break continue
\[[value]]:--
\[[target]]:label

##### try
\[[type]]: return
\[[value]]: --
\[[target]]: label
- return不打断finally一样执行

### 声明 Declaration
##### FunctionDeclaration&GeneratorDeclaration&AsyncFunctionDeclaration&AsyncGeneratorDeclaration&VariableStatement
- function
- funciton *
- async function
- async function *
- var

##### ClassDeclaration&LexicalDeclaration
- class
- const
- let

##### pre-process
```
var a = 2;
void function(){
    a= 1;
    return;
    var a;
}
console.log(a);
// 2 var a 会被预处理提前
```

```
var a = 2;
void function(){
    a= 1;
    return;
    var a;
}
console.log(a);
// 抛错
```

##### 作用域
```
var a = 2;
void function(){
    a= 1;
    {
        var a
    }
}()
console.log(a);
// 2 
```
```
var a = 2;
void function(){
    a= 1;
    {
        const a;
    }
}()
console.log(a);
// 抛错
```
## 执行运行时
#### 宏任务&微任务
```
// 整体宏任务
var x=1;
var p = new Promise(resolve => resolve());
p.then(()=>x=3);
x=2;

// 微任务1
x=1
p=...
x=2
// 微任务2
x=3
```

#### 事件循环

wait getcode exeute 循环

## 函数调用
```
var y = 2;
fucntion foo2(){
    console.log(y);
}
export foo2;
```

```
import {foo2} from "foo.js";
var x=1;
function foo(){
    console.log(x);
    foo2();
    console.log(x);
}
export foo;
```

```
improt {foo} from "foo.js"
var i = 0;
console.log(i);
foo();
console.log(i);
i++;
```

- 栈式调用
- 每一个stack执行信息保存 execution context(执行上下文)
- 栈顶：running execution context

#### execution context
- code evaluation state
- Function
- Script or Module
- Generator
- Realm
- LexicalEnvironment
- VariableEnvironment

##### LexicalEnvironment
- this
- new.target
- super
- 变量

##### VariableEnvironment
- var

##### Environment Reacord
- Declarative Environment Records (Function Environment Records&Module Environment Records)
- Global Environment Records
- Object Environment Records

##### closure
```
var y = 2;
function foo2(){
    var z = 3;
    return ()=>{
        console.log(y,z)
    }
}
var foo3 = foo2();
export foo3;
// Function:foo3
// Environment Record: z:3 this:global➡️箭头函数 & Environment Record: y:2
// 旧版本 scope chain
```

##### Realm
- 这个听的云里雾里，个人理解就是提供各种功能对象的原型组成的这个集合就是realm
- 在js引擎实例里，所有的内置对象会被放入一个realm里，不同的实例之间是完全互相独立的。
- 不同的realm之间可以传递对象，prototype不一致。
