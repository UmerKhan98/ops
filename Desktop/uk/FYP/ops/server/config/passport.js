const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const SocialKeys = require("../../SocialKeys/index");
const chalk = require("chalk");
const { User } = require("../models/User");

let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: SocialKeys.FACEBOOK.clientID,
      clientSecret: SocialKeys.FACEBOOK.clientSecret,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: SocialKeys.GOOGLE.clientID,
      clientSecret: SocialKeys.GOOGLE.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (!user)
          return res.json({
            loginSuccess: false,
            message: "Authentication Error!",
          });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    }
  )
);
