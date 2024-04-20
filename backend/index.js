const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const storage = require("node-persist");

app.use(cors());
app.use(express.json());
storage.init().then(() => {
  //Clear storage on restarting the app
  storage.clear();
});

app.get("/todos", (req, res) => {
  result = [];
  storage
    .forEach((data) => {
      result.push(data);
    })
    .then(() => {
      if (!result.length) return res.status(404).send(result);
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(500).send(`Error fetching tasks ${err}`);
    });
});

app.post("/todos", (req, res) => {
  const { taskID, task } = req.body;
  if (!task) return res.status(400).send("Please enter all information");
  storage
    .setItem(taskID, task)
    .then(() => {
      return res.status(200).send(`Added Todo Task (${taskID}) successfully`);
    })
    .catch((err) => {
      return res.status(500).send(`Error storing Todo task ${err}`);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
