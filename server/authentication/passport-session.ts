import local from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/auth";

const LocalStrategy = local.Strategy;

const getUserByEmail = async (email) => await User.findOne({ email: email });

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "No user with that Email" });
    }

    try {
      // Compare password hash
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  // Use the local authentication stragety (session, cookies)
  // configure Passport to use a specific authentication strategy
  passport.use(new LocalStrategy({ username: "email" }), authenticateUser);

  // adds session id(user information) to cookie
  passport.serializeUser((user, done) => done(null, user.id));

  // removes user cookie
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

export default initialize;
