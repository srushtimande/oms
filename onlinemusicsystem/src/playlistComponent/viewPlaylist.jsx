import React, { Component } from 'react';
import './playlist.css'
import { paginate } from './../utils/paginate';
import Pagination from '../songsComponent/Pagination'
import { getPlaylist, viewSongs } from './../services/playlistService';

class ViewPlaylists extends Component {

    constructor(){
        super()
        this.state={
            playlists:[],
            pageSize:5,
            currentPage:1
        }
    }
    
    handlePageChange = pageNo => {
        this.setState({currentPage:pageNo})
    }

    async componentDidMount(){
        try{
        const {data : playlists} = await getPlaylist()
        this.setState({playlists})
        }
        catch(ex){
            console.log(ex)
        }
        
    }

    render() {

        if(sessionStorage.getItem("id")){
            const {length:count} = this.state.playlists;

            const {playlists:allPlaylists,currentPage,pageSize} = this.state;
    
            const paginatedPlaylists = paginate(allPlaylists,currentPage,pageSize)
            
            const {onAdd} = this.props;
            return (
                <div className="songsList">   
                    <h2>Playlists</h2>
                    <button onClick={()=>{window.location.href=("/createPlaylist")}} className="createPlaylist">
                        Create Playlist
                    </button>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Playlist Name</th>
                            <th>Total Duration</th>
                            <th>No Of Songs</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedPlaylists.map(playlist =>(
                                <tr key={playlist._id} onClick={()=> viewSongs(playlist.playlist_name)}>
                                <td>{playlist.playlist_name}</td>
                                <td>{playlist.total_duration}:00</td>
                                <td>{playlist.no_of_songs}</td>
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
            const {length:count} = this.state.playlists;

            const {playlists:allPlaylists,currentPage,pageSize} = this.state;

            const paginatedPlaylists = paginate(allPlaylists,currentPage,pageSize)
            
            const {onAdd} = this.props;
            return (
                <div className="songsList">   
                    <h2>Playlists</h2>
                    
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Playlist Name</th>
                            <th>Total Duration</th>
                            <th>No Of Songs</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {paginatedPlaylists.map(playlist =>(
                                <tr key={playlist._id} onClick={()=> viewSongs(playlist.playlist_name)}>
                                <td>{playlist.playlist_name}</td>
                                <td>{playlist.total_duration}:00</td>
                                <td>{playlist.no_of_songs}</td>
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

export default ViewPlaylists;