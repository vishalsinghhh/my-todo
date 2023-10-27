import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Login";
import MyTodo from "./pages/MyTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route exact path="/my-todo" element={<ProtectedRoute><MyTodo /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
