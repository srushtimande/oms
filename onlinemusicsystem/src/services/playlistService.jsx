import Axios from 'axios'
import { functions } from 'lodash'

const url="http://localhost:3000/musicSystem"

export function getPlaylist(){
    return Axios.get(url+'/adminViewPlaylists')
}

export function viewSongs(playlist){
    Axios.post(url+"/viewSongsOfPlaylist", {
        playlist_name: playlist
    }).then((response)=>{
        window.location.href=("/viewSongsFromPlaylist?playlist_name="+playlist)
    },(error)=>{
        console.log(error)
    })    
}

export function getSongs(name){
    console.log(name)
    return Axios.post(url+'/viewSongsOfPlaylist', {playlist_name: name})
}

export function createPlaylist(playlistName,custId){
    return Axios.post(url+'/createPlaylist',{
        pName:playlistName,
        creatorId:custId   
    }).then((response)=>{                       //response is what database is giving to the function
        if(response){
            return true;
        }
        return false
    },(err)=>{                                  //err is any error that database found and passed 
        return false;
    })
}

export function selectPlaylist(){
    return Axios.get(url+"/selectPlaylist?id="+sessionStorage.getItem("id"))
}

export function addToPlaylist(sid,pid,dur){
    return Axios.post(url+"/addToPlaylist",{
        cust_id: sessionStorage.getItem("id"),
        song_id: sid,
        playlist_id: pid,
        song_duration: dur
    }).then((response)=>{
        console.log(response.data)
        if(response.data=='1'){
            alert("Song added to your Playlist");
        }
        else if(response.data=='2'){
            alert("Song is already added to this Playlist")
        }
        else{
            alert("Something went wrong");
        }
    },
    (error)=>{
        return error
    })
}
