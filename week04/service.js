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
        res.end(`<html mm=a>
<head>
    <style>
        body div #myid{
            widht: 100px;
            background-color: #ff0099;
        }
        body div img{
            width: 30px;
            background-color: rgba(255,255,100,0.5)
        }
    </style>
</head>
<body>
    <div>
        <img id="myid" data='1111' />
        <img />
    </div>
</body>
</html>`);
    })
}).listen(8088);
console.log('server started');

