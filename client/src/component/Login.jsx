import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/service";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginUser({ username, password })
      .then((resp) => {
        if (resp.token) {
          localStorage.setItem("user", resp.username);
          localStorage.setItem("token", resp.token);
          setUser({ username });
          navigate("/tasks");
        } else {
          alert("Login failed. Please check your username and password.");
        }
      })
      .catch((err) => {
        alert(
          "Login failed. Error: " +
            (err.response?.data?.message || "Unknown error")
        );
      });
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
