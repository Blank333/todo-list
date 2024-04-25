const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mysql = require("mysql");

//CREATE USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
const conn = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "todoapp",
});

//Connect to Database
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql database connected!");
});

//Use cors for Cross Origin
//Use express.json for parsing
app.use(cors());
app.use(express.json());

//Fetch all data
app.get("/todos", (req, res) => {
  conn.query("SELECT * FROM tasks;", (err, result) => {
    if (err) {
      return res.status(500).send(`Error fetching data ${err}`);
    }
    return res.status(200).send(result);
  });
});

//Add task to database
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const currDate = new Date().toISOString().slice(0, 10);

  if (!task) return res.status(400).send("Please enter all information");
  conn.query(`INSERT INTO tasks (task, createdAt) VALUES ("${task}", "${currDate}");`, (err, result) => {
    if (err) {
      return res.status(500).send(`Error adding task ${err}`);
    }
    return res.status(200).send(`Successfully added task ${result}`);
  });
});

//Delete task from database
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  conn.query(`DELETE FROM tasks WHERE id = ${id};`, (err, result) => {
    if (err) {
      return res.status(500).send(`Error deleting task ${err}`);
    }
    return res.status(200).send(`Successfully deleted task (ID: ${id}) ${result}`);
  });
});

//Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
