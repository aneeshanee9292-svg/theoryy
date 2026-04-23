import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
    const [token, setToken] = useState(localStorage.getItem("jwt"));

    return token ? <AdminDashboard /> : <AdminLogin onLogin={setToken} />;
}
