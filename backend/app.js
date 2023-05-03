const express = require("express");
const connectToMongoose = require("./db");
const cors = require("cors");
const port = 5000;
const app = express();

connectToMongoose()
  .then((connection) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB");
  });

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
