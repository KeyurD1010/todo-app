import { useState } from "react";
import TaskApp from "./component/TaskApp";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      {!user ? (
        <>
          <Signup setUser={setUser} />
          {/* <Login setUser={setUser} /> */}
        </>
      ) : (
        <TaskApp />
      )}
    </>
  );
}

export default App;
