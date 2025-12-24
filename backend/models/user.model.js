const { Schema, model } = require("mongoose");
const common = require("./common");

const userSchema = new Schema(
  {
    u_name: common,
    u_email: {
      ...common,
      unique: [true, "Email ID Already Exist"],
    },
    u_mobile: {
      ...common,
      unique: [true, "Mobile Number Already Exist"],
      require:[true,"enter mobile number"]
    },
    u_Password: common,
  },
  {
    timestamps: true,
  }
)

const User = model('user', userSchema)
module.exports = User
