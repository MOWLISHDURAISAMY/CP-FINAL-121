import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../App";
export default function Login() {
  const [form,setForm]=useState({email:"",password:""}); const [error,setError]=useState(""); const {setUser}=useContext(AuthContext); const nav=useNavigate();
  const submit=async e=>{e.preventDefault();setError("");try{const r=await api.post("/auth/login",form);localStorage.setItem("fitcircle_token",r.data.token);localStorage.setItem("fitcircle_user",JSON.stringify(r.data.user));setUser(r.data.user);nav("/dashboard")}catch(err){setError(err.response?.data?.message||"Login failed")}};
  return <main className="container py-5" style={{maxWidth:520}}><div className="card p-4"><h2>Login</h2>{error&&<div className="alert alert-danger">{error}</div>}<form onSubmit={submit}><input className="form-control mb-3" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/><input className="form-control mb-3" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><button className="btn btn-primary w-100">Login</button></form><p className="mt-3 mb-0">New user? <Link to="/register">Create an account</Link></p></div></main>;
}
