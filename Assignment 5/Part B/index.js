
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://localhost:27017");

async function main() {
    await client.connect();
    console.log("MongoDB Connected");

    const db = client.db("college");
    const student = db.collection("student");

    // Insert single student
    app.post("/student", async (req, res) => {
        await student.insertOne(req.body);
        res.send("Student Inserted");
    });

    // Insert multiple students
    app.post("/students/multiple", async (req, res) => {
        await student.insertMany(req.body);
        res.send("Multiple Students Inserted");
    });

    // Get all students
    app.get("/student", async (req, res) => {
        const data = await student.find().toArray();
        res.json(data);
    });

    // Get one student by name
    app.get("/student/:name", async (req, res) => {
        const data = await student.findOne({ name: req.params.name });
        res.json(data || { message: "Student not found" });
    });

    // Update student
    app.put("/student/:name", async (req, res) => {
        const result = await student.updateOne(
            { name: req.params.name },
            { $set: req.body }
        );
        res.json(result);
    });

    // Delete single student
    app.delete("/student/:name", async (req, res) => {
        const result = await student.deleteOne({ name: req.params.name });
        res.json(result);
    });

    // Delete multiple students by age
    app.delete("/students/multiple/:age", async (req, res) => {
        const result = await student.deleteMany({
            age: Number(req.params.age)
        });
        res.json(result);
    });

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

main().catch(console.error);
