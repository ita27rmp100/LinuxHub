var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require("mysql")
const qs = require("querystring")
const http = require("http")

// routes
var indexRouter = require('./routes/index');
var learnRouter = require('./routes/learnContent');
const { stat } = require('fs');

var app = express();
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

    // Once all queries are done, finalize and run the UPDATE
    if (completedQueries === statisticsList.length) {
      instrctUpdate += `END WHERE statistic IN ('courses', 'tutorials', 'quizzes');`;

      connection.query(instrctUpdate, function () {
        console.log('Statistics updated successfully.');
      });
    }
  });
}
// Contect us's form
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
