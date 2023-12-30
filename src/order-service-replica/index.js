const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3008;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/purch", async (req, res) => {
  const order = {
    id: req.body.id,
    orderCost: req.body.orderCost,
  };
  try {
    const response1 = await axios.post(
      `http://catalog-server-replica:3009/order`,
      order
    );
    const response2 = await axios.post(
      `http://catalog-server:3005/order`,
      order
    );
    if (response1 === response2) {
      console.log(response1.data);
    }

    res.send({ message: "Send Request To Catalog" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});

app.get("/test", (req, res) => {
  res.send({ Message: "Arrive" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
