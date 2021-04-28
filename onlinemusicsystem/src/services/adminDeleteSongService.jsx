import Axios from 'axios';
 
const url='http://localhost:3000/musicSystem'

export function deleteSong(id,name){
    console.log(id,name)
    return Axios.post(url+'/deleteSong/',{
        sId:id,
        sName:name
    }).then((response)=>{
        //return true;
        console.log(response)
    },
    (err)=>{
        return err;
    })
}