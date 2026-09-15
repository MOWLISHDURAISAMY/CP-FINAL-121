import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../App";
export default function Register() {
  const [form,setForm]=useState({name:"",email:"",password:"",role:"member",category:"General Fitness"}); const [error,setError]=useState(""); const {setUser}=useContext(AuthContext); const nav=useNavigate();
  const submit=async e=>{e.preventDefault();setError("");try{const r=await api.post("/auth/register",form);localStorage.setItem("fitcircle_token",r.data.token);localStorage.setItem("fitcircle_user",JSON.stringify(r.data.user));setUser(r.data.user);nav("/dashboard")}catch(err){setError(err.response?.data?.message||"Registration failed")}};
  return <main className="container py-5" style={{maxWidth:620}}><div className="card p-4"><h2>Create account</h2>{error&&<div className="alert alert-danger">{error}</div>}<form onSubmit={submit}>
    <input className="form-control mb-3" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
    <input className="form-control mb-3" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
    <input className="form-control mb-3" placeholder="Password" type="password" minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
    <select className="form-select mb-3" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="member">Member</option><option value="trainer">Trainer</option></select>
    <input className="form-control mb-3" placeholder="Fitness category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
    <button className="btn btn-primary w-100">Register</button>
  </form><p className="mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p></div></main>;
}
