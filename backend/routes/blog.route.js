// const { store } = require('../controllers/blog.controller')
const BlogController = require("../controllers/blog.controller");
const router = require("express").Router();

// const express = require('express')
// const router = express.Router()

router.post("/", BlogController.store);


module.exports = router