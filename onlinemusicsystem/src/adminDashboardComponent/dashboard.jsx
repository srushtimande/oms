import React from 'react';
import './adminDashboard.css';

function adminDashboard(props) {
   
    return (
        <div className="head">
            <h1>Admin Dashboard</h1>
        <div className="card">
            <button onClick={()=>{window.location.href=("/adminAddSong")}} class="btn">
                <h2 className="card-title">
                    Add Songs
                </h2>
            </button>
            
        </div>
        <div className="card">
            <button onClick={()=>{window.location.href=("/adminDeleteSong")}} class="btn">
                <h2 className="card-title">
                    Delete Songs
                </h2>
            </button>
        </div>
        <div className="card">
            <button onClick={()=>{window.location.href=("/adminViewUsers")}} class="btn">
                <h2 className="card-title">
                    View Users
                </h2>
            </button>
        </div>
        </div>
    );
}


export default adminDashboard;
