
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Read all products
router.get("/", async (req, res) => {
  res.json(await Product.find().sort({ _id: -1 }));
});

// Add a product
router.post("/", async (req, res) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

export default router;
