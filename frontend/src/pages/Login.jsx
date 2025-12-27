import { useState } from "react";
import api from "../api/axios";
import { saveToken } from "../auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantSubdomain, setTenantSubdomain] = useState("");
  const [error, setError] = useState("");


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", {
      email: email,
      password: password,
      tenantSubdomain: tenantSubdomain
    });
    saveToken(res.data.token);
    window.location.href = "/dashboard";
  } catch (err) {
    setError("Invalid credentials");
  }
};

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input placeholder="Tenant Subdomain" onChange={(e) => setTenantSubdomain(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
