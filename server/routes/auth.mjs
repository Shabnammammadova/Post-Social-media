import { Router } from "express";
import validateSchema from "../middlewares/validator.mjs";
import { registerSchema } from "../validation/auth.mjs";
import { hashPassword } from "../utils/bcrypt.mjs";
import User from "../mongoose/schemas/user.mjs";
import passport from "passport";
import { authenticate, authorize } from "../middlewares/user.mjs";

const router = Router();

router.post(
  "/login",
  (req, res, next) => passport.authenticate("local", authenticate),
  (req, res) => {
    const user = req.user.toObject();
    delete user.password;
    delete user._v;
    res.json({
      message: "Login successful",
      user,
    });
  }
);

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
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
    res.json({
      message: "Logout successful",
    });
  });
});
router.get("/current-user", authorize({ isAdmin: false }), (req, res) => {
  res.json({
    user: req.user,
  });
});
export default router;
