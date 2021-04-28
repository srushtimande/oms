import Axios from 'axios'

const url='http://localhost:3000/musicSystem'

export function getUsers(){
    return Axios.get(url+'/viewUserDetails')
}