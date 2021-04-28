import React, { Component } from 'react'
import { getUsers } from '../services/adminViewUserService'
import SingleUser from './singleUser'

class viewUsers extends Component {

    constructor(){
        super()
        this.state={
            users:[]
        }
    }
    
    async componentDidMount(){
        try{
            const {data:users}=await getUsers()
            this.setState({users})
        }catch(ex){
          console.log(ex)  
        }
    }

    render() {
        
        let users = <p>No Users in the database</p>
        console.log(this.state.users)
        if(this.state.users.length>0){
              users = this.state.users.map(user=>( <SingleUser key={user._id} 
                                                              user={user} />)
              )
        }
        return (
                <div>{users}</div>
        )
    }
}

export default viewUsers