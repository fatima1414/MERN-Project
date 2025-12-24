const Blog = require("../models/blog.model");
const path = require('path')
const fs = require('fs')
exports.store = async (req, res) => {
  const { b_title, b_category, b_desc } = req.body;
//   console.log(req.body);
//   console.log("req.body..........");
//   res.send(req.file);
  await Blog.create({ b_title, b_category, b_desc, b_image: req?.file?.filename, });
  res.json("blog create");
};
 
exports.index = async(req,res)=>{
    const records = await Blog.find()
    // res.json(records)
    if(records.length>0){
         res.json({
            success:true,
            records
         })
    }else{
        res.json({
            success:true,
            message:"No Records"
        })
    }
}

exports.trash = async(req,res)=>{
    const {id} = req.params;
    const match = await Blog.findById(id);
    if(match){
        // console.log(match.b_image)
        //  res.json(__dirname) // folder 
        const imgpath =  path.join(__dirname,'../uploads',match?.b_image)
        console.log(imgpath)
        fs.unlink(imgpath,async(err)=>{
         if (err) {
               res.json({
                   success:false,
                   message:"file path is not found"
               })
         }else{
            await Blog.findByIdAndDelete(id)
            res.json({
                success:true,
                message:"Blog has been Deleted"
            })
         }

        })
    }else{
        res.json({
            success:true,
            message:"Blog is Found"
        })
    }

}