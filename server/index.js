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
  secret: 'secrets',
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
) );

passport.serializeUser(function(user, done) {
  done(null, { id: user.id, email: user._json.email, name: user._json.name });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function authenticated(req, res, next) {
  if( req.user ) {
    next()
  } else {
    res.sendStatus(401).redirect('/login');
  }
}

//////////////////////
///// ENDPOINTS //////
//////////////////////

// Login Endpoint
app.get('/login',
  passport.authenticate('auth0',
    { successRedirect: 'http://localhost:3000/#/Dashboard', failureRedirect: '/login', failureFlash: true }
  )
);

// Profile Endpoint
app.get('/profile', ( req, res, next) => {
  const db = app.get('db');
  db.findUser(req.user.email).then(
    user => { 
      if ( !req.user ) {
        res.redirect('/login');
      } else {
        res.status(200).send( user[0] );
      }
    }
  );
});

// GET ALL Listings
app.get('/api/listings', authenticated, controller.getListings);

// GET Listings by User Id
// app.get('/api/listings/:user_id', controller.getListingById);

// POST Listing Endpoint
app.post('/api/listing/new', controller.createListing);

// PUT Listing Endpoint

// DELETE Listing Endpoint

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});