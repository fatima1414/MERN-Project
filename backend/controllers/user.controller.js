const { userInfo } = require("os");
const User = require("../models/user.model");
const { plainToHash, hasToPlain } = require("../utils/password");
const crypto = require("crypto");

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { u_name, u_email, u_mobile, u_Password } = req.body;
    const hash_pass = await plainToHash(u_Password);
    await User.create({ u_name, u_email, u_mobile, u_Password: hash_pass });
    res.json("signup");
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { u_email, u_Password } = req.body;
    // const userExist = await User.findOne({u_email:u_email})
    const userExist = await User.findOne({ u_email });
    console.log(userExist);
    if (!userExist) {
      return res.json({
        success: false,
        message: "Email ID Not Exist",
      });
    }
    // res.json(userExist.u_Password)
    const match = await hasToPlain(u_Password, userExist?.u_Password);
    // console.log(match);

    if (!match) {
      return res.json({
        success: false,
        message: "password is not match",
      });
    }

    // const token = crypto.randomUUID()
    const payload = {
      id: userExist?._id,
      emailId: userExist?.u_email,
    };

    req.session.user = {
      ...payload,
      loginAt: new Date(),
    };

    res.json({
      success: true,
      message: "login successfully! ",
      payload,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.mycookie = async (req, res) => {
  res.json(req.session.user);
};
