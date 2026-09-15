import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import api from "./api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Profile from "./pages/Profile";

export const AuthContext = React.createContext(null);

function Nav({ user, logout }) {
  return <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/">FitCircle</Link>
      <div className="navbar-nav ms-auto align-items-center">
        {user && <>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/workouts">Workouts</Link>
          <Link className="nav-link" to="/members">Members</Link>
          <Link className="nav-link" to="/trainers">Trainers</Link>
          <Link className="nav-link" to="/profile">Profile</Link>
          <button className="btn btn-outline-light btn-sm ms-2" onClick={logout}>Logout</button>
        </>}
        {!user && <><Link className="nav-link" to="/login">Login</Link><Link className="btn btn-primary btn-sm ms-2" to="/register">Register</Link></>}
      </div>
    </div>
  </nav>;
}
function Protected({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}
export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("fitcircle_user") || "null"));
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("fitcircle_token"); localStorage.removeItem("fitcircle_user"); setUser(null); navigate("/"); };
  useEffect(() => {}, []);
  return <AuthContext.Provider value={{ user, setUser }}>
    <Nav user={user} logout={logout}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
      <Route path="/workouts" element={<Protected><Workouts/></Protected>}/>
      <Route path="/members" element={<Protected><Members/></Protected>}/>
      <Route path="/trainers" element={<Protected><Trainers/></Protected>}/>
      <Route path="/profile" element={<Protected><Profile/></Protected>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  </AuthContext.Provider>;
}
