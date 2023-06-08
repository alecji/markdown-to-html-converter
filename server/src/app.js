const express = require('express');
const cors = require('cors');
const convertController = require("./controllers/convertController");

const app = express();

app.use(cors());
app.use(express.json());

app.use(convertController);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
  });