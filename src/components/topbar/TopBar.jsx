import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
    const { user, dispatch } = useContext(Context);

    const PF = 'https://blog-fire.herokuapp.com/images/';
    const [clicked, setClicked] = useState(false);
    const listRef = useRef();

    const handleClick = () => {
        listRef.current.classList.toggle('navActive');
        if (!clicked) {
            setClicked(true);
        } else {
            setClicked(false);
        }
    };

    const handleLogout = (e) => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-solid fa-flask"></i>
                <i className="topIcon fa-brands fa-square-twitter"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
                <i className="topIcon fa-brands fa-square-pinterest"></i>
            </div>

            <div className="topCenter hideOnMobile hideOnTablet ">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to={`/`}>HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to={`/about`}>ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to={`/`}>CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to={`/write`}>WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className="topRight hideOnMobile hideOnTablet">
                {user ? (
                    <Link to="/settings">
                        <img className="topImage" src={PF + user.profilePicture} alt="" />
                    </Link>
                ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link to={`/login`}>LOGIN</Link>
                        </li>
                        <li className="topListItem">
                            <Link to={`/register`}>REGISTER</Link>
                        </li>
                    </ul>
                )}
                {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
            </div>

            <div className="topMobile" onClick={handleClick}>
                <button className="topMobileButton">
                    {clicked ? (
                        <i className="topMobileIcon fa-solid fa-x"></i>
                    ) : (
                        <i className="topMobileIcon fa-solid fa-bars"></i>
                    )}
                </button>

                <ul className="topMobileList" ref={listRef}>
                    {user ? (
                        <li className="topMobileListItem">
                            {/* <img className="topMobileListImage" src={PF + user.profilePicture} alt="" /> */}
                            <Link to={`/settings`}>SETTING</Link>
                        </li>
                    ) : (
                        <>
                            <li className="topMobileListItem">
                                <Link to={`/login`}>LOGIN</Link>
                            </li>
                            <li className="topMobileListItem">
                                <Link to={`/register`}>REGISTER</Link>
                            </li>
                        </>
                    )}
                    <li className="topMobileListItem">
                        <Link to={`/`}>HOME</Link>
                    </li>
                    <li className="topMobileListItem">
                        <Link to={`/about`}>ABOUT</Link>
                    </li>
                    <li className="topMobileListItem">
                        <Link to={`/`}>CONTACT</Link>
                    </li>
                    <li className="topMobileListItem">
                        <Link to={`/write`}>WRITE</Link>
                    </li>
                    {user && (
                        <li className="topMobileListItem" onClick={handleLogout}>
                            LOGOUT
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
