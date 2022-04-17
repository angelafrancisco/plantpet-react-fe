import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiUrl from "../../../apiConfig";
import Hero from "../hero";
import PlantDetails from "./PlantDetails";
import StatusNew from "./StatusNew";
import StatusDetails from "./StatusDetails";

const PlantStatusContainer = () => {
    const { id } = useParams(); // this is the plant id from Route Link
    const [plants, setPlants] = useState([]);
    const [plant, setPlant]= useState([]);
    const [allStatus, setAllStatus] = useState([]);
    const [newStatusServerError, setNewStatusServerError] = useState("");
    const [singlePlantStatus, setSinglePlantStatus] = useState([]);
    const [requestError, setRequestError] = useState("");

// GET ALL PLANTS + ALL STATUS
    useEffect(()=>{
        const getPlants = async () => {
            try {
                const apiResponse = await fetch(`${apiUrl}/plants`);
                const parsedResponse = await apiResponse.json();
                setPlants(parsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        const getPlantStatus = async ()=>{
            try {
                const statusApiResponse = await fetch(`${apiUrl}/status/`);
                const parsedStatusResponse = await statusApiResponse.json();
                setAllStatus(parsedStatusResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getPlants()
        getPlantStatus()
    }, []);

// GET 1 PLANT + ITS STATUS
    useEffect(()=>{
        const getPlantDetails = async () => {
            try {
                const plantApiResponse = await fetch(`${apiUrl}/plants/${id}`);
                const parsedPlantResponse = await plantApiResponse.json();
                setPlant(parsedPlantResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getPlantDetails()
        if(allStatus){
            setSinglePlantStatus(allStatus.filter(status => status.plant === parseInt(id)))
        }
    }, [allStatus, id])

// UPDATE 1 PLANT
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
            setPlant(parsedResponse)
            if (parsedResponse) {
                const newPlants = plants.map(plant => plant.id === idToUpdate ? plantToUpdate : plant)
                // debugger
                setPlants(newPlants)
            } else {
                setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
        console.log(`Updating ${plant.name} Plant # ${idToUpdate}`);
    }

// DELETE 1 PLANT
    const deletePlant = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/${idToDelete}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse) {
                const newPlants = plants.filter(plant => plant.id !== idToDelete);
                setPlants(newPlants);
                // HOW CAN I REDIRECT BACK TO '/dashboard' page?
            } else {
                console.log(`Unable to delete Plant #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(`Deleting plant ID# ${idToDelete}`);
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
            setSinglePlantStatus(parsedResponse)
            if (parsedResponse) {
                setAllStatus([...allStatus, newStatus]);
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
            console.log(parsedResponse)
            setSinglePlantStatus(parsedResponse)
            if (parsedResponse) {
                const newStatus = allStatus.map(status => status.id === idToUpdate ? statusToUpdate : status)
                setAllStatus(newStatus)
            } else {
                setRequestError(parsedResponse);
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
                const deleteStatus = allStatus.filter(status => status.id !== idToDelete);
                setAllStatus(deleteStatus);
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
                        key={plant.id}
                        plant={plant}
                        updatePlant={updatePlant}
                        deletePlant={deletePlant}
                        requestError={requestError}
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
                            {[...singlePlantStatus].reverse().map(status => 
                                <StatusDetails
                                    key={status.id}
                                    status={status}
                                    plant={plant}
                                    updateStatus={updateStatus}
                                    deleteStatus={deleteStatus}
                                    requestError={requestError}
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