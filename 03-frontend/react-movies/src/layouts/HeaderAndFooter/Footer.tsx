import { Link, NavLink } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
    return(
        <div className="footer-container" style={{background: "#0f0f0f"}}>
            <div className="footer-wrapper">
                <footer className='footer-content'>
                    <div className="footer-row-item">
                        <p className='contact-us'>Movie App, Inc</p>
                    </div>
                    <div className="footer-row-item links">
                        <ul className='links-list'>
                            <li className='links-list-item'>
                                <Link to="#">FAQ</Link>
                            </li>
                            <li className='links-list-item'>
                                <Link to="/messages">Contact us</Link>
                            </li>
                            <li className='links-list-item'>
                                <Link to="/home">Home</Link>
                            </li>
                            <li className='links-list-item'>
                                <Link to="/search">Search Movies</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-row-item">
                        <p className='contact-us'>Coreflix</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};