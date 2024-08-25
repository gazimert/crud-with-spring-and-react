import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    const navigate = useNavigate();

    const { id } = useParams()

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const { name, username, email } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        loadUser()
    }, [])

    const onSubmitFunc = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`, user)
        navigate("/");
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit User</h2>
                    <form onSubmit={onSubmitFunc}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Save</button>
                        <Link className='btn btn-outline-danger mx-2' to={"/"}>Back</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
