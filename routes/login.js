var express = require('express');
var router = express.Router();

/* GET sign-up page. */
router.get('/', function(req, res, next) {
    if (req.session.admin) {
        res.redirect("/da4ebrd")
    }
    else{
        res.render('login-admin')
    }
});

module.exports = router;