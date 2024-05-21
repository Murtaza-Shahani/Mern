import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [updateName, setUpdateName] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:3000/getUser")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(error));
    };

    const handleCreateUser = () => {
        axios.post("http://localhost:3000/createUser", { name, age })
            .then(response => {
                setName('');
                setAge('');
                fetchUsers();
            })
            .catch(error => console.error(error));
    };

    const handleUpdateUser = () => {
        axios.put(`http://localhost:3000/updateUser/${updateName}`, { name, age })
            .then(response => {
                setName('');
                setAge('');
                setUpdateName('');
                fetchUsers();
            })
            .catch(error => console.error(error));
    };

    const handleDeleteUser = (name,age) => {
        axios.delete(`http://localhost:3000/deleteUser/${name,age}`)
            .then(response => {
                fetchUsers();
            })
            .catch(error => console.error(error));
    };

    const handleEditUser = (user) => {
        setName(user.name);
        setAge(user.age);
        setUpdateName(user.name);
    };

    return (
        <>
            <div className='center'>
                <h2>First Mern App</h2>
                {
                    users.map(user => (
                        <div key={user._id}>
                            <h3> {user.name}</h3>
                            <h3>{user.age}</h3>
                            <button onClick={() => handleEditUser(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.name)}>Delete</button>
                        </div>
                    ))
                }
                <label>Name:</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Age:</label>
                <input type='text' value={age} onChange={(e) => setAge(e.target.value)} />
                <br />
                {updateName ? (
                    <button onClick={handleUpdateUser}>Update User</button>
                ) : (
                    <button onClick={handleCreateUser}>Create User</button>
                )}
            </div>
        </>
    );
}

export default App;
