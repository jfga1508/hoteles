import { useState, FormEvent } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../data/users';
import Header from '../layouts/Header.tsx';

export default function Login({ setToken }: { setToken: any }) {
    const [email, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setmessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const results = await loginUser({
            email,
            password,
        });

        if (results.token) setToken(results);
        if (results.error) setmessage(results.error);
    };
    return (
        <>
            <Header />
            <main>
                <div className='login-wrapper'>
                    <h1 className='mb-4'>Please Log In</h1>
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
                            {message && (
                                <p className='border bg-danger text-white d-inline-block p-1 mt-3'>
                                    {message}
                                </p>
                            )}
                            <br />
                            <button
                                className='btn btn-primary mt-3'
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};
