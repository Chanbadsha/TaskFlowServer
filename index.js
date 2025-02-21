const express = require("express");
require("dotenv").config(); //make sure this is added
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

//mongoDB URI

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t47d6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();




    const TaskList = client
    .db("Taskflow")
    .collection("Tasks");












    // Routes for tasks
    // Get all tasks
    app.get("/tasks", async (req, res) => {
      try {
        const tasks = await db.collection("tasks").find().toArray();
        res.json(tasks);
      } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err });
      }
    });

    // Create a new task
    app.post("/tasks", async (req, res) => {
      try {
        const { title, deadline, priority, category, description, taskImg,userEmail,userName } =
          req.body;
        const task = {
          userName,
          userEmail,
          title,
          deadline,
          priority,
          category,
          description,
          taskImg,
          timestamp: new Date().toISOString().split('T')[0], // This will store only the date part in the format YYYY-MM-DD
        };
        console.log(task)
        const result = await TaskList.insertOne(task);
        res.status(201).json("Task Save Successfully");
      } 
      catch (err) {
        console.log(err)
        res.status(400).json({ message: "Error creating task", error: err });
      }
    });

  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from my server");
});

app.listen(port, () => {
  console.log("My simple server is running at", port);
});
