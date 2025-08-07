const express = require("express");
const app = express();

// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

app.use(express.json())

//get single data
app.use("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next({ status: 404, message: `Paste id not found: ${pasteId}` });
  }
});

//get data
app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});

// New middleware function to validate the request body
function bodyHasTextProperty(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next(); // Call `next()` without an error message if the result exists
  }
  next({
    status: 400,
    message: "A 'text' property is required."
  });
}

// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post(
  "/pastes", 
  bodyHasTextProperty,
  (req, res, next) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
    req.body;
  {
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
    res.status(202).json({ data: newPaste });
  } 
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "something went wrongz!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
