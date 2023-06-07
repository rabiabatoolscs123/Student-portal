import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function Table() {
    const[data, setData]=useState([])
    const[name, setName]=useState('')
    const[email, setEmail]=useState('')
    const[uname, usetName]=useState('')
    const[uemail, usetEmail]=useState('')
    const[editId, setEditID]=useState(-1)
    
    useEffect(()=>{

        axios.get(' http://localhost:8002/student/').then
        (res =>setData(res.data))
        .catch(er => console.log(er));
    },[])
    const handleSubmit= (event) => {
        event.preventDefault();
        const id =data.length +1;
        axios.post(' http://localhost:8002/student/', {id: id , name: name, email: email})
        .then(res => {
            window.reload(res);
        })
        .catch(er => console.log(er));
    }
    const handleEdit =(id)=> {
       
        axios.get(' http://localhost:8002/student/' +id)
        .then (res =>{
            console.log(res.data)
           
            usetName(res.data.name)
            usetEmail(res.data.email)

        })
        .catch(er => console.log(er));
          setEditID(id)
    }
    const handleUpdate = () => {
        axios.put('http://localhost:8002/student/'+ editId, {id: editId, name: uname , email: uemail})
        .then(res=> {
            console.log(res);
            window.reload();
            setEditID(-1);
        }).catch(err => console.log(err));
    }
    const handleDelete= (id) => {
        axios.delete(' http://localhost:8002/student/' +id)
        .then (res =>{
            window.reload();

        })
        .catch(er => console.log(er));
    }
  return (
    <div className='container'>
        <div className='form-div'>
         <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter Name' onChange={e =>setName(e.target.value)}/>
            <input type='text' placeholder='Enter Email' onChange={e =>setEmail(e.target.value)}/>
            <button>Add</button>

         </form>
         </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
            </thead>
            <tbody style={{ }}>
                {
                    data.map((user, index) =>(
                        user.id ===editId ?
                        <tr>
                             <td>{user.id}</td>
                             <td><input type='text' value={uname} onChange={e =>usetName(e.target.value)}/></td>
                             <td><input type='text' value={uemail} onChange={e =>usetEmail(e.target.value)}/></td>
                             <td><button onClick={handleUpdate}>Update</button></td>
                        </tr>
                        :
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
        
    </div>
  )
}

export default Table