import React from 'react';
import './header.css';
export default function Header() {
    return (
        <div className="header">
            <div className="headerTitle">
                <span className="headerTitleSm">Mystery Stories</span>
                <span className="headerTitleLg">Web</span>
            </div>
            <img src="https://wallpaperaccess.com/full/437732.jpg" alt="" className="headerImg" />
        </div>
    );
}
