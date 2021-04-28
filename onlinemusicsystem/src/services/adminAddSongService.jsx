import Axios from 'axios'

const url='http://localhost:3000/musicSystem'

export function addSongs(songName,songGenre,songDuration,songAlbumName,songReleaseDate,artistId){
    // console.log(songName,songGenre,songDuration,songAlbumName,songReleaseDate,artistId)
    return Axios.post(url+'/addSong',{
        sName:songName,
        sGenre:songGenre,
        sDuration:songDuration,
        sAlbum:songAlbumName,
        sReleaseYear:songReleaseDate,
        sArtistId:artistId
    })
}

export function getArtist(){
    return Axios.get(url+"/getArtist")
}