import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "./Api";

const App = () => {
  const { register, reset, handleSubmit } = useForm()
  const [blogs,setBlog] =useState([])
  async function Add(data) {
    console.log(data);
    //  const res = await Api.post('/blog',data)
    //  console.log(res.data)
    //  alert("inserted")
    const formData = new FormData();
    formData.append("b_title", data.b_title);
    formData.append("b_category", data.b_category);
    formData.append("b_desc", data.b_desc);
    formData.append("b_image", data.b_image[0]);
    await Api.post('/blog',formData)
    reset();
    alert("inserted");
  }
  async function showApi() {
    const res = await Api.get("/blog");
    console.log(res.data.records);
    setBlog(res.data.records);
  }

  useEffect(() => {
    showApi();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <form
          action=""
          encType="multipart/form-data"
          onSubmit={handleSubmit(Add)}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              {...register("b_title")}
              placeholder="Enter title"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              {...register("b_category")}
              placeholder="Enter Category"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              {...register("b_desc")}
              placeholder="Enter desc"
            />
          </div>

          <div className="mb-3">
            <input  type="file"  className="form-control"  {...register("b_image")} accept='image/*'/>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
