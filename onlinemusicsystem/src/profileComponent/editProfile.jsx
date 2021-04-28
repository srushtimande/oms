import React, { Component } from 'react';
import { editProfile, getUserProfile } from '../services/profileService';
import './profile.css';

class EditProfile extends Component {

    state = {
            cust_name: '',
            passwd: '',
            phone: 1
    }
    async componentDidMount(){
        const id = sessionStorage.getItem("id")
        try{
            const {data : profile} = await getUserProfile(id)
            this.setState(profile[0])
        }
        catch(ex){
            console.log(ex)
        }

        // console.log(this.state)
        
    }

    handleChange = ( event ) => {
        const data = {...this.state}
        data[event.target.name] = event.target.value;
        this.setState(data)
        //console.log(this.state)
    }

    handleSubmit = ( event ) => {
        try{
            const done = editProfile(this.state.cust_id, this.state.cust_name, this.state.phone, this.state.passwd);
            if(done){
                alert("Profile Updated")
                window.location.href=("/profile")
            }
            else{
                alert("Something Went Wrong")
            }
        }
        catch(e){
            throw e;
        }
    }
    render() {
        return (
            <div className="edit-wrapper">
                <h4>Profile Card</h4>
                <div className="card">
                    <p>Id: {this.state.cust_id}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Name: <input type="text" id="cust_name" value={this.state.cust_name} required name="cust_name" onChange={this.handleChange}/></p>
                    <p>Password: <input type="text"id="passwd" value={this.state.passwd} required name="passwd" onChange={this.handleChange}/></p>
                    <p>Phone No: <input type="text" id="phone" value= {this.state.phone} required name="phone" onChange={this.handleChange}/></p>
                    <button onClick={this.handleSubmit}>Edit Profile</button>
                </div>
            </div>
        );
    }
}

export default EditProfile;