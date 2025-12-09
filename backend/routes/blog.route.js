// const { store } = require('../controllers/blog.controller')
const BlogController = require("../controllers/blog.controller");
const upload = require("../utils/upload");
const router = require('express').Router();

// const express = require('express')
// const router = express.Router()

// router.post("/",upload.single('b_image'), BlogController.store);

router
.route('/')
.post(upload.single('b_image'),BlogController.store)
.get(BlogController.index)



router.route('/:id')
.delete(BlogController.trash)

module.exports = router     