import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./pages/Task";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
