import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
dotenv.config();

const app = express();
connectDB();
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3001");
});
