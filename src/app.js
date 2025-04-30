const express = require("express");
const app = express();
const pastesRouter = require("./pastes/pastes.router");
const usersRouter = require("./users/users.router");


app.use(express.json())


// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

app.use("/pastes", pastesRouter); // Note: app.use
app.use("/users", usersRouter);

// Not found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
