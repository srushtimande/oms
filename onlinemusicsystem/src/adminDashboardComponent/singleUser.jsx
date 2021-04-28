import React, { Component } from 'react'
import './adminDashboard.css';

const singleUser = ({user})=>{
        return (
            <div className="crd">
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Unna:ital@1&display=swap" rel="stylesheet"></link>
                <div className="card-body">
                    <h3 className="card-title">
                        {user.cust_name}   
                    </h3>
                    <p className="card-text">
                        <b>ID: </b>{user.cust_id}<br/>
                        <b>Email ID: </b>{user.email}<br/>
                        <b>Phone No: </b>{user.phone}
                    </p>
                </div>                      
            </div>

        )
    }

export default singleUser
