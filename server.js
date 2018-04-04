const express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var googleProfile = {};
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('assets'));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT
passport.serializeUser((user, done) => {

  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, cb) {
    googleProfile = {
      id: profile.id,
      displayName: profile.displayName
    };
    cb(null,profile);
  }
));



// APP ROUTES
app.get('/', (req, res) => {
  res.render('auth-google', {user: req.user});
});

app.get('/logged', (req,res) => {
  res.render('first-template', {showPug: true})
})



// PASSPORT ROUTES
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/logged',
    failureRedirect: '/'
}));


app.get('/inside', (req, res) => {
  res.render('inside')
})

app.get('/store', (req, res) => {
  res.send('To jest sklep');
});

app.get('/userform', (req, res) => {
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  res.end(JSON.stringify(response));
});

const server = app.listen(3000)






// function queueTime(customers, n) {
//   const len = customers.length;
//   const sum = customers.reduce((sum, val) => sum + val);
//   let cashs = []
//   for(let i = 0; i < len; i++) {
//     return [...cashs, [customers[i]]
//   }
//   for(let i = 0; i < sum; i++) {
//     const change = cashs.map((val) => val.indexOf(0))
//     if(change !== -1) {cashs.splice(change, 1, customers.shift())}
//     if(change === -1 && customers.length === 0) {return i}
//     cashs.map((val) => {val - 1})
//   }
//   console.log(cashs)
// }