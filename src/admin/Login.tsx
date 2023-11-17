import { useState, FormEvent } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../data/users';

export default function Login({ setToken }: { setToken: any }) {
    const [email, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const results = await loginUser({
            email,
            password,
        });

        if (results) setToken(results);
    };
    return (
        <div className='login-wrapper'>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input
                        type='email'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button className='btn btn-primary mt-3' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};
