import React, { Component } from 'react';
import './adminLogin.css';
import Axios from 'axios'

const url="http://localhost:3000/musicSystem"

class AdminLogin extends Component{
    
    state = {
        adminId: '',
        password: ''
    }

    handleChange = ( event ) => {
        const data = {...this.state.data}
        data[event.target.name] = event.target.value;
        this.setState({data})
    }
    handleSubmit = ( event ) => {
        try{
            Axios.post(url+'/loginAdmin', {
                adminId: this.state.data.adminId,
                password: this.state.data.password
            }).then((response) => {
                if(response.data==false){
                    alert("Invalid Admin ID or Password");
                    window.location.href=("/adminLogin");                    
                }
                else{
                    sessionStorage.setItem("Admin_data", response.data.admin_name);
                    alert("Welcome Admin " + response.data.admin_name);
                    window.location.href=("/adminDashboard");
                }
              }, (error) => {
                  alert(error)
                    console.log(error);
              });
            }
        catch(ex){
            console.log(ex)
        }
        
        // window.location.href("/home");

    }

    render(){
        return (
        <div className="login">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h2>Admin Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="adminId" onChange={this.handleChange} className="fadeIn second" name="adminId" placeholder="Admin Id"/>
                        <input type="password" id="password" className="fadeIn third" onChange={this.handleChange} name="password" placeholder="Password"/>
                        <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>
                
                </div>
            </div>
        </div>
        );
    }
};

export default AdminLogin;