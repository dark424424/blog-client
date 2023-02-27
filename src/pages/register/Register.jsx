import './register.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Validator from '../../components/validator/Validator';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        Validator({
            form: '#form-1',
            errorSelector: '.formMessage',
            rules: [
                Validator.isRequired('#fullname', 'Please fill this field'),
                Validator.isEmail('#email', 'This field must be a valid email address'),
                Validator.minLength('#password', 6, 'Password must be at least 6 characters'),
                Validator.isRequired('#password_confirmation', 'Please fill this field'),
                Validator.isConfirmed(
                    '#password_confirmation',
                    function () {
                        return document.querySelector('#form-1 #password').value;
                    },
                    'Password confirmation must exactly match with the password',
                ),
            ],
            onSubmit: function (data) {
                setIsValid(data);
            },
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        if (isValid) {
            try {
                const res = await axios.post('/api/auth/register', {
                    username,
                    email,
                    password,
                });
                res.data && window.location.replace('/login');
                setIsValid(false);
            } catch (err) {
                setError(true);
            }
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register Form</span>
            <form action="" className="registerForm" onSubmit={handleSubmit} id="form-1">
                <div className="registerFormGroup">
                    <label htmlFor="name" className="">
                        UserName
                    </label>
                    <input
                        id="fullname"
                        className="registerInput"
                        type="text"
                        placeholder="Enter your username...."
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="formMessage"></span>
                </div>
                <div className="registerFormGroup">
                    <label htmlFor="name" className="">
                        Email
                    </label>
                    <input
                        id="email"
                        className="registerInput"
                        type="text"
                        placeholder="Enter your email...."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="formMessage"></span>
                </div>
                <div className="registerFormGroup">
                    <label htmlFor="password" className="">
                        Password
                    </label>
                    <input
                        id="password"
                        className="registerInput"
                        type="password"
                        placeholder="Enter your password...."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="formMessage"></span>
                </div>
                <div className="registerFormGroup">
                    <label htmlFor="password_confirmation" className="">
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        className="registerInput"
                        type="password"
                        placeholder="Enter your password...."
                    />
                    <span className="formMessage"></span>
                </div>
                <button className="registerButton" type="submit">
                    Register
                </button>
            </form>
            <button className="registerLogin">
                <Link className="link" to="/login">
                    Login
                </Link>
            </button>
            {error && <span className="registerError">Something went wrong!</span>}
        </div>
    );
}
