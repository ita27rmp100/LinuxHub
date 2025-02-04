var express = require('express');
const { stat } = require('fs');
var router = express.Router();
const sql = require("mysql");

let connection = sql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'linuxhub'
});

router.get('/:addWhat?',function(req,res){
    let MessagesTable = '' , learnsTable = '' , values = []
    if(true){
        connection.query('select * from form,testlinks,learncontent,statistics',function(err,result,fields){
            let messages = [] , learns = [] , message = '',content = ''
            let lnks = new Array(result[0].link,result[1].link,result[2].link,result[3].link)
            for(let i=0;i<Object.keys(result).length;i++){
                messages.push({
                  fullName:result[i].fullName,
                  email:result[i].email,
                  message:result[i].message,
                })
                learns.push({
                    title:result[i].title,
                    etype:result[i].etype,
                    lang:result[i].lang,
                    link:result[i].lnk,
                })
                values.push({
                    statistic:result[i].statistic,
                    val:result[i].val
                })
            }
            // statistics sum 
            let sumStcs = values[1].val + values[2].val + values[3].val + values[4].val
            // filtering
            messages = messages.filter((value, index, self) =>
                index === self.findIndex((t) => t.email === value.email && t.fullName === value.fullName && t.message === value.message)
            );
            learns = learns.filter((value, index, self) =>
                index === self.findIndex((t) => 
                    t.title === value.title && t.etype === value.etype && t.lang === value.lang && t.link === value.link
                )
            );
            values = values.filter((value,index,self)=>
                index === self.findIndex((t) => t.statistic === value.statistic)
            )
            // HTML code generating
            for(i=0;i<(Object.keys(messages).length);i++){
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
            MessagesTable += `<tfoot><tr><th colspan="3">Total messages</th><td>${Object.keys(messages).length}</td></tfoot>`
            for(i=0;i<(Object.keys(learns).length);i++){
                content = `<tr>
                            <td>${learns[i].title}</td>
                            <td>${learns[i].etype}</td>
                            <td>${learns[i].lang}</td>
                            <td>${learns[i].link}</td>
                        </tr>`
                learnsTable += content
            }
            stcs=`<tr>
                    <td>${values[0].val}<t/d>
                    <td>${values[3].val}</td>
                    <td>${values[2].val}</td>
                    <td>${values[1].val}</td>
                </tr>`
            res.render('dashboard',{
                UsersMessages: MessagesTable,
                lnks,learnsTable,stcs
            })
        })
    }
    else{
        res.send("Error , you don't have the permission to access this page.\nOnly admins can access it ... '<a href='/4c6fg79'>Login</a>'")
    }
})

module.exports = router