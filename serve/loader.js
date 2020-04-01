var fs = require("fs");
var globalConfig = require("./config");
var multer = require("multer");

//文件上传配置
var uploadSingle = multer({dest:"./file/"});

var controllerSet = [];
var pathMap = new Map();

function init(app){
    var files = fs.readdirSync("./" + globalConfig["web_path"]);
    files.forEach((ei,ii,si)=>{
        var temp = require("./" + globalConfig["web_path"] + "/" + ei);
        if(temp.path){
            for(var [key,value] of temp.path){
                if(pathMap.get(key) == null){
                    pathMap.set(key,value);
                    if(value.method == 'GET'){
                        app.get(key,value.callback);
                    } else if( value.method == 'File'){
                        app.post(key, uploadSingle.single("file"), value.callback)
                    } else{
                        app.post(key,value.callback);
                    } 
                }else{
                    throw new Error("url path异常，url:" + key);
                }
                controllerSet.push(temp);
            }
        }
    });
}

module.exports.init = init;



