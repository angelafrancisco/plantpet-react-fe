import Features from "./Features";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="Home">
            <div className="home-container">
                <div className="left-text-box">
                    <h1 className="home-heading">A community for the plant-obsessed, plant newbies, and aspiring plant parents.</h1>
                    <Link to="/register" className="solid-btn">Join Today</Link>
                </div>
                <img src="./img/home.jpg" alt="mini cactus" className="home-img" />
            </div>
            <Features></Features>
        </div>
    )
}

export default Home;