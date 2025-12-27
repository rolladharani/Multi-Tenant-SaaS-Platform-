import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../auth/auth";

export default function Dashboard() {
const [user, setUser] = useState(null);

useEffect(() => {
    api.get("/auth/me")
    .then(res => setUser(res.data.user))
    .catch(() => logout());
}, []);

if (!user) return <p>Loading...</p>;

return (
    <div>
        <h2>Dashboard</h2>
        <p>User ID: {user.userId}</p>
        <p>Role: {user.role}</p>
        <p>Tenant ID: {user.tenantId}</p>
        <button onClick={logout}>Logout</button>
    </div>
);
}
