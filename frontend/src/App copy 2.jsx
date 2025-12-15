import  { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "./Api";

const App = () => {
  const { register, reset, handleSubmit } = useForm();
  const [blogs, setBlog] = useState([]);
  const [id,setId] = useState(null)
  const [image,setImage] =useState(null)
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
    if(id == null){
      await Api.post("/blog", formData);
         showApi()

      alert("inserted");
      }else{
         await Api.put(`/blog/?id=${id}`, formData);
         alert("updated")
         showApi()
         setId(null)
          }
    reset({
       b_title:"", 
       b_category:"",
       b_desc:"",
       b_image:""
      
    });
  }
  async function showApi() {
    const res = await Api.get("/blog");
    console.log(res.data.records);
    setBlog(res.data.records);
  }

  useEffect(() => {
    showApi();
  }, []);

  async function trash(id) {
    await Api.delete(`/blog/${id}`);
    alert("deleted");
    showApi();
  }
  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  function update(id){
    setId(id)
    const singleBlog = blogs.find(blog=>blog._id==id)
    console.log(singleBlog.b_image)
    const image =`${import.meta.env.VITE_IMAGE_URL}/${singleBlog.b_image}`
    setImage(image)
    reset(singleBlog)
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow p-4">
          <form action="" encType="multipart/form-data" onSubmit={handleSubmit(Add)} >
            <div className="mb-3">
              <input type="text" className="form-control" {...register("b_title")} placeholder="Enter title" />
            </div>

            <div className="mb-3">
              <input  type="text"  className="form-control"  {...register("b_category")}  placeholder="Enter Category"/>
            </div>

            <div className="mb-3">
              <input type="text" className="form-control" {...register("b_desc")} placeholder="Enter desc" />
            </div>

            <div className="mb-3">
              <input type="file" className="form-control" {...register("b_image")} accept="image/*" />
            </div>
            {
              id===null 
              ? 
              <button className="btn btn-primary w-100" type="submit"> submit</button>
              :
              <button className="btn btn-danger w-100" type="submit"> Update </button>
            }
            {
             id==null ? "" : <img className="mt-3" src={image} alt="" width="100px" height="100px" />
            }
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
            <th>desc</th>
            <th>image</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {blogs &&
            blogs.map((blog, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{blog.b_title}</td>
                <td>{blog.b_category}</td>
                <td>{blog.b_desc}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/${blog.b_image}`}
                    width="80"
                    height="80"
                    alt=""
                  />
                </td>
                <td>{formatDate(blog.createdAt)}</td>
                <td>{formatDate(blog.updatedAt)}</td>
                <td className="text-center">
                  <button className="btn btn-danger btn-sm me-2 p-3 mt-2" onClick={() => trash(blog._id)}>delete</button>
                  <button className="btn btn-warning btn-sm p-3 mt-2" onClick={() => update(blog._id)}>update</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
