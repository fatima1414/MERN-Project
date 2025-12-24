const { signup, login, mycookie } = require("../controllers/user.controller");
const { verifAuth } = require("../middleware/verify");

const router = require("express").Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/mycookie",verifAuth, mycookie);

module.exports = router;
