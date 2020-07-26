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
## HTTP
##### ISO-OSI七层网络模型
- 应用
- 表示
- 会话
- 传输 TCP
- 网络 internet IP
- 数据链路
- 物理

##### TCP/IP
- 流
- 端口
- require('net');

- 包
- IP地址
- libnet/libpcap

##### HTTP介绍
- 文本型协议，相对于二进制协议
- request
- response
- 一一对应
```
// request
POST/GET/PUT.... /HTTP/1.1
Host：
headers
// 空一行headers结束
body

// response
HTTP/1.1 200 OK  status line
Content-Type:text/html  headers
Data:
Connection:keep-alive
Transfer-Encoding:chunked
// 空一行
body
```

##### 简单服务端
```
const http = require('http');

http.createServer((req, res) => {
    let body = [];
    req.on('error', (err)=>{
        console.log(err);
    }).on('data', (chunk)=>{
        body.push(chunk.toString());
    }).on('end', ()=>{
        body = body.join('');
        console.log("body:", body);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        })
        res.end(" Hello World\n");
    })
}).listen(8088);
console.log('server started');
```

##### 实现一个HTTP请求
```
const net = require('net');

class Request {
    constructor(options){
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
            this.bodyText = Object.keys(this.body).map((key) => {
                return `${key}=${encodeURIComponent(this.body[key])}`
            }).join('&');
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }
    send(connection){
        return new Promise((resolve, reject)=>{
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, ()=>{
                    connection.write(this.toString());
                })
            }
            connection.on('data', (data)=>{
                console.log(data.toString());
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    connection.end();
                }
            })
            connection.on('error', (err)=>{
                reject(err);
                connection.end();
            })
        })
    }
    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
}
class ResponseParser {
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
    receive(string){
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char){
        if(this.current === this.WAITING_STATUS_LINE){
            if(char === '\r'){
                this.current = this.WAITING_HEADER_LINE_END;
            } else {
                this.statusLine += char;
            }
        } else if(this.current === this.WAITING_HEADER_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if(this.current === this.WAITING_HEADER_NAME){
            if(char === ":"){
                this.current = this.WAITING_HEADER_SPACE;
            } else if(char === "\r"){
                this.current = this.WAITING_HEADER_BLOCK_END;
                
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new TrunkedBodyParser();
                }
            } else{
                this.headerName += char;
            }
        } else if(this.current === this.WAITING_HEADER_SPACE){
            if(char === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if(this.current === this.WAITING_HEADER_VALUE){
            if(char === '\r'){
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = "";
                this.headerValue = "";
            } else {
                this.headerValue += char;
            }
        } else if(this.current === this.WAITING_HEADER_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if(this.current === this.WAITING_HEADER_BLOCK_END){
            if(char === '\n'){
                this.current = this.WAITING_BODY;
            }
        } else if(this.current === this.WAITING_BODY){
            this.bodyParser.receiveChar(char);
        }
    }
}
class TrunkedBodyParser{
    constructor(){
        this.WAITING_ENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char){
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        } else if(this.current === this.WAITING_LENGTH_LINE_END){
            if (char === '\n' && !this.isFinished) {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current === this.READING_TRUNK){
            this.content.push(char);
            this.length --;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if (this.current === this.WAITING_NEW_LINE){
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        } else if (this.current === this.WAITING_NEW_LINE_END){
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}
void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "111",
            age: "111"
        }
    });

    let response = await request.send();
    console.log(response);
}()
```
##### HTTP请求总结
- 设计一个HTTP请求的类
- Content-Type是一个必要字段，要有默认值
- body是KV格式
- 不同的Conten-Type 影响body的格式

##### send函数
- 在request的构造器中手机必要的信息
- 设计一个send函数，把请求真实的发送到服务器
- send函数应该是异步的，所以返回promise

##### 发送请求
- 设计支持已有的connetion或者自己新建connection
- 收到数据传给parser
- 根据parser的状态resolve promise

##### responseParse
- response 必须分段构造，所以我们要用一个responseParser来装配。
- responseParser分段处理responseText，我们用状态机来分析文本的结构。

##### BodyParser总结
- response的body根据Content-Type有不同的结构，我们会采用子parser的结构来解决问题
- 以trunkedbodyparser为例，我们同样用状态机来处理body的格式

## HTML parser
##### 文件拆分
- 方便管理，parser单独拆到文件中
- parser接受HTML文本作为参数，返回dom树

##### 用FSM实现HTML的分析
- 用FSM来实现HTML的分析
- 在HTML标准中，已经规定了HTML的状态
- TOY-browser部分完成

##### 解析标签
- 主要的标签有：开始标签，结束标签，自封毕标签
- 在这一步我们暂时忽略属性

##### 创建元素
- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 在标签结束状态提交标签token

##### 处理属性
- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
- 处理属性的方式跟标签类似
- 属性结束时，我们把属性加到标签的token上

##### 构建dom树
- 从标签构建dom树的基本技巧就是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封毕节点是为入栈后立刻出栈
- 任何元素的父元素都是它入栈前的栈顶

##### 将文本节点加到dom树
- 文本节点与自封闭标签处理类似
- 多个文本节点需要合并