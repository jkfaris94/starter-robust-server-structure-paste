const express = require("express");
const app = express();

app.use(express.json())


//paste state to return one paste record by id or return an error if the id doesn't exist.
app.use("/pastes/:pasteId", (req, res, next) =>{
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next(`Paste id not found: ${pasteId}`);
  }
});

// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});

// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post("/pastes", (req, res, next) => {
    const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
      req.body;
      if (text) {
    const newPaste = {
      id: ++lastPasteId, // Increment last ID, then assign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
      user_id
    };
    pastes.push(newPaste);
    res.status(201).json({ data: newPaste });
    } else {
        res.sendStatus(400);
      }
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
