import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return <main className="container hero text-center">
    <span className="badge text-bg-primary mb-3">Fitness Community Platform</span>
    <h1 className="display-4 fw-bold">Train. Share. Connect.</h1>
    <p className="lead mx-auto" style={{maxWidth:720}}>A MERN-based community where members discover workouts, connect with trainers, publish fitness posts, and interact through a category-based feed.</p>
    <div className="d-flex justify-content-center gap-2"><Link to="/register" className="btn btn-primary btn-lg">Get Started</Link><Link to="/login" className="btn btn-outline-secondary btn-lg">Login</Link></div>
    <div className="row g-4 mt-5">
      {["Member Management","Workout Management","Trainer Management","Community Feed"].map(x=><div className="col-md-3" key={x}><div className="card p-4 h-100"><h5>{x}</h5><p className="text-secondary mb-0">Simple, secure and role-aware workflows.</p></div></div>)}
    </div>
  </main>;
}
