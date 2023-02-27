import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function SideBar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get(`/api/categories`);
            // console.log(res.data);
            setCats(res.data);
        };
        getCats();
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <div className="sidebarTitle">ABOUT US</div>
                <img
                    className="sidebarImg"
                    src="https://t3.ftcdn.net/jpg/05/48/85/94/360_F_548859458_nSIXtT9ML7ksTgjRAOmLsqP3egKc1prC.jpg"
                    alt=""
                />
                <p className="sidebarText">
                    “I'll tell you a secret. Old storytellers never die. They disappear into their own story.” - Vera
                    Nazarian, author
                </p>
            </div>
            <div className="sidebarItem">
                <div className="sidebarTitle">CATEGORIES</div>
                <ul className="sidebarList">
                    {cats.map((c, index) => (
                        <Link to={`/?cat=${c.name}`} className="link sidebarListItem" key={index}>
                            <li> {c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-solid fa-flask"></i>
                    <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                </div>
            </div>
        </div>
    );
}
