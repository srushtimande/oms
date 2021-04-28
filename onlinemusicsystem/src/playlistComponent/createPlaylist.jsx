import React, { Component } from 'react';
import Joi from 'joi-browser';
import { createPlaylist } from '../services/playlistService';

class CreateMusicPlaylist extends Component {

    state = {
        data:{
            playlistName: ''
        }
    }

    schema = {
        playlistName:Joi.string().required(),
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

    handleChange = ( event ) => {
        const data = {...this.state.data}
        data[event.target.name] = event.target.value;
        this.setState({data})
        console.log(this.state)
    }

    handleCreatePlaylist = async ( event ) => {
        event.preventDefault();
        // console.log("Playist Created");
        // console.log(this.state.data)
        const data=this.state.data
        const errors = this.validate()
        this.setState({errors : errors || {} })
            if(errors) return;
        
        var id = sessionStorage.getItem("id")
        try{
            var done = await createPlaylist(data.playlistName,id)
        }catch(ex){
            console.log(ex)
        }   
        if(done){
            alert("Playlist Added Successfully");
            window.location.href=("/home")
        }
        else{
            alert("Something Went Wrong")
        }

    }
    render() {
        return (
            <div className="login">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h3>Create Playlist</h3>
                    <form onSubmit={this.handleCreatePlaylist}>
                        <input type="text" id="playlistName" className="fadeIn second" onChange={this.handleChange} name="playlistName" placeholder="Playlist Name"/>
                        <input type="submit" className="fadeIn third" value="Create Playlist"/>
                    </form>
                
                </div>
            </div>
        </div>
        );
    }
}

export default CreateMusicPlaylist;