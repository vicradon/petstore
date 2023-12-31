const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

const { errorHandler } = require("./middleware/error");
const petRouter = require("./routes/pet");
const storeRouter = require("./routes/store");
const userRouter = require("./routes/user");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("<h1>It works!</h1>");
});

app.use("/v1/pet", petRouter);
app.use("/v1/store", storeRouter);
app.use("/v1/user", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
