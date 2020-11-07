let http = require("http");
let fs = require("fs");
let archiver = require("archiver");
let child_process = require("child_process");
let querystring = require("querystring");

//1 打开 http://github.com/login/oauth/authorize

child_process.exec(`open http://github.com/login/oauth/authorize?client_id=Iv1.de6b7b2e6496e440`)

//3 创建server，接受token，后点击发布

http.createServer(function (req, res) {
    let query = querystring.parse(req.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);
}).listen(8083)

function publish(token) {
    let request = http.request({
        hostname: "127.0.0.1",
        port: 8082,
        method: "POST",
        path: "/publish?token="+ token,
        headers: {
            "Content-Type": "application/octet-stream",
            // "Content-Length": stats.size
        }
    }, res => {
        console.log(res);
    });
    const archive = archiver("zip", {
        zlib: {
            level: 9
        }
    })
    archive.directory("./sample/", false)
    archive.finalize();
    archive.pipe(request);
    // file.on('end', () => request.end());
}
// fs.stat("./sample/sample.html", (err, stats) => {
//     
// })

