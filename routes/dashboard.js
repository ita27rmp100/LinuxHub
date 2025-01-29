var express = require('express');
var router = express.Router();
const sql = require("mysql");

let connection = sql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'linuxhub'
});

router.get('/',function(req,res,next){
    let MessagesTable = ''
    connection.query('select * from form',function(err,result,fields){
        messages = result
        for(let i=0;i<(Object.keys(messages).length);i++){
            message=`<tr>
                        <td>${messages[i].fullName}</td>
                        <td>${messages[i].email}</td>
                        <td>${messages[i].message}</td>
                        <td>
                        <form action="mailto:${messages[i].email}">
                            <input type="submit" value="reply">
                        </form>
                        </td>
                    </tr>`
            MessagesTable += message
        }
        res.render('dashboard',{UsersMessages: MessagesTable})
    })
})

module.exports = router