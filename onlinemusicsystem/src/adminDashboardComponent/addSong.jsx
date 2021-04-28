import React, { Component } from 'react';
import Joi from 'joi-browser';
import {addSongs, getArtist} from '../services/adminAddSongService'
import './adminDashboard.css';

class AddSong extends Component {

    constructor(){
        super()
        this.state={
            data: {
                songName: '',
                songGenre: '',
                songDuration: '',
                songAlbumName: '',
                songReleaseDate: '',
                artistId: ''
            },
            artists:[]
        }
    }

    schema = {
        songName:Joi.string().required(),
        songGenre:Joi.string().required(),
        songDuration:Joi.string().required(),
        songAlbumName:Joi.string().required(),
        songReleaseDate:Joi.string().required(),
        artistId:Joi.required()
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
        console.log({data})
    }

    async componentDidMount(){
        try{
            const {data : artists} = await getArtist()
            this.setState({artists})
            // console.log(this.state.artists)
        }
        catch(ex){
            console.log(ex)
        }

        // console.log(this.state)
        
    }

    handleAddSong = async event  => {
        event.preventDefault();
        const data=this.state.data
        const errors = this.validate()
        this.setState({errors : errors || {} })
            if(errors) return;
        
        try{
            await addSongs(data.songName,data.songGenre,data.songDuration,data.songAlbumName,data.songReleaseDate,data.artistId)
        }catch(ex){
            console.log(ex)
        }   
        alert('Song Added')
        window.location.href=("/adminDashboard")
    }

    render() {
        // console.log(this.state.artists)
        const artists = this.state.artists
        return (
            <div className="login">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <h4>Add Song</h4>
                    <form id="myform" onSubmit={this.handleAddSong}>
                        <input type="text" id="songName" className="fadeIn first" name="songName" onChange={this.handleChange} placeholder="Song Name"/>
                        <input type="text" id="songGenre" className="fadeIn second" name="songGenre" onChange={this.handleChange} placeholder="Genre"/>
                        <input type="text" id="songDuration" className="fadeIn third" name="songDuration" onChange={this.handleChange} placeholder="Duration (in minutes)"/>
                        <input type="text" id="songAlbumName" className="fadeIn fourth" name="songAlbumName" onChange={this.handleChange} placeholder="Album Name"/>
                        <input type="text" id="releaseDate" className="fadeIn fifth" name="songReleaseDate" onChange={this.handleChange} placeholder="Release Year"/>
                        
                        <select id="artistId" className="fadeIn sixth" name="artistId" onChange={this.handleChange} >
                            <option class="placeholder" value="">Select Artist</option>
                            {artists.map(artist=>(
                                <option value={artist.artist_id}>{artist.artist_name}</option>
                            ))}
                        </select>
                        <input type="submit" className="fadeIn seventh" value="Add Song"/>
                    </form>
                
                </div>
            </div>
        </div>
        )
    }
}

export default AddSong;