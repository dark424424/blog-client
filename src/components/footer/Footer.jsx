import './footer.css';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <div className="footer">
            <div className="footerTitle">Newbie Developer</div>
            <div className="footerDesc">
                Mystery Stories Blog is a blog website where you find stories about mythological and legendary animals
                and a place to share your own stories with others.
            </div>
            <ul className="footerSocial">
                <li className="footerSocialItem">
                    <i className="footerSocialIcon fa-brands fa-facebook-f"></i>
                </li>
                <li className="footerSocialItem">
                    <i className="footerSocialIcon fa-brands fa-twitter"></i>
                </li>
                <li className="footerSocialItem">
                    <i className="footerSocialIcon fa-brands fa-google-plus-g"></i>
                </li>
                <li className="footerSocialItem">
                    <i className="footerSocialIcon fa-brands fa-pinterest-p"></i>
                </li>
            </ul>
            <ul className="footerEnding">
                <li className="footerEndingItem">
                    <Link className="link" to={`/`}>
                        HOME
                    </Link>
                </li>
                <li className="footerEndingItem">
                    <Link className="link" to={`/`}>
                        ABOUT
                    </Link>
                </li>
                <li className="footerEndingItem">
                    <Link className="link" to={`/`}>
                        CONTACT
                    </Link>
                </li>
                <li className="footerEndingItem">
                    <Link className="link" to={`/write`}>
                        WRITE
                    </Link>
                </li>
            </ul>
            <div className="footerAuthor">
                <span>Design By - Lama Dev</span>
                <span>Copyright @2023</span>
            </div>
        </div>
    );
}
