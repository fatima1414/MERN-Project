import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "./Api";

const App = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  // ADD TASK
  const Add = async (data) => {
    try {
      if (editId) {
        await Api.patch(`/task/${editId}`, data);
        alert("Task Updated");
        setEditId(null);
      } else {
        await Api.post("/task", data);
        alert("Task Inserted");
      }
      reset();
      showApi();
    } catch (error) {
      console.log(error);
    }
  };

  // VIEW TASK LIST
  const showApi = async () => {
    try {
      const res = await Api.get("/task");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showApi();
  }, []);

  // DELETE TASK
  const DeleteTask = async (id) => {
    try {
      await Api.delete(`/task/${id}`);
      alert("Task Deleted");
      showApi();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TASK
  const EditTask = (task) => {
    setEditId(task._id);
    // setValue("category", task.category);
    // setValue("title", task.title);
    reset({
      category: task.category,
      title: task.title,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">
          {editId ? "Update Task" : "Add Task"}
        </h3>

        <form onSubmit={handleSubmit(Add)}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              {...register("category", { required: true })}
              placeholder="Enter Category"
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter Title"
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            {editId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* TABLE SHOW LIST */}
      <div className="card mt-4 shadow p-3">
        <h4 className="text-center">Task List</h4>

        <table className="table mt-3 table-bordered text-center">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <tr key={t._id}>
                  <td>{t.category}</td>
                  <td>{t.title}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => EditTask(t)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => DeleteTask(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
