const { Store, View, Delete, patch } = require("../controllers/taskController");

const app = require("express")();
app.post("/", Store);
app.get("/", View);
app.delete("/:id", Delete);
app.patch("/:id", patch);

module.exports = app;
