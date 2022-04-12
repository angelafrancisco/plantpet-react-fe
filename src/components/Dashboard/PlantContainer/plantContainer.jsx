import { useState } from "react";
import { Link } from "react-router-dom";
import PlantNew from "./plantNew"
import PlantIndex from "./plantIndex";

const PlantContainer = (props) => {
    const [newPlantServerError, setNewPlantServerError] = useState("");

    // CREATE
    const createNewPlant = async (newPlant) => {
        try {
            // const apiResponse = await fetch("http://localhost:3001/plants", {
            const apiResponse = await fetch("https://plantpet-api.herokuapp.com/plants", {
                method: "POST",
                body: JSON.stringify(newPlant),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // debugger;
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse.success) {
                props.setPlants([...props.plants, newPlant]);
            } else {
                setNewPlantServerError(parsedResponse.data);
                // for future could: refactor state from newPlantForm child to here, this is where we'd know if it worked or not
            }
        } catch (err) {
            debugger;
            console.log(err)
        }
    }

    // UPDATE
    const updatePlant = async (idToUpdate, plantToUpdate) => {
        try {
            // const apiResponse = await fetch(`http://localhost:3001/plants/${idToUpdate}`, {
            const apiResponse = await fetch(`https://plantpet-api.herokuapp.com/plants/${idToUpdate}`, {
                method: "PUT",
                body: JSON.stringify(plantToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            // debugger
            if (parsedResponse.success) {
                const newPlants = props.plants.map(plant => plant._id === idToUpdate ? plantToUpdate : plant)
                props.setPlants(newPlants)
            } else {
                props.setRequestError(parsedResponse.data);
            }
        } catch (err) {
            console.log(err)
        }
    }

    // DELETE
    const deletePlant = async (idToDelete) => {
        try {
            // const apiResponse = await fetch(`http://localhost:3001/plants/${idToDelete}`, {
            const apiResponse = await fetch(`https://plantpet-api.herokuapp.com/plants/${idToDelete}`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse.success) {
                const newPlants = props.plants.filter(plant => plant._id !== idToDelete);
                props.setPlants(newPlants);
            } else {
                // todo: handle unsuccessful delete
            }
        } catch (err) {
            console.log(err);
            props.setRequestError(err.message)
        }
        console.log("deleting plant ID#" + idToDelete);
    }
    // console.log(props.plants.length)
    return (
        <div className="plant-container">
            <h2 className="section-header plants">My Plants</h2>
            <div className="btn-section plants">
                <PlantNew
                    createNewPlant={createNewPlant}
                    newPlantServerError={newPlantServerError}
                ></PlantNew>
                {/* link placeholder */}
                <Link to='/dashboard' className="outline-btn grave">Plant Graveyard</Link>
            </div>
            {props.plants.length === 0 ?
                < div className="grid-container plants">
                    <div className="message-box">
                        <h3 className="message-text">Looks like you haven't added any plants yet!</h3>
                    </div>
                </div>
                :
                <div className="grid-container plants">
                    {props.plants.map((plant) => {
                        return <PlantIndex
                            key={plant._id}
                            plant={plant}
                            updatePlant={updatePlant}
                            deletePlant={deletePlant}
                        ></PlantIndex>
                    })}
                </div>
            }
        </div >
    )
}

export default PlantContainer;