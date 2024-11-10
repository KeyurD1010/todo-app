import { useState } from "react";

function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (username && password && confirmPassword) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username, password, confirmPassword })
      );
      setUser({ username });
      alert("Signup successful! You can now log in.");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } else {
      alert("Please fill in all fields.");
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
