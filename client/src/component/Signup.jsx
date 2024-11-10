import { useState } from "react";
import axios from "axios";
function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (username && password && password === confirmPassword) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          { username, password }
        );
        localStorage.setItem("user", JSON.stringify({ username }));
        setUser({ username });
        alert("Signup successful! You can now log in.");
        navigate("/login");
      } catch (error) {
        alert(`Signup failed: ${error.response.data.message}`);
      }
    } else {
      alert("Please make sure all fields are filled and passwords match.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;
