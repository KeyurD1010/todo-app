import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/service";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ username, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser({ username });
        navigate("/tasks");
      } else {
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      alert(
        "Login failed. Error: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="login-form">
      <h2>Log In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
