import { Link } from "react-router-dom";

const PlantIndex = (props) => {
    return (
        <div className="plant-index-container" key={props.plant.id}>
            <div className="plant-index-img" style={{ backgroundImage: `url(${props.plant.image || "./images/default-plant.png"})` }}></div>
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    <h3 className="plant-text-name">{props.plant.name}</h3>
                    <p className="plant-text type">Type: {props.plant.type}</p>
                    <p className="plant-text">Location: {props.plant.room}</p>
                </div>
                {/* Link to PlantStatusDetails */}
                <Link to='/dashboard/plant-details' className="outline-btn grave">More Info</Link>
            </div>
        </div>
    )
}

export default PlantIndex;