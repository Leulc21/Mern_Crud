import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import noteRoutes from "./routes/noteRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:3001");
  });
});
