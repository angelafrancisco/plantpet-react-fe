import { useState } from "react";
import { Link } from "react-router-dom";
import PlantNew from "./plantNew"
import PlantIndex from "./plantIndex";

const PlantContainer = (props) => {
    const [newPlantServerError, setNewPlantServerError] = useState("");

// CREATE PLANT
    const createNewPlant = async (newPlant) => {
        try {
            const apiResponse = await fetch("http://localhost:8000/plants/", {
            // const apiResponse = await fetch("https://plantpet-django-be.herokuapp.com/plants/", {
                method: "POST",
                body: JSON.stringify(newPlant),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse) {
                props.setPlants([...props.plants, newPlant]);
            } else {
                setNewPlantServerError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="plant-container">
            <h2 className="section-header plants">My Plants</h2>
            {/* Buttons for New Plant, Plant Graveyard */}
            <div className="btn-section plants">
                <PlantNew
                    createNewPlant={createNewPlant}
                    newPlantServerError={newPlantServerError}
                    setNewPlantServerError={setNewPlantServerError}
                ></PlantNew>
                {/* link placeholder */}
                <Link to='/dashboard' className="outline-btn grave">Plant Graveyard</Link>
            </div>
            {/* Section displaying Plant Index */}
            {props.plants.length > 0 ?
                <div className="grid-container plants">
                    {props.plants.map((plant) => {
                        return <PlantIndex
                            key={plant.id}
                            plant={plant}
                            updatePlant={updatePlant}
                            deletePlant={deletePlant}
                        ></PlantIndex>
                    })}
                </div>
                :
                < div className="grid-container plants">
                    <div className="message-box">
                        <h3 className="message-text">Looks like you haven't added any plants yet!</h3>
                    </div>
                </div>
            }
        </div >
    )
}

export default PlantContainer;