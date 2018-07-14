const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

/////////////////////
///// DATABASE //////
/////////////////////
massive( process.env.CONNECTIONSTRING )
  .then( dbInstance => {
    app.set('db', dbInstance);
    console.log('Connected to database');
  })
  .catch( err => {
    console.log(err.message);
  });

////////////////////
///// SESSIONS /////
////////////////////
app.use( session({
  secret: 'mys3cr3t',
  resave: false,
  saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );

///////////////////////////
///// AUTH0 STRATEGY //////
///////////////////////////
passport.use( new Auth0Strategy(
  {
    domain:       process.env.DOMAIN,
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:  '/login',
    scope: "openid email profile"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
    const db = app.get('db');
    db.findUser(profile._json.email).then(user => {
      if(user.length) {
        return done(null, profile);
      } else {
        db.addUser([profile._json.email, profile._json.name]).then(user => {
          return done(null, profile);
        })
      }
    });
  }
));

passport.serializeUser(function(profile, done) {
  done(null, { user_id: profile.id, email: profile._json.email, name: profile._json.name });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function authenticated(req, res, next) {
  if( req.session.user_id ) {
    next()
  } else {
    res.sendStatus(401).redirect('/login');
  }
}

//////////////////////
///// ENDPOINTS //////
//////////////////////

// Login Endpoint
app.get('/login', passport.authenticate('auth0', { 
  successRedirect: 'http://localhost:3000/#/Dashboard', failureRedirect: '/login', failureFlash: true 
}));

// User Profile Endpoint
app.get('/profile', (req, res, next) => {
  // console.log(req);
  // console.log(req.user);
  // console.log(req.session);
  // console.log(req.user_id);
  const db = app.get('db');
  db.findUser(req.user.email)
    .then(user => { 
      if( !req.user.email ) {
        res.redirect('/login');
      } else {
        // Set session.user_id to the user_id from the db
        req.session.user_id = user[0].user_id;
        console.log(req.session.user_id);
        res.status(200).send(user[0]);
      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
});

// Logout Endpoint
app.post('/api/logout', (req, res, next) => {
  console.log("logging out", req.session);
  req.session.destroy();
  console.log("logged out", req.session);
})

// GET ALL Listings Endpoint
app.get('/api/listings', controller.getListings);

// GET Listings by UserID Endpoint
app.get('/api/listings/:id', authenticated, controller.getListingsByUserId);

// GET One Listing
app.get('/api/listing/:id', authenticated, controller.getListing);

// POST Listing Endpoint
app.post('/api/listing/new', authenticated, controller.createListing);

// PUT Listing Endpoint
app.put('/api/listing/:id', authenticated, controller.updateListing);

// DELETE Listing Endpoint
app.delete('/api/listing/:id', authenticated, controller.deleteListing);

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});