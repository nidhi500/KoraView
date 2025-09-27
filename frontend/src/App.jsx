import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MonasteryDetail from "./pages/MonasteryDetail";
import Admin from "./pages/Admin";
import Login from "./pages/Login";


function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monastery/:id" element={<MonasteryDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          isLoggedIn && userRole === "admin" ? <Admin /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
