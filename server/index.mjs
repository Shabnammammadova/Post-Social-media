import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./auth/local-strategy.mjs";
import authRoutes from "./routes/auth.mjs";
import "./mongoose/schemas/user.mjs";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.post("/auth/login", passport.authenticate("local"), (req, res) => {
//   console.log(req.user);

//   res.json({
//     message: "Login successful",
//   });
// });

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function connectToDb() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.2dw64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
}
connectToDb()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));