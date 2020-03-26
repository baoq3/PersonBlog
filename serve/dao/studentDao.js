var dbutil = require("../dbutil");

function queryAllStudent(success){
    var querySql = "select * from student;"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,(error, result)=>{
        if(error == null){
            success(result);
        } else{
            throw new Error(error);
        }
    });
    connection.end();
}


function insertStudent(stuNum, sex, name,password,stuClass,success){
    var insertSql = "insert into student(stu_num,sex,name,class,pwd) values(?,?,?,?,?);"
    var params = [ stuNum,sex,name,stuClass,password ];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result)=>{
        if(error == null){
            console.log(result);
            success(result);
        } else{
            throw new Error(error);
        }
    });
    connection.end();
}



function queryStudentByStuNum(stuNum, success){
    var querySql = "select * from student where stu_num = ?;";
    var params = [stuNum];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error, result)=>{
        if(error == null){
            console.log(result);
            success(result);
        } else{
            throw new Error(error);
        }
    });
    connection.end();
}


module.exports = {
    queryAllStudent,
    insertStudent,
    queryStudentByStuNum
}



