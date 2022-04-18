import { useState } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../../../apiConfig";
import PlantNew from "./plantNew"
import PlantIndex from "./plantIndex";

const PlantContainer = (props) => {
    const [newPlantServerError, setNewPlantServerError] = useState("");

// == CREATE PLANT ======================================================================================== //
    const createNewPlant = async (newPlant) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/`, {
                method: 'POST',
                body: JSON.stringify(newPlant),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse); 
            // console.log(parsedResponse.success);
            // if (parsedResponse.success) {
            if (parsedResponse) {
                props.setPlants([...props.plants, newPlant]);
            } else {
                // setNewPlantServerError(parsedResponse.data);
                setNewPlantServerError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

// == UPDATE PLANT ========================================================================================== //
    const updatePlant = async (idToUpdate, plantToUpdate) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(plantToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse)
            // console.log(parsedResponse.success);
            // if (parsedResponse.success) {
            if (parsedResponse) {
                const newPlants = props.plants.map(plant => plant.id === idToUpdate ? plantToUpdate : plant)
                console.log(newPlants)
                props.setPlants(newPlants)
            } else {
                // props.setRequestError(parsedResponse.data);
                props.setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
        console.log(`Updating ${props.plant.name} Plant # ${idToUpdate}`);
    }

// == DELETE PLANT ========================================================================================== //
    const deletePlant = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/${idToDelete}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            // console.log(parsedResponse.success);
            // if (parsedResponse.success) {
            if (parsedResponse) {
                const newPlants = props.plants.filter(plant => plant.id !== idToDelete);
                console.log(newPlants)
                props.setPlants(newPlants);
            } else {
                console.log(`Unable to delete Plant #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
            props.setRequestError(err.message)
        }
        console.log(`Deleting plant ID# ${idToDelete}`);
    }

    return (
        <div className="plant-container">
            <h2 className="section-header plants">My Plants</h2>
            {/* Buttons for New Plant, Plant Graveyard */}
            <div className="btn-section plants">
                <PlantNew
                    key={`new-plant`}
                    createNewPlant={createNewPlant}
                    newPlantServerError={newPlantServerError}
                    setNewPlantServerError={setNewPlantServerError}
                ></PlantNew>
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