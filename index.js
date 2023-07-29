const express = require("express");

const { errorHandler } = require("./middleware/error");
const petRouter = require("./routes/pet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("<h1>It works!</h1>");
});

app.use("/v1/pet", petRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
