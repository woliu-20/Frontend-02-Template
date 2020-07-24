## 浏览器工作原理
#### 浏览器
    URL --> (HTTP) HTML --> (parse) DOM --> (css computing) DOM with CSS --> (layout) DOM with postion --> (render) Bitmap

#### 状态机
##### 有限状态机
- 每一个状态都是一个机器
    - 在每一个机器里，我们可以做计算、存储、输出……
    - 所有的这些机器接受的输入是一致的
    - 状态机的每个机器本身没有状态，如果我们用函数来表示的话，他应该是纯函数（无副作用）
- 每一个机器知道下一个状态
    - 每个机器都有确定的下一个状态（Moore）
    - 每个机器根据输入决定下一个状态（Mealy）

##### JS中的有限状态机（Mealy）
```
// 每个函数都是一个状态
function state(input){// 参数是输入
    // 可以自由编写代码，处理每个状态的逻辑
    return next;// 返回值作为下一个状态
}
// 调用
while(input){
    // 获取输入
    state = state(input);// 把状态机的返回值作为下一个状态
}
```
示例

```
function match(str){
    let state = start;
    for (const c of str) {
        state = state(c);
    }
    return state === end;
}
function end(c) {
    return end;
}
function start(c) {
    if (c === "a") {
        return foundA;
    }else{
        return start;
    }
}
function foundA(c) {
    if (c === "b") {
        return foundB;
    }else{
        // reconsume
        return start(c);
    }
}
function foundB(c) {
    if (c === "a") {
        return foundA2;
    }else{
        return start(c);
    }
}
function foundA2(c) {
    if (c === "b") {
        return foundB2;
    }else{
        return start(c);
    }
}
function foundB2(c) {
    if (c === "a") {
        return foundA3;
    }else{
        return foundB(c);
    }
}
function foundA3(c) {
    if (c === "b") {
        return foundB3;
    }else{
        // reconsume
        return start(c);
    }
}
function foundB3(c) {
    if (c === "x") {
        return end;
    }else{
        return foundB2(c);
    }
}
console.log(match("ababababx"));
```

