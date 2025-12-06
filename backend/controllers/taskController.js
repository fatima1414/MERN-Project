const Task = require("../models/taskModel");

const Store = async (req, res) => {
  const { category, title } = req.body;
  await Task.create({ category, title });
  res.json({
    success: true,
    message: "Task has been created.",
  });
};
const View = async (req, res) => {
  const tasks = await Task.find();
  // res.json({
  //   success: true,
  //   records,
  // });
  res.json({
    success: true,
    tasks,
  });
};

const Delete = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json("user delted");
};

// .............UPDATE.................//
const patch = async (req, res) => {
  const { id } = req.params;
  const { title, category } = req.body;

  await Task.findByIdAndUpdate(id, { title, category });
  res.json("user updated");
};
module.exports = { Store, View, Delete, patch };
