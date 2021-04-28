import Axios from 'axios'

const url='http://localhost:3000/musicSystem'

export function getSongs(){
    return Axios.get(url+'/customerViewSongs')
}


export function playMusic( song ){
    window.location.href=("/player?song="+song.song_name);
}