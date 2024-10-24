import { Router } from "express";
import validateSchema from "../middlewares/validator.mjs";
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/auth.mjs";
import { hashPassword } from "../utils/bcrypt.mjs";
import User from "../mongoose/schemas/user.mjs";
import passport from "passport";
import { authenticate, authorize } from "../middlewares/user.mjs";
import crypto from "crypto";
import { transporter } from "../utils/mail.mjs";

const router = Router();

// router.post(
//   "/login",
//   (req, res, next) => passport.authenticate("local", authenticate),
//   (req, res) => {
//     const user = req.user.toObject();
//     delete user.password;
//     delete user._v;
//     res.json({
//       message: "Login successful",
//       user,
//     });
//   }
// );
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const userObj = user.toObject();
      delete userObj.password;
      delete userObj._v;
      return res.json({
        message: "Login successful",
        user: userObj,
      });
    });
  })(req, res, next);
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
router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this email",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpires = Date.now() + 360000;
    await user.save();
    transporter.sendMail({
      from: '"Social Media👻" <mmmdovasbnm47@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: `<h1>Reset Your Password</h1>
      <p>Click <a href=http://localhost:5173/reset-password/${token}">here</a>to reset your password</p>
      <p>Your token will expire in 1 hour</p>
      <p>Your token is:${token}</p>`, // html body
    });
    res.json({
      message: "Email sent",
    });
  }
);
router.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  async (req, res) => {
    const { token, password } = req.body;

    const user = await User.findOne({
      forgotPasswordToken: token,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = hashPassword(password);
    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpires = null;
    await user.save();

    res.json({
      message: "Password reset successful",
    });
  }
);
export default router;
