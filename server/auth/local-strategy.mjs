import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../data/user.mjs";
import User from "../mongoose/schemas/user.mjs";
import { comparePasswords } from "../utils/bcrypt.mjs";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) {
    return done(new Error("User not found"));
  }
  done(null, user);
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        throw new Error("Invalid username or pasword");
      }
      if (!comparePasswords(password, user.password)) {
        throw new Error("Invalid username or pasword");
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
