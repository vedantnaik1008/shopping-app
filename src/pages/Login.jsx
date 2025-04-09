import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                'https://fakestoreapi.com/auth/login',
                {
                    username,
                    password
                }
            );

            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                navigate('/products');
            } else {
                setError('Invalid username or password.');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className='login-form'>
                <h2>Login</h2>
                {error && <p className='error'>{error}</p>}

                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;
