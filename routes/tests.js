var express = require("express")
var router = express.Router()
const sql = require("mysql")

// create connection
let connection = sql.createConnection({
    host:"127.0.0.1",
    user:'root',
    password:'',
    database:'linuxhub'
})
router.get('/',function(req,res,next){
    connection.query("select link from testLinks",
        function(error,results,fields){
            console.log(results)
        }
    )
    res.render('tests')
})

module.exports = router