import { useState } from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing)
    }
    return (
        <nav>
            <div className="nav-container">
                <Link to="/" className="Logo"><img src="favicon.ico" alt="PlantPet Logo" />PlantPet</Link>
            </div>
            <div className="nav-container">
                {/* mobile hamburger nav */}
                <div onClick={toggleShowing} className="nav-hamburger-container">
                    <div className="nav-hamburger bar1"></div>
                    <div className="nav-hamburger bar2"></div>
                    <div className="nav-hamburger bar3"></div>
                </div>
                {props.isLoggedIn ?
                    // user logged in nav links
                    <ul className="nav-links-list isloggedin">
                        <li><Link to="/dashboard" className="nav-link">Home</Link></li>
                        <li><Link to="/dashboard" className="nav-link">My Plants</Link></li>
                        <li><Link to="/dashboard" className="nav-link">Search</Link></li>
                        <li><Link to="/" className="logout"><button onClick={() => props.setIsLoggedIn(false)} className="solid-btn">Logout</button></Link></li>
                    </ul>
                    :
                    // not logged in nav links
                    <ul className="nav-links-list guest">
                        <li><Link to="/" className="nav-link">Features</Link></li>
                        <li><Link to="/" className="nav-link">Community</Link></li>
                        <li><Link to="/" className="nav-link">About</Link></li>
                        <li><Link to="/login" className="outline-btn">Login</Link></li>
                        <li><Link to="/register" className="solid-btn">Register</Link></li>
                    </ul>
                }
            </div>
        </nav >
    )
}

export default Header;