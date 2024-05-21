import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'  // this used for req response from server to client and viceversa


function App() {
const [users,setUsers]= useState([])

const [name, setName] = useState()
const [age, setAge] =   useState()

  useEffect(()=>{
    axios.get("http://localhost:3000/getUser")   //fetching data from db using get user url
    .then((users)=>{
      setUsers(users.data)
    }).catch(e=> console.log(e))

  }, [])


  const Submit  =()=>{
    axios.post("http://localhost:3000/createUser", {name, age}) // sending the data to db using CreateUser url
    .then((users)=>{
      console.log(users)
    }).catch(e=> console.log(e))


  }
  

  return (
    <>
    <div className='center'>
    <h2>First Mern App</h2>
    {
      users.map(user=>{
        return <div>
          <h3> {user.name}</h3>
          <h3>{user.age}</h3>
        </div>
      })
    }
    <label>NAME:</label>
    <input type='text' onChange={(e)=>setName(e.target.value)}/>
    <br/>
    <label>Email</label>
    <input type="text" onChange={(e)=>setAge(e.target.value)}/> 

    <br/>

    <button onClick={Submit}>Create User</button>
    </div>
         </>
  )
}

export default App
