import { useState } from "react";
import { loginUser } from "../api/monasteryAPI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/admin");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" placeholder="Email" className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit" className="btn mt-4 w-full bg-indigo-700 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
