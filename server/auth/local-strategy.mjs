import passport from "passport";
import { Strategy } from "passport-local";
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
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj._v;
  done(null, userObj);
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
      if (!comparePasswords(password, user.password) || !user) {
        return (
          null,
          false,
          {
            message: "Invalid error password",
          }
        );
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
