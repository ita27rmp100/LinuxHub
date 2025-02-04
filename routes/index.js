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
  let membersPart = '' , values = [] , member
  // getting statistics :
  connection.query("select * from statistics,members",function(error,results,fields){
    //members list :
    let members = []
    for(let i=0;i<(Object.keys(results).length);i++){
      members.push({
        fullName:results[i].fullName,
        rank:results[i].rank,
        logo:results[i].logo,
        github:results[i].github,
        insta:results[i].insta,
        linkdeIn:results[i].linkdeIn
      })
      values.push({
        statistic:results[i].statistic,
        val:results[i].val
      })
    }
    members = members.filter((value,index,self) =>
      index === self.findIndex((t) => t.fullName === value.fullName)
    );
    values = values.filter((value,index,self)=>
      index === self.findIndex((t) => t.statistic === value.statistic)
    )
    for(i=0;i<(Object.keys(members).length);i++){
      member =`<new-member name="${members[i].fullName}" role="${members[i].rank}" img="images/members/${members[i].logo}"
                      link1="https://github.com/${members[i].github}" social1="github"
                      link2="https://instgram.com/${members[i].insta}" social2="instagram"
                      link3="https://linkedin.com/${members[i].linkedin}" social3="linkedin">
                    </new-member>`
      membersPart += member
    }
    res.render('index',{
      membersPart,values
    });
  })
  
});

module.exports = router;