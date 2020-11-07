let http = require("http");
let https = require("https");
let unzipper = require("unzipper");
let querystring = require("querystring");
// 2 auth路由：接受code，用code+client_id+client_secret换token

function auth(req, res) {
    let query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    console.log(query);
    getToken(query.code, function (info) {
        console.log(info);
        res.write(`<a href="http://127.0.0.1:8083/?token=${info.access_token}">publish</a>`)
        res.end();
    });
}

function getToken(code, callback) {
    let request = https.request({
        hostname: "github.com",
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.de6b7b2e6496e440&client_secret=e83d67c51ab29802e0849385b9d6e9a57cdb89b8`,
        port: 443,
        method: "POST"
    }, function (res) {
        let body = "";
        res.on("data", chunk => {
            body += chunk.toString();
        })
        res.on("end", chunk => {
            callback(querystring.parse(body));
        })
    })
    request.end();
}
// 4 publish理由：用token获取用户信息，检查权限，接受发布

function publish(req, res) {
    let query = querystring.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1]);
    getUser(query.token, info =>{
        if (info.login !== "") {
            console.log(info);
            req.pipe(unzipper.Extract({
                path: "../server/public/"
            }));
            req.on("end", () => {
                res.end('success')
            })
        }
    });
}

function getUser(token, cb) {
    let request = https.request({
        hostname: "api.github.com",
        path: `/user`,
        port: 443,
        method: "GET",
        headers: {
            "Authorization": `token ${token}`,
            "User-Agent": "toy-publish"
        }
    }, function (res, callback) {
        let body = "";
        res.on("data", chunk => {
            body += (chunk.toString());
        })
        res.on("end", chunk => {
            cb(JSON.stringify(body));
        })
    })
    request.end();
}

http.createServer(function(req, res){
    console.log(req);
    if (req.url.match(/^\/auth\?/)) {
        return auth(req, res)
    }
    if (req.url.match(/^\/publish\?/)) {
        return publish(req, res)
    }
    // console.log("request");
}).listen(8082);