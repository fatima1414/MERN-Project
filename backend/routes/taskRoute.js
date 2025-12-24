const { Store, View } = require("../controllers/taskController");
const { verifAuth } = require("../middleware/verify");
const upload = require("../utils/upload");
const app = require("express")();
app.post("/",verifAuth, upload.array('task_image',4), Store);
app.get("/",verifAuth, View);
// app.delete("/:id", Delete);
// app.patch("/:id", patch);

module.exports = app;
