import React from "react";
import { useForm } from "react-hook-form";
import Api from "../Api";

const Login = () => {
  const { register, handleSubmit } = useForm();

  async function Add(data) {
    // alert(res.data.message);
    try {
      const res = await Api.post("/user/login", data);
      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <form
        method="post"
        onSubmit={handleSubmit(Add)}
        className="col-lg-6 mx-auto my-5 p-5 shadow"
      >
        <div className="mt-4">
          <input
            type="text"
            {...register("u_email")}
            placeholder="enter email id"
            className="form-control"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            {...register("u_Password")}
            placeholder="enter Password "
            className="form-control"
          />
        </div>
        <div className="mt-4">
          <button className="btn btn-success mt-4">submit</button>
        </div>
      </form>
    </>
  );
};

export default Login;
