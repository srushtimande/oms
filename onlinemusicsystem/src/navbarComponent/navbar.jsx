import './navbar.css';
import React, { Component } from 'react';

class Navbar extends Component{

    logOut = (event) => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("Admin_data")
        window.location.href = "/home";
    }
    
    render(){
        if(sessionStorage.getItem("id")){
            return(
                <div className="menubar">
                <ul className="menu">
                    <span className="logoSection"> 
                        <li className="logoName"><a href="/home">OMS</a></li>
                        <li className="logo"><a href="/home"></a></li>
                    </span>
                    <li className="menuitem"><a href="/home">Home</a></li>
                    <li className="menuitem"><a href="/viewSongs">Songs</a></li>
                    <li className="menuitem"><a href="/playlist">Playlists</a></li>
                    <li className="menuitem"><a href="/profile">Profile</a></li>
                    <li className="menuitem" onClick={this.logOut}>Logout</li>
                </ul>
                </div>
            )
        }
        else if(sessionStorage.getItem("Admin_data")){
            return(
            <div className="menubar">
                <ul className="menu">
                    <span className="logoSection"> 
                        <li className="logoName"><a href="/adminDashboard">OMS</a></li>
                        <li className="logo"><a href="/adminDashboard"></a></li>
                    </span>
                    <li className="menuitem" onClick={this.logOut}>Logout</li>
                </ul>
                </div>
            )
        }
        else{
            return (
                <div className="menubar">
                    <ul className="menu">
                        <span className="logoSection"> 
                            <li className="logoName"><a href="/home">OMS</a></li>
                            <li className="logo"><a href="/home"></a></li>
                        </span>
                        <li className="menuitem"><a href="/home">Home</a></li>
                        <li className="menuitem"><a href="/viewSongs">Songs</a></li>
                        <li className="menuitem"><a href="/playlist">Playlists</a></li>
                        <li className="menuitem"><a href="/login">Login</a></li>
                        <li className="menuitem"><a href="/register">Register</a></li>
                    </ul>
                </div>
            );
        }
    }
};

export default Navbar;