const express = require("express");
const app = express();
const pastesRouter = require("./pastes/pastes.router");

app.use(express.json())


//paste state to return one paste record by id or return an error if the id doesn't exist.
app.use("/pastes/:pasteId", (req, res, next) =>{
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next({ status: 404, message:` Paste id not found: ${pasteId}` });
  }
});

// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

app.use("/pastes", pastesRouter); // Note: app.use

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
