const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t47d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to DB
async function connectDB() {
  try {
    // await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
connectDB();

const TaskList = client.db("Taskflow").collection("Tasks");

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskList.find().toArray();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
});

//  Get tasks by email
app.get("/task", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email query parameter is required" });
  }

  try {
    const tasks = await TaskList.find({ userEmail: email }).toArray();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
});

//  Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const {
      title,
      deadline,
      priority,
      status,
      description,

      userEmail,
      userName,
    } = req.body;
    const task = {
      userName,
      userEmail,
      title,
      deadline,
      priority,
      status,
      description,

      timestamp: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };

    const result = await TaskList.insertOne(task);
    res
      .status(201)
      .json({ message: "Task saved successfully", taskId: result.insertedId });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error creating task", error: err });
  }
});

// Edit task status

app.patch("/task/:id", async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  // Update one task by its ObjectId
  try {
    const result = await TaskList.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { status: status } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ success: true, message: "Task status updated" });
    } else {
      res.status(404).json({ success: false, message: "No changes applied" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Database update failed", error });
  }
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const result = await TaskList.deleteOne(filter);

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error deleting task", error: err });
  }
});

// ✅ Ping to confirm connection
app.get("/", (req, res) => {
  res.send("Hello from my server");
});

app.listen(port, () => {
  console.log("Server is running at", port);
});
