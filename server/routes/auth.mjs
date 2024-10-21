import { Router } from "express";
import validateSchema from "../middlewares/validator.mjs";
import { registerSchema } from "../validation/auth.mjs";
import { hashPassword } from "../utils/bcrypt.mjs";
import User from "../mongoose/schemas/user.mjs";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "Login successful",
    user: req.user,
  });
});

router.post("/register", validateSchema(registerSchema), async (req, res) => {
  const user = req.matchedData;
  user.password = hashPassword(user.password);
  const userExist = await User.findOne({
    email: user.email,
  });
  if (userExist) {
    return res.status(400).json({
      message: "User already exists with this email ",
    });
  }

  const newUser = new User(user);
  newUser.save();
  const userObj = newUser.toObject();
  delete userObj.password;
  delete userObj._v;
  res.json({
    message: "Register successful",
    user: userObj,
  });
});

router.post("/logout", (req, res) => {
  res.json({
    message: "Logout successful",
  });
});

export default router;
