import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.css';
import Validator from '../../components/validator/Validator';

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        Validator({
            form: '.loginForm',
            errorSelector: '.loginFormMessage',
            rules: [
                Validator.isRequired('.loginInput', 'Please fill this field'),
                Validator.minLength('.loginInputPassword', 6, 'Password must be at least 6 characters'),
            ],
            onSubmit: function (data) {
                setIsValid(data);
            },
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid) {
            dispatch({ type: 'LOGIN_START' });
            try {
                const res = await axios.post('/api/auth/login', {
                    username: userRef.current.value,
                    password: passwordRef.current.value,
                });
                setIsValid(false);
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            } catch (err) {
                dispatch({ type: 'LOGIN_FAILURE' });
            }
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login Form</span>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <div className="loginFormInput">
                    <label htmlFor="" className="">
                        Username
                    </label>
                    <input className="loginInput" type="text" placeholder="Enter your username...." ref={userRef} />
                    <span className="loginFormMessage"></span>
                </div>
                <div className="loginFormInput">
                    <label htmlFor="" className="">
                        Password
                    </label>
                    <input
                        className="loginInput loginInputPassword"
                        type="password"
                        placeholder="Enter your password...."
                        ref={passwordRef}
                    />
                    <span className="loginFormMessage"></span>
                </div>
                <button className="loginButton" type="submit" disabled={isFetching}>
                    Login
                </button>
            </form>
            <button className="loginRegister">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
        </div>
    );
}
