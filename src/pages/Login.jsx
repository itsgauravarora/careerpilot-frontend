import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post("/auth/jwt-login", {
        email,
        password
      });

     localStorage.setItem(
       "token",
       response.data.token
     );

     console.log("Token Saved");
     navigate("/dashboard");

    } catch (error) {

      console.error("Login Failed", error);

    }
  };

  return (
    <div>
      <h1>CareerPilot AI</h1>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
        <p>
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>

      </form>
    </div>
  );
}

export default Login;