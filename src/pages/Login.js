import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function Login() {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('');
    const [authData, setAuthData] = useState({});
    const navigate = useNavigate();

    const authCollectionRef = collection(db, 'authentication')

    const getAuthData = async () => {
        const snapshot = await getDocs(authCollectionRef);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAuthData(data[0]);
    };


    useEffect(() => {
        getAuthData();
    }, [])

    const handleLogin = () => {
        if (!email || !password) {
            alert('Please enter email and password')
            return
        }
    
        if (authData.email === email && authData.password === password) {
            navigate('/AdminPanel', {state:true})
        } else {
            alert('Invalid Credentials')
        }
    }
    return (
        <div className='loginPage'>
            <div className='loginBox'>
                <div className="loginHeading">Admin Login</div>
                <div className="loginWarning">Note: This is only for admin.</div>
                <TextField
                    label='Email'
                    variant='outlined'
                    size='normal'
                    value={email}
                    fullWidth
                />
                <TextField
                    label='Password'
                    variant='outlined'
                    size='normal'
                    value={password}
                    // type='password'
                    onChange={(e) => setPassword((e.target.value))}
                    fullWidth
                />
                <Button
                    variant='contained'
                    size='large'
                    onClick={handleLogin}
                >Login </Button>
            </div>
        </div>
    )
}
