import React, { Component } from 'react';
import './login.css';
import Axios from 'axios'

const url="http://localhost:3000/musicSystem"
class login extends Component{
    
    state = {
        email: '',
        password: ''
    }

    handleChange = ( event ) => {
        const data = {...this.state.data}
        data[event.target.name] = event.target.value;
        this.setState({data})
    }
    handleSubmit = ( event ) => {
        event.preventDefault();
        console.log("Form SubmitteD");
        console.log(this.state.data)
        try{
            const logged = Axios.post(url+'/loginProfile', {
                emailId: this.state.data.email,
                password: this.state.data.password
            }).then((response) => {
                if(response.data==false){
                    alert("Invalid Username or Password")
                    window.location.href=("/login");                    
                }
                else{
                    sessionStorage.setItem("id", response.data.cust_id);
                    alert("Welcome " + response.data.cust_name);
                    window.location.href=("/home");
                }
              }, (error) => {
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
                    <h3>Login</h3>
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" id="email" className="fadeIn second" onChange={this.handleChange} name="email" placeholder="Email Id"/>
                        <input type="password" id="password" className="fadeIn third" onChange={this.handleChange} name="password" placeholder="Password"/>
                        <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>
                
                </div>
            </div>
        </div>
        );
    }
};

export default login;