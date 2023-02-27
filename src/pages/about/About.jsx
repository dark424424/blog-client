import React from 'react';
import Header from '../../components/header/Header';
import './about.css';
import Footer from '../../components/footer/Footer';

export default function About() {
    return (
        <>
            <Header />
            <div className="about">
                <div className="aboutLeft">
                    <img
                        className="aboutImg"
                        src="https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt=""
                    />
                </div>
                <div className="aboutDesc">
                    <div className="aboutDescTitle">About Me</div>
                    <div className="aboutDescSecondTitle">
                        Developer<span> & Designer</span>
                    </div>
                    <div className="aboutDescText">
                        I am a front-end web developer. I hope i can bring to every people clean code and beautiful
                        design. This project using HTML CSS ReactJS and NodeJS. Blogging is a great way to show your
                        talents and interests to prospective employers, while adding an edge to your resume. If you blog
                        consistently it shows your dedication, passions and creativity – all of which are key attributes
                        employers look for in job candidates.
                    </div>
                    <button className="aboutDescBtn">Let's Talk</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
