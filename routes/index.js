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
let membersPart = '' , values = [] , social = {github:[],insta:[],linkdein:[]}
router.get('/', function(req, res, next) {
  // getting statistics :
  connection.query("select * from statistics",function(error,results,fields){
    values = results.map(row => row.val)
    console.log(values)
  })
  connection.query("select * from members",function(error,results,fields){
    fname = results.map(row => row.fullName)
    rank = results.map(row => row.rank)
    image = results.map(row => row.img)
    social.github = results.map(row => row.github)
    social.insta = results.map(row => row.insta)
    social.linkdein = results.map(row => row.linkdeIn)
  })
  for(i=0;i<Object.keys(fname).length;i++){
    membersPart += `<new-member name="${fname[i]} " role="${rank[i]}" img="${image[i]}"
                    link1="${social.github[i]}" social1="instagram"
                    link2="${social.insta[i]}" social2="github"
                    link3="${social.linkdein[i]}" social3="linkedin">
                    </new-member>`
  }
  res.render('index',{
    views:values[0],
    courses:values[1],
    tutorials:values[2],
    quizzes:values[3],
    membersPart:membersPart,
  });
});

module.exports = router;