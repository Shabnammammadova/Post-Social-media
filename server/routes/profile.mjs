import { Router } from "express";
import { authorize } from "../middlewares/user.mjs";

const router = Router();

router.get("/", authorize({ isAdmin: true }), (req, res) => {
  console.log(req.user);
  res.json({
    message: "Profile page",
  });
});
export default router;
