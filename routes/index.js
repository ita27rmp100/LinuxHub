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
let membersPart = '' , values = [] , social = {github:[],insta:[],linkdein:[]} , fname , rank , image
router.get('/', function(req, res, next) {
  // getting statistics :
  connection.query("select * from statistics",function(error,results,fields){
    values = results.map(row => row.val)
    console.log(values)
  })
  // getting members list :
  async function renderMembersList() {
    try {
      // Ensure `query` is properly defined
      const members = await query("SELECT * FROM members");
      const memberSlides = members.map(member =>
          `<new-member name="${member.fullName}" role="${member.rank}" img="${member.img}"
            link1="${member.github}" social1="github"
            link2="${member.insta}" social2="instagram"
            link3="${member.linkedin}" social3="linkedin">
          </new-member>`
      ).join('\n');
      console.log(memberSlides);
      return memberSlides
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  }
  res.render('index',{
    views:values[0],
    courses:values[1],
    tutorials:values[2],
    quizzes:values[3],
    membersPart:renderMembersList()
  });
});

module.exports = router;