var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var app = new express();
var cookie = require("cookie-parser");
// var multer = require("multer");
// var userMsgDao = require("./service/dao/userMsgDao");

//绑定静态页面
// app.use(express.static(globalConfig["page_path"]));
//使用cookie
app.use(cookie());

//文件上传配置
// var uploadSingle = multer({dest:"./file/"});


//拦截器,重定向
app.get("/api/*",( request, response,next )=>{
    if(request.cookies.id){
        next();
    }else{
        response.writeHead(97);
        response.write('用户未登录，请先登录');
        response.end();
    }
})
//自动加载方法
loader.init(app);
//上传图片
// app.post("/upload", uploadSingle.single("file"),(request,response)=>{
//     userMsgDao.insertUserMsg(request.body.name,request.file.path,request.file.originalname, request.file.size,()=>{
//         var resp = {
//             path:request.file.path
//         }
//         response.writeHead(200);
//         response.write(JSON.stringify(resp));
//         response.end();
//     });
// });

//监听端口
app.listen(globalConfig["port"]);



