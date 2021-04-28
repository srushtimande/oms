import Axios from 'axios'

const url = "http://localhost:3000/musicSystem"

export function getUserProfile(id){
    console.log(id);
    return Axios.get(url+"/customerViewProfile?cust_id="+id)
}

export function editProfile(id,name,phone,password){
    return Axios.post(url+"/editProfileDetails",{
        cust_id: id,
        cust_name: name,
        phone: Number(phone),
        password: password
    }).then((response)=>{
       return response
    },(err)=>{
        return err
    })
}

export function deleteProfile(id){
    return Axios.get(url+"/deleteProfile?id="+id)
}
