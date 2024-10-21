const passport = require("passport");

export const authorize =
  ({ isAdmin = false }) =>
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (isAdmin && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Opps, Something went wrong!",
      });
    }
    next();
  };

export const authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: info.message,
      });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({
          message: "Login failed",
        });
      }

      req.isAuthenticated = true;
      req.user = user;
      next();
    });
  })(req, res, next);
};
