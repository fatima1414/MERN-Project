const { Schema, model } = require("mongoose");
const common = require("./common");

const blogSchema = new Schema(
  {
    b_title: common,
    b_category: common,
    b_desc:{
        common,
        require:false
    
    },
    b_image: common,
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);
module.exports = Blog;
