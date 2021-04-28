import React, { Component } from 'react';
import { getSongs, playMusic} from '../services/songService';
import './songs.css';
import { addToPlaylist, selectPlaylist } from '../services/playlistService';
import { paginate } from './../utils/paginate';
import Pagination from './Pagination';

class ViewSongs extends Component {

    constructor(){
        super()
        this.state={
            songs:[],
            pageSize:5,
            currentPage:1,
            playlists:[],
            noPlaylist:1
        }
    }

    addToPlaylist = (sid,pid,dur) => {
        addToPlaylist(sid,pid,dur);
    }

    handlePageChange = pageNo => {
        this.setState({currentPage:pageNo})
    }

        async componentDidMount(){
            try{
                const {data:playlists} = await selectPlaylist()
                if(playlists){
                    this.setState( {playlists} )
                    this.state.noPlaylist = 0;
                }
                const {data : songs} = await getSongs()
                this.setState({songs})
            }
            catch(ex){
                console.log(ex)
            }
            
        }
    render() {
        if(sessionStorage.getItem("id") && this.state.noPlaylist==1){
            const playlists = this.state.playlists
            console.log(playlists)
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedSongs.map(song =>(
                                <tr key={song.song_id}>
                                <td>{song.song_name}</td>
                                <td>{song.genre}</td>
                                <td>0{song.song_duration}:00</td>
                                <td>{song.album_name}</td>
                                <td>
                                    <div onClick={() => playMusic(song)}>
                                        <i className="fa fa-play"/>
                                    </div>
                                </td>
                                <td>
                                    <div className="btn-option">
                                        <i className="fa fa-plus"/>
                                        <div className="info">
                                            <p onClick={()=>{window.location.href=("/createPlaylist")}}>Please Create a Playlist</p>
                                        </div>
                                    </div>
                                </td>
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
        else if(sessionStorage.getItem("id") && this.state.noPlaylist==0)
        {
            const playlists = this.state.playlists
            console.log(playlists)
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedSongs.map(song =>(
                                <tr key={song.song_id}>
                                <td>{song.song_name}</td>
                                <td>{song.genre}</td>
                                <td>0{song.song_duration}:00</td>
                                <td>{song.album_name}</td>
                                <td>
                                    <div onClick={() => playMusic(song)}>
                                        <i className="fa fa-play"/>
                                    </div>
                                </td>
                                <td>
                                    <div className="btn-option">
                                        <i className="fa fa-plus"/>
                                        <div className="info">
                                            {playlists.map(playlist => (
                                                <p onClick={()=> {this.addToPlaylist(song.song_id, playlist.playlist_id, song.song_duration)}}>{playlist.playlist_name}</p>
                                            ))}
                                        </div>
                                    </div>
                                </td>
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
        else{
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
                                <tr key={song.song_id}>
                                <td>{song.song_name}</td>
                                <td>{song.genre}</td>
                                <td>0{song.song_duration}:00</td>
                                <td>{song.album_name}</td>
                                <td>
                                    <div onClick={() => playMusic(song)}>
                                        <i className="fa fa-play"/>
                                    </div>
                                </td>
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
}

export default ViewSongs;