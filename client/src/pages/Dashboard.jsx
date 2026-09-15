import React, { useEffect, useState } from "react";
import api from "../api";
import { AuthContext } from "../App";
export default function Dashboard() {
  const {user}=React.useContext(AuthContext); const [posts,setPosts]=useState([]); const [workouts,setWorkouts]=useState([]); const [category,setCategory]=useState(""); const [content,setContent]=useState("");
  const load=async()=>{const [p,w]=await Promise.all([api.get("/posts"+(category?`?category=${encodeURIComponent(category)}`:"")),api.get("/workout"+(category?`?category=${encodeURIComponent(category)}`:""))]);setPosts(p.data);setWorkouts(w.data)};
  useEffect(()=>{load()},[category]);
  const addPost=async e=>{e.preventDefault();if(!content.trim())return;await api.post("/posts",{content,category:category||user.category});setContent("");load()};
  const like=async id=>{await api.post(`/posts/${id}/like`);load()};
  return <main className="container py-4"><div className="d-flex justify-content-between align-items-center mb-4"><div><h2>Welcome, {user.name}</h2><p className="text-secondary">Role: {user.role}</p></div><select className="form-select" style={{maxWidth:240}} value={category} onChange={e=>setCategory(e.target.value)}><option value="">All categories</option><option>Strength</option><option>Cardio</option><option>Yoga</option><option>Weight Loss</option><option>General Fitness</option></select></div>
  <div className="row g-4"><div className="col-lg-7"><div className="card p-4 mb-4"><h5>Create a community post</h5><form onSubmit={addPost}><textarea className="form-control mb-2" rows="3" value={content} onChange={e=>setContent(e.target.value)} placeholder="Share your progress, tip or question..."/><button className="btn btn-primary">Publish</button></form></div>{posts.map(p=><div className="card p-4 mb-3 post" key={p._id}><div className="d-flex justify-content-between"><strong>{p.author?.name}</strong><span className="badge text-bg-light">{p.category}</span></div><p className="mt-3">{p.content}</p><button className="btn btn-sm btn-outline-primary" onClick={()=>like(p._id)}>Like ({p.likes.length})</button></div>)}</div>
  <div className="col-lg-5"><div className="card p-4"><h5>Available workouts</h5>{workouts.slice(0,8).map(w=><div className="border-bottom py-3" key={w._id}><strong>{w.title}</strong><div className="small text-secondary">{w.category} · {w.difficulty} · {w.duration} min</div></div>)}{!workouts.length&&<p className="text-secondary">No workouts yet. Add one from Workouts.</p>}</div></div></div></main>;
}
