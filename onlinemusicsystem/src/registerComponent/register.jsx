import React, { Component } from 'react';
import Joi from 'joi-browser';
import './register.css';
import Axios from 'axios';

const url="http://localhost:3000/musicSystem"

class Register extends Component{

    state={
        data: {
            name: '',
            phone: '',
            email: '',
            password: ''
        }
    }

    schema = {
        name :  Joi.string()
                .min(2)
                .max(50)
                .required(),

        phone :  Joi.string()
                .regex(RegExp("^\\d{10}$"))
                .required(),

        password :Joi.string()
                .regex(RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
                .required(),

        email : Joi.string()
                .regex(RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"))
                .required()
      }

    handleChange = ( event ) => {
        const data = {...this.state.data}
        data[event.target.name] = event.target.value;
        this.setState({data})
        console.log(data);
    }

    validate = () => { 
        const {data} = this.state
        const results = Joi.validate(data,this.schema,{abortEarly : false})

        if(!results.error) return null;
        const errors = {}
        
        for(let item of results.error.details){
            errors[item.path[0]] = item.message
        }

        return errors;
        }


    handleSubmit = ( event ) => {
        console.log("Inside Submit");
        const errors = this.validate()
        this.setState({errors : errors || {} })
        if(errors) {
            console.log(errors)
            if(errors.name){
                alert("Name is Required")
            }
            else if(errors.email){
                alert("Invalid Email")
            }
            else if(errors.phone){
                alert("Invalid Phone No")
            }
            else if(errors.password){
                alert("Password should be atleast 8 characters long and contain atleast 1 Uppercase letter, 1 Lowercase letter and 1 special character")
            }
            return errors;
        }
        
        console.log('Form Submitted')
        console.log(this.state.data)

        try{
            const profileCreated = Axios.post(url+'/createProfile', {
                name: this.state.data.name,
                phoneNo: this.state.data.phoneNo,
                emailId: this.state.data.email,
                password: this.state.data.password
            }).then((response) => {
                alert("Welcome to the Musical Family \nPlease Login to enjoy our services");
                window.location.href=("/login");
              }, (error) => {
                  alert(error)
                console.log(error);
              });
            }
        catch(ex){
            console.log(ex)
        }
    }

    render(){
        return (
             <div className="register">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h3>Create Account</h3>
                        <form id="myform" onSubmit={this.handleSubmit}>
                            <input id="name" type="text" name="name" onChange={this.handleChange} className="fadeIn first" placeholder="Name"/>                          
                            <input id="email" type="email" name="email" onChange={this.handleChange} className="fadeIn second" placeholder="Email"/>              
                            <input id="phone" type="text" name="phone" onChange={this.handleChange} className="fadeIn third" placeholder="Phone Number"/>
                            <input id="password" type="password" name="password" onChange={this.handleChange} className="fadeIn fourth" placeholder="Password"/>
                            <input type="submit" value="Register" className="fadeIn fifth"/>
                        </form>
                    </div>
                </div>
             </div>
        );
    }
};

export default Register;