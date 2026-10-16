
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import products from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", products);

app.get("/", (req, res) => res.send("Warranty Tracker API is running"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server running on port 3000")
    );
  })
  .catch((error) => console.log("MongoDB error:", error.message));
