import { useState } from "react";
import { Link } from "react-router-dom";
import PlantDetails from "./PlantDetails";
import StatusContainer from "./StatusContainer";

const PlantStatusContainer = (props) => {
    // NEED: GETPLANTS? HOW TO PASS PROPS.PLANTS?

    const [status, setStatus] = useState([]);

// UPDATE PLANT
    const updatePlant = async (idToUpdate, plantToUpdate) => {
        try {
            const apiResponse = await fetch(`http://localhost:8000/plants/${idToUpdate}/`, {
                // const apiResponse = await fetch(`https://plantpet-django-be.herokuapp.com/plants/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(plantToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse) {
                const newPlants = props.plants.map(plant => plant.id === idToUpdate ? plantToUpdate : plant)
                props.setPlants(newPlants)
            } else {
                props.setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

// DELETE PLANT
    const deletePlant = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`http://localhost:8000/plants/${idToDelete}/`, {
                // const apiResponse = await fetch(`https://plantpet-django-be.herokuapp.com/plants/${idToDelete}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse) {
                const newPlants = props.plants.filter(plant => plant.id !== idToDelete);
                props.setPlants(newPlants);
            } else {
                console.log(`Unable to delete Plant #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(`Deleting plant ID# ${idToDelete}`);
    }

// GET STATUS
    useEffect(() => {
        const getStatus = async () => {
            try {
                const apiResponse = await fetch("http://localhost:8000/status/");
                // const apiResponse = await fetch("https://plantpet-django-be.herokuapp.com/status/");
                const parsedResponse = await apiResponse.json();
                setStatus(parsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getStatus()
    }, []);

    return (
        <>
            <Hero></Hero>
            <div className="content-wrapper">
                <PlantDetails
                    updatePlant={updatePlant}
                    deletePlant={deletePlant}
                ></PlantDetails>
                <StatusContainer
                    status={status}
                    setStatus={setStatus}
                ></StatusContainer>
                <Link to="/dashboard" className="solid-btn">Back</Link>
            </div>
        </>
    )
}
export default PlantStatusContainer;