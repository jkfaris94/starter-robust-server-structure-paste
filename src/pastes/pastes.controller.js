const pastes = require("../data/pastes-data"); 

function list(req, res) {
    res.json({ data: pastes }); // placeholder response
  }
  
  module.exports = {
    list,
  };