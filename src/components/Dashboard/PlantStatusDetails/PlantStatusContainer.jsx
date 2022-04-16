import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiUrl from "../../../apiConfig";
import Hero from "../hero";
import PlantDetails from "./PlantDetails";
import StatusNew from "./StatusNew";
import StatusDetails from "./StatusDetails";

const PlantStatusContainer = () => {
    const { id } = useParams(); // this is the plant id from Route Link
    const [plant, setPlant]= useState([]);
    const [status, setStatus] = useState([]);
    const [newStatusServerError, setNewStatusServerError] = useState("");
    const [singlePlantStatus, setSinglePlantStatus] = useState([]);

// GET INFO ON 1 PLANT + ALL STATUS
    useEffect(()=>{
        const getPlantDetails = async ()=>{
            try {
                const plantApiResponse = await fetch(`${apiUrl}/plants/${id}`);
                const parsedPlantResponse = await plantApiResponse.json();
                setPlant(parsedPlantResponse);
            } catch (err) {
                console.log(err);
            }
        }
        const getPlantStatus = async ()=>{
            try {
                const statusApiResponse = await fetch(`${apiUrl}/status/`);
                const parsedStatusResponse = await statusApiResponse.json();
                setStatus(parsedStatusResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getPlantDetails()
        getPlantStatus()
    }, [id]);

// GET SINGLE PLANT STATUS
    useEffect(()=>{
        setSinglePlantStatus(status.filter(pstatus => pstatus.plant === id))
            
    }, [status, id])

// UPDATE 1 PLANT
    const updatePlant = async (plantToUpdate) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/${id}/`, {
                method: "PUT",
                body: JSON.stringify(plantToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse)
            if (parsedResponse) {
                // const newPlant = plant.map(plant => plant.id === id ? plantToUpdate : plant)
                // setPlant(newPlant)
                setPlant(plantToUpdate)
            // } else {
            //     setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
        console.log(`Updating ${plant.name} Plant # ${id}`);
    }

// DELETE 1 PLANT
    const deletePlant = async () => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/${id}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse) {
            //     const newPlant = plant.filter(plant => plant.id !== idToDelete);
            //     setPlant(newPlant);
                setPlant(parsedResponse)
            // } else {
            //     console.log(`Unable to delete Plant #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(`Deleting plant ID# ${id}`);
    }

// CREATE STATUS
    const createNewStatus = async (newStatus) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/status/`, {
                method: "POST",
                body: JSON.stringify(newStatus),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse) {
                setStatus([...status, newStatus]);
            } else {
                setNewStatusServerError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

// UPDATE 1 STATUS
    const updateStatus = async (idToUpdate, statusToUpdate) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/status/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(statusToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse) {
                const newStatus = status.map(status => status.id === idToUpdate ? statusToUpdate : status)
                setStatus(newStatus)
            // } else {
            //     setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

// DELETE 1 STATUS
    const deleteStatus = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/status/${idToDelete}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse) {
                const deleteStatus = status.filter(status => status.id !== idToDelete);
                setStatus(deleteStatus);
            } else {
                console.log(`Unable to delete Status #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(`Deleting Status ID# ${idToDelete}`);
    }

    return (
        <>
            <Hero></Hero>
            <div className="content-wrapper">
                <div className="plant-container">
                    <h2 className="section-header plants">Plant Details:</h2>
                    <div className="btn-section plants">
                        <Link to="/dashboard" className="solid-btn">Back</Link>
                    </div>
                    <PlantDetails
                        key={id}
                        plant={plant}
                        updatePlant={updatePlant}
                        deletePlant={deletePlant}
                    ></PlantDetails>
                </div>
                <div className="plant-container">
                    <h2 className="section-header plants">Plant Status:</h2>
                    <div className="btn-section plants">
                        <StatusNew
                            plant={plant}
                            createNewStatus={createNewStatus}
                            newStatusServerError={newStatusServerError}
                        ></StatusNew>
                    </div>

                    {singlePlantStatus.length > 0 ?
                        <div className="grid-container plants">
                            {singlePlantStatus.map(pstatus => 
                                <StatusDetails
                                    key={pstatus.id}
                                    status={pstatus}
                                    plant={plant}
                                    updateStatus={updateStatus}
                                    deleteStatus={deleteStatus}
                                ></StatusDetails>
                            )}
                        </div>
                    :
                        <div className="grid-container plants">
                            <div className="message-box">
                                <h3 className="message-text">Looks like you haven't added a new status for this plant yet!</h3>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default PlantStatusContainer;