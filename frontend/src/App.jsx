import  { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "./Api";
import ImageList from "./ImageList";

const App = () => {
  const { register, reset, handleSubmit } = useForm();
  const [taskList, setBlog] = useState([]);
  async function Add(data) {
    const formData = new FormData();
   const images = data.task_image;
   for (var i in images){
     formData.append("task_image", images[i]);
   }
    formData.append("category", data.category);
    formData.append("title", data.title);
      await Api.post("/task", formData);
      alert("inserted");     
     reset({
       category:"", 
       title:"",
       task_image:""
      
    });
  }
  async function showApi() {
    const res = await Api.get("/task");
    console.log(res.data.records);
    setBlog(res.data.records);
  }

  useEffect(() => {
    showApi();
  }, []);

  // async function trash(id) {
  //   await Api.delete(`/blog/${id}`);
  //   alert("deleted");
  //   showApi();
  // }

  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  // function update(id){
  //   setId(id)
  //   const singleBlog = blogs.find(blog=>blog._id==id)
  //   console.log(singleBlog.b_image)
  //   const image =`${import.meta.env.VITE_IMAGE_URL}/${singleBlog.b_image}`
  //   setImage(image)
  //   reset(singleBlog)
  // }

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow p-4">
          <form action="" encType="multipart/form-data" onSubmit={handleSubmit(Add)} >
            <div className="mb-3">
              <input type="text" className="form-control" {...register("category")} placeholder="Enter category" />
            </div>

            <div className="mb-3">
              <input  type="text"  className="form-control"  {...register("title")}  placeholder="Enter title"/>
            </div>

            <div className="mb-3">
              <input type="file" className="form-control" {...register("task_image")} accept="image/*" multiple />
            </div>
           
              <button className="btn btn-primary w-100" type="submit"> submit</button>
             
            
          </form>
        </div>
      </div>
      <br />
      <table className="table table-bordered table-success">
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>category</th>
            <th>image</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {taskList &&
            taskList.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.category}</td>
                <td>{task.title}</td>
                {/* <td>
                  {
                    task.task_image.map((ele,index)=>(
                      <img key={index} className="p-3" src={`${import.meta.env.VITE_IMAGE_URL}/${ele}`}  width="80"  height="80"  alt="" />
                    ))
                  }
                </td> */}
                <ImageList images={task.task_image}/>
                <td>{formatDate(task.createdAt)}</td>
                <td>{formatDate(task.updatedAt)}</td>
                <td className="text-center">
                  <button className="btn btn-danger btn-sm me-2 p-3 mt-2" onClick={() => trash(task._id)}>delete</button>
                  <button className="btn btn-warning btn-sm p-3 mt-2" onClick={() => update(task._id)}>update</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
