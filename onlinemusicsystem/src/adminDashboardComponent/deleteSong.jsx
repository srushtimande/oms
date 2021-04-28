import React, { Component } from 'react';
import { getSongs } from '../services/songService';
import '../songsComponent/songs.css';
import { paginate } from './../utils/paginate';
import Pagination from '../songsComponent/Pagination';
import {deleteSong} from '../services/adminDeleteSongService'
import './adminDashboard.css';
class DeleteSongs extends Component {

    constructor(){
        super()
        this.state={
            songs:[],
            pageSize:5,
            currentPage:1
        }
    }
    
    handlePageChange = pageNo => {
        this.setState({currentPage:pageNo})
    }

    async componentDidMount(){
        try{
        const {data : songs} = await getSongs()
        this.setState({songs})
        }
        catch(ex){
            console.log(ex)
        }
        
    }

    handleDeleteSong=async song=>{
        try{
            console.log(song._id,song.song_name)
            await deleteSong(song.song_id,song.song_name)
            const songs=this.state.songs.filter(s=>s._id !== song._id)
            this.setState({songs})
        }catch(ex){
            console.log(ex)
        }
        //console.log(song)
    }

    render() {

        const {length:count} = this.state.songs;
        //const {songs} = this.state;
        const {songs:allSongs,currentPage,pageSize} = this.state;

        const paginatedSongs = paginate(allSongs,currentPage,pageSize)
        
        return (
            <div className="songsList">

                {/* link of play-song icon */}
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></link>

                <h2>Songs</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Genre</th>
                        <th>Song Duration</th>
                        <th>Album Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {paginatedSongs.map(song =>(
                            <tr key={song._id}>
                            <td>{song.song_name}</td>
                            <td>{song.genre}</td>
                            <td>0{song.song_duration}:00</td>
                            <td>{song.album_name}</td>
                            <td><button onClick={()=>this.handleDeleteSong(song)} className="btn-danger">Delete <i className="fa fa-trash-o"></i></button></td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>   

                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}/>     
            </div>
        );
    }
}

export default DeleteSongs;