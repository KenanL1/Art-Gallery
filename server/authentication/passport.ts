import local from "passport-local";
import jwt from "passport-jwt";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import User from "../models/auth.js";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const PUB_KEY = fs.readFileSync(path.resolve("id_rsa_pub.pem"));

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const initialize = (passport) => {
  // JWT payload is passed into the verify callback
  // configure Passport to use a specific authentication strategy
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = User.findOne({ _id: payload.sub });

        if (user) return done(null, user);
        else return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

export default initialize;
