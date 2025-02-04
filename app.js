var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require("mysql")
const qs = require("querystring")
const http = require("http")
const session = require('express-session')
const upload = require("express-fileupload")
const fs = require("fs")
// routes
var indexRouter = require('./routes/index');
var learnRouter = require('./routes/learnContent');
var testRouter = require('./routes/tests')
var logInAdminRouter = require('./routes/login')
var dashboardRouter = require('./routes/dashboard')
const { stat } = require('fs');

var app = express();
// set up the session milldware
app.use(session({
  secret:"it's secret"
}))
//  set up the form
app.use(upload())
// connection with database 
let connection = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'linuxhub'
})
// edit on statistics statistics :
let statisticsList = ['courses', 'tutorials', 'quizzes'];
let instrctUpdate = `UPDATE statistics SET val = CASE \n`;
let completedQueries = 0; // Track completed queries
for (let i = 0; i < statisticsList.length; i++) {
  const stat = statisticsList[i];
  connection.query(`SELECT etype FROM learncontent WHERE etype = ?`, [stat], function (_, results) {
    instrctUpdate += `WHEN statistic = "${stat}" THEN ${results.length + 1} \n`;
    completedQueries++;
    if (completedQueries === statisticsList.length) {
      instrctUpdate += `END WHERE statistic IN ('courses', 'tutorials', 'quizzes');`;
      connection.query(instrctUpdate);
    }
  });
}
connection.query(
  `update statistics
  set val=val+1
  where statistic="views"`,
  function(){
    console.log("done")
  }
)
// contact us
app.post('/',(req,res)=>{
  let body = ''
  req.on("data",(data)=>{
    body += data
  })
  req.on('end',()=>{
    let result = qs.parse(body)
    connection.query(
      `insert into form() value("${result.name}","${result.email}","${result.message}")`,
      function(errors,results,fields){
        setInterval(function(){
          res.redirect("/")
        },1500)
      })
  })
})
//LoginToDashboard(forAdmin)
let attempts = 0
app.post('/4c6fg79',(req,res)=>{
  let body = ''
  req.on("data",(data)=>{
    body += data
  })
  req.on('end',()=>{
    let result = qs.parse(body)
    if(result.username==='linuxhubAdmin' && result.password==="4c6fg79&#60;"){
      req.session.admin = true;
      res.redirect('/da4ebrd')
    }
    else{
      if (attempts<3) {
        alert("either username or password is incorrect ...\n Please try again without refreshing the page")
        attempts++
      } else {
        res.status("404").send("Blocked , you couldn't try now")
      }
    }
  })
})
// edit level links
app.post("/da4ebrd",(req,res)=>{
  let body = ''
  req.on("data",(data)=>{
    body += data
  })
  req.on('end',()=>{
    let result = qs.parse(body)
    connection.query(`
                    update testlinks
                    set link = case
                    when lvl = "advanced" then "${result.advanced}"
                    when lvl = "Beginner" then "${result.Beginner}"
                    when lvl = "Intermediate" then "${result.Intermediate}"
                    when lvl = "Novice" then "${result.Novice}"
                    end
                    where lvl in ("advanced","Beginner","Intermediate","Novice");`,
      function(err,result,fields){
          res.redirect('/da4ebrd')
      }
    )
  })
})
// add new learn content
app.post('/da4ebrd/addcntnt',(req,res)=>{
  let file = req.files.img;
  let filename = file.name
  file.mv(`./public/images/learn`+filename)
  let body = req.body
  connection.query(`insert into learnContent() value("${body.title}","${body.etype}","${body.lang}","${filename}","${body.lnk}")`,
    function(){
      res.redirect("/")
    }
  )
})
// add new member :
app.post('/da4ebrd/addmem',(req,res)=>{
  console.log(req.files)
  let file = req.files.logo;
  let filename = file.name
  file.mv('./public/images/members'+filename)
  let body = req.body
  connection.query(
    `insert into members value("${body.fullName}","${body.rank}","${filename}","${body.github}","${body.insta}","${body.linkdeIn}")`,
    function(err){
      try {
        res.redirect('/#members')
      } catch (error) {
        res.send(err.message)
      }
    }
  )
})
// log-out
app.get("/da4ebrd/logout",(req,res)=>{
  req.session.admin = false;
  console.log("logout")
  res.redirect('/4c6fg79')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/learn', learnRouter);
app.use('/test',testRouter);
app.use('/4c6fg79',logInAdminRouter);
app.use('/da4ebrd',dashboardRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;