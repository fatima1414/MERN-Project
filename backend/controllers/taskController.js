const Task = require("../models/taskModel");

const Store = async (req, res) => {
  const { category, title } = req.body;

  const images =req.files.map(ele=>ele.filename)

  res.json(images)
  await Task.create({ category, title,task_image:images});
  res.json({
    success: true,
    message: "Task has been created.",
  });
};

const View = async (req, res) => {
  const records = await Task.find();
  res.json({
    success: true,
    records,
  });
};


// const Delete = async (req, res) => {
//   const { id } = req.params;
//   await Task.findByIdAndDelete(id);
//   res.json("user delted");
// };

// .............UPDATE.................//
// const patch = async (req, res) => {
//   const { id } = req.params;
//   const { title, category } = req.body;

//   await Task.findByIdAndUpdate(id, { title, category });
//   res.json("user updated");
// };
module.exports = { Store, View };
