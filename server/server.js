const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3001;

app.use(cors());

app.get("/", (req, res) => {
  const stage = req.query.stage;
  try {
    const dataPath = path.join(__dirname, `../Data/StageData/${stage}.json`);
    const data = fs.readFileSync(dataPath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
