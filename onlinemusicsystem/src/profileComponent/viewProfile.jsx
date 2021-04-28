import React, { Component } from 'react';
import { getUserProfile, deleteProfile } from '../services/profileService';
import './profile.css';

class ViewProfile extends Component {

    state = {
        cust_name: '',
        email: '',
        phone: '',
        cust_id: ''
        
    }
    onHandleDelete=( event ) => {
        try{
            const done = deleteProfile(this.state.cust_id);
            if(done){
                sessionStorage.removeItem('id')
                alert("Profile Deleted!")
                window.location.href=('/home')
            }
            else{
                alert("Something Went Wrong")
            }
        }
        catch(e){
            throw e;
        }
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

    render() {
        // const {length:count} = this.state.profile;
        return (
            <div className="wrapper">
                <h4>Profile Card</h4>
                <div className="card">
                    <p><b>Id: </b>{this.state.cust_id}</p>
                    <p><b>Name: </b>{this.state.cust_name}</p>
                    <p><b>Email: </b>{this.state.email}</p>
                    <p><b>Phone No: </b>{this.state.phone}</p>
                    <button onClick={()=>{window.location.href=("/editProfile")}}>Edit Profile</button>
                    <button className="delete" onClick={this.onHandleDelete}>Delete Profile</button>
                </div>
            </div>
        );
    }
}

export default ViewProfile;