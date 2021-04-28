import React, { Component } from 'react';
import './../songsComponent/songs.css'
import { playMusic } from '../services/songService';
import { paginate } from './../utils/paginate';
import Pagination from '../songsComponent/Pagination'
import { getSongs } from './../services/playlistService';

class ViewSongsFromPlaylist extends Component {
    queryParams = new URLSearchParams(window.location.search);
    constructor(){
        super()
        this.state={
            a:[],
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
        var id = this.queryParams.get('playlist_name')
        const {data : songs} = await getSongs(id)
        var a = songs[0].Songs_Details
        this.setState({a})
        // console.log(a)
        }
        catch(ex){
            console.log(ex)
        }
        
    }

    render() {

        // console.log(this.state.a)
        const {length:count} = this.state.a;
        //const {songs} = this.state;
        const {a:allSongs,currentPage,pageSize} = this.state;

        const paginatedSongs = paginate(allSongs,currentPage,pageSize)
        
        return (
            <div className="songsList">
                <h2>Songs</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Song Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {paginatedSongs.map(song =>(
                            <tr key={song._id}>
                            <td>{song.song_name}</td>
                            <td>
                                <button className="play-btn" onClick={() => playMusic(song)}>
                                &#9658; 
                                </button>
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

export default ViewSongsFromPlaylist;