var studentDao = require("../dao/studentDao");
var path = new Map();
var url = require("url");
var fs = require("fs");

// function queryAllStudent(request,response){
//     studentDao.queryAllStudent(( result )=>{
//         response.writeHead(200);
//         response.write(JSON.stringify(result));
//         response.end();
//     });
// }

// path.set("/api/queryAllStudent",queryAllStudent);


// function insertStudent(request,response){
//     var params = url.parse(request.url,true).query;
//     studentDao.insertStudent(params.stuNum, params.sex, params.name,params.password,params.class,()=>{
//         response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
//         response.write("添加成功");
//         response.end();
//     })
// }

// path.set("/api/insertStudent",insertStudent);

// function login(request,response){
//     var params = url.parse(request.url,true).query;
//     studentDao.queryStudentByStuNum(params.stuNum,(result)=>{
//         if(result && result.length > 0 && result[0].pwd == params.pwd){
//             //写cookie
//             response.cookie("id",result[0].id);
//             //重定向
//             response.redirect("/api/queryAllStudent");
//         }else{
//             response.redirect("/loginError.html");
//         }
//     })
// }

// path.set("/login", login);


function upload(request,response){
    studentDao.queryAllStudent(( result )=>{
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    });
}


path.set("/upload", {'method':'POST','callback':upload});



// function getPic(request,response){
//     var params = url.parse(request.url,true).query;
//     try{
//         var data = fs.readFileSync("./" + params.path);
//         response.writeHead(200);
//         response.write(data);
//         response.end();
//     }catch (e){

//     }
// }


// path.set("/getPic", getPic);


module.exports.path = path;



