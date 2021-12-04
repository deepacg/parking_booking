var express = require('express');
var router = express.Router();
var jsonObj = require('./parkingf135e53.json');
const session = require('express-session');
var bookingHelpers=require('../helpers/booking-helpers')  
const userHelpers=require('../helpers/user-helpers')

const verifyLogin=(req, res, next)=>{
  if(req.session.user) {                  
    next()                                
  } else {
    res.redirect('/login')                
  }
}

/* GET users listing. */
router.get('/', function(req, res) {
  let user=req.session.user  
  if(req.session.user){
  var all_locations = jsonObj;
  res.render('user/booking', {all_locations});
  }
});

router.get('/login', function(req, res){
  res.render('user/login');
})

router.post('/login', (req, res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status) {
      req.session.user=response.user      // saving current user data from response to session.user
      req.session.userLoggedIn=true       // setting logged in variable as true (starting session)
      res.redirect('/')
    }
    else {
      req.session.userLoginErr="Invalid username or password"   // login error message passed from 'post' to 'get' method. we can keep a login error in the session itself. can also give value 'true'
      res.redirect('/login')        // here we cannot pass the error message in redirect()
    }
  })
})

router.get('/signup', function(req, res){
  res.render('user/signup');
})

router.post('/signup', (req, res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    //console.log(response)
    req.session.user=response           // saving current user data
    req.session.userLoggedIn=true       // setting logged in variable as true (starting session)
    res.redirect('/')
  })
})

router.get('/logout', (req, res)=>{
  //req.session.destroy()       // to destroy a session
  req.session.user=null         // to maintain a user and an admin we cannot use destroy(), so have to set it to null
  req.session.userLoggedIn=false
  res.redirect('/')
})

router.get('/user/all_locations', function(req, res){
  var all_locations = jsonObj;
  // console.log(all_locations.Sheet1.Area);
  res.render('user/all_locations', {all_locations});
});

router.post('/', function(req, res){
  userHelpers.addBooking(req.body);
})

module.exports = router;
