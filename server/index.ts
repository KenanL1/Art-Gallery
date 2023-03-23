import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

import initializePassport from "./authentication/passport.js";

import connectDB from "./models/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
dotenv.config();

// Create the Express application
const app = express();

// Initialize paasport-jwt strategy
initializePassport(passport);

//----- Middleware -----------------

// Allow API to be called from different address/port
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// This will initialize the passport object on every request
app.use(passport.initialize());
// app.use(passport.session());

// -----------------Routes----------------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

// Can only create when authenticated
app.use(
  "/api/v1/dalle",
  passport.authenticate("jwt", { session: false }),
  dalleRoutes
);

// Connect to MongoDB and start server
try {
  if (process.env.MONGODB_URL) connectDB(process.env.MONGODB_URL);
  app.listen(5000, () => console.log("Server started on port 5000"));
} catch (error) {
  console.log(error);
}
