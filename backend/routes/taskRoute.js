const { Store, View } = require("../controllers/taskController");
const upload = require("../utils/upload");
const app = require("express")();
app.post("/", upload.array('task_image',4), Store);
app.get("/", View);
// app.delete("/:id", Delete);
// app.patch("/:id", patch);

module.exports = app;
