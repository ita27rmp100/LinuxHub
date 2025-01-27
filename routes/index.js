var express = require('express');
var router = express.Router();
const sql = require("mysql")


// connection with DB
let connection = sql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'linuxhub'
})
/* GET home page. */
router.get('/', function(req, res, next) {
  // getting statistics :
  let stcs = {}
  connection.query("select * from statistics",function(error,results,fields){
    let statics = results.map(row => row.statistic)
    let values = results.map(row => row.val)
    console.log(statics,values)
    for(i=0;i<Object.keys(statics).length;i++){
      stcs[statics[i]] = values[i]
    }
  })
  console.log(stcs)
  res.render('index',{
    views:stcs['views'],
    courses:stcs['courses'],
    tutorials:stcs['tutorials'],
    quizzes:stcs['quizzes']
  });
  console.log(stcs)
});

module.exports = router;
