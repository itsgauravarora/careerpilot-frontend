import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        fullName,
        email,
        password
      });

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Registration Failed");
    }
  };

  return (
    <div>

      <h1>CareerPilot AI</h1>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>
<br />
<p>
  Don't have an account?
  <button
    type="button"
    onClick={() => navigate("/register")}
  >
    Register
  </button>
</p>
<p>
  Already have an account?
  <button
    type="button"
    onClick={() => navigate("/")}
  >
    Login
  </button>
</p>
      </form>

    </div>
  );
}

export default Register;