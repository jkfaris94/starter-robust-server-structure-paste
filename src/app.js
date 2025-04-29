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
    next({ status: 404, message:` Paste id not found: ${pasteId}` });
  }
});

// TODO: Follow instructions in the checkpoint to implement ths API.
const pastes = require("./data/pastes-data");

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
    status:400,
    message: "A 'text' property is required."
  });
}

// Variable to hold the next ID
// Because some IDs may already be used, find the largest assigned ID
let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post(
  "/pastes",
  bodyHasTextProperty,
  (req, res, next) => { // Add validation middleware function
    const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
      req.body;
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
    } 
);

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
