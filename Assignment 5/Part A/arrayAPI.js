
const express = require("express");
const app = express();

app.use(express.json());

let prices = [100, 200, 300, 400, 500];

let products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 },
    { id: 3, name: "Keyboard", price: 1000 },
    { id: 4, name: "Speaker", price: 1500 }
];

// Get all prices
app.get("/array", (req, res) => {
    res.json(prices);
});

// Get doubled prices
app.get("/array/map", (req, res) => {
    res.json(prices.map(p => p * 2));
});

// Get prices above 200
app.get("/array/filter", (req, res) => {
    res.json(prices.filter(p => p > 200));
});

// Find total
app.get("/array/reduce", (req, res) => {
    let total = prices.reduce((sum, p) => sum + p, 0);
    res.json({ total: total });
});

// Find first price above 200
app.get("/array/find", (req, res) => {
    res.json({ result: prices.find(p => p > 200) });
});

// Find index of 300
app.get("/array/findIndex", (req, res) => {
    res.json({ index: prices.findIndex(p => p == 300) });
});

// Check if any price is above 400
app.get("/array/some", (req, res) => {
    res.json({ result: prices.some(p => p > 400) });
});

// Check if all prices are positive
app.get("/array/every", (req, res) => {
    res.json({ result: prices.every(p => p > 0) });
});

// Sort prices
app.get("/array/sort", (req, res) => {
    res.json([...prices].sort((a, b) => a - b));
});

// Reverse prices
app.get("/array/reverse", (req, res) => {
    res.json([...prices].reverse());
});

// Add product
app.post("/products", (req, res) => {
    let product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.json(product);
});

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Find product by ID
app.get("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            res.json(products[i]);
            found = true;
            break;
        }
    }

    if (found == false) {
        res.send("Product not found");
    }
});

// Update product
app.put("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].name = req.body.name;
            products[i].price = req.body.price;
            found = true;
            break;
        }
    }

    if (found == true) {
        res.send("Product updated successfully");
    } else {
        res.send("Product not found");
    }
});

// Delete product
app.delete("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products.splice(i, 1);
            found = true;
            break;
        }
    }

    if (found == true) {
        res.send("Product deleted successfully");
    } else {
        res.send("Product not found");
    }
});

app.get("/", (req, res) => {
    res.send(`
        <h1>ASS05 - Part A: Arrays API</h1>
        <a href="/array">Get Array</a><br>
        <a href="/array/map">Map</a><br>
        <a href="/array/filter">Filter</a><br>
        <a href="/array/reduce">Reduce</a><br>
        <a href="/array/find">Find</a><br>
        <a href="/array/findIndex">Find Index</a><br>
        <a href="/array/some">Some</a><br>
        <a href="/array/every">Every</a><br>
        <a href="/array/sort">Sort</a><br>
        <a href="/array/reverse">Reverse</a><br>
        <a href="/products">Get All Products</a><br>
        <a href="/products/1">Get Product by ID</a><br>
    `);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});