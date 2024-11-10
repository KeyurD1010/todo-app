import { useState, useEffect } from "react";
import TaskApp from "./component/TaskApp";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <>
      {!user ? (
        <>
          {showLogin ? (
            <Login setUser={setUser} />
          ) : (
            <Signup setUser={setUser} />
          )}
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Switch to Signup" : "Switch to Login"}
          </button>
        </>
      ) : (
        <TaskApp user={user} />
      )}
    </>
  );
}

export default App;
