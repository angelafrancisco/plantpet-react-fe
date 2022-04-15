import { useState } from "react";
import StatusDetails from "./StatusDetails";

const StatusContainer = (props) => {
    const [newStatusServerError, setNewStatusServerError] = useState("");

// CREATE STATUS
    const createNewStatus = async (newStatus) => {
        try {
            const apiResponse = await fetch("http://localhost:8000/status/", {
                // const apiResponse = await fetch("https://plantpet-django-be.herokuapp.com/status/", {
                method: "POST",
                body: JSON.stringify(newStatus),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse) {
                props.setStatus([...props.status, newStatus]);
            } else {
                setNewStatusServerError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

    // UPDATE STATUS
    const updateStatus = async (idToUpdate, statusToUpdate) => {
        try {
            const apiResponse = await fetch(`http://localhost:8000/status/${idToUpdate}/`, {
                // const apiResponse = await fetch(`https://plantpet-django-be.herokuapp.com/status/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(statusToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            if (parsedResponse) {
                const newStatus = props.status.map(status => status.id === idToUpdate ? statusToUpdate : status)
                props.setStatus(newStatus)
            } else {
                props.setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

// DELETE STATUS
    const deleteStatus = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`http://localhost:8000/status/${idToDelete}/`, {
                // const apiResponse = await fetch(`https://plantpet-django-be.herokuapp.com/status/${idToDelete}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse) {
                const newStatus = props.status.filter(status => status.id !== idToDelete);
                props.setStatus(newStatus);
            } else {
                console.log(`Unable to delete Status #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(`Deleting Status ID# ${idToDelete}`);
    }

    return (
        <div className="plant-container">
            <h2 className="section-header plants">Plant Status:</h2>
            <div className="btn-section plants">
                <StatusNew
                    createNewStatus={createNewStatus}
                    newStatusServerError={newStatusServerError}
                    setNewStatusServerError={setNewStatusServerError}
                ></StatusNew>
            </div>
            {/* Section displaying Plant Status for specific Plant Id */}
            {props.status.length > 0 ?
                <div className="grid-container plants">
                    {/* NEED TO CHANGE THIS TO QUERY status.plant === plant.id */}
                    {props.status.map((status) => {
                        return <StatusDetails
                            key={status.id}
                            status={status}
                            updateStatus={updateStatus}
                            deleteStatus={deleteStatus}
                        ></StatusDetails>
                    })}
                </div>
                :
                < div className="grid-container plants">
                    <div className="message-box">
                        <h3 className="message-text">Looks like you haven't added a new status for this plant yet!</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export default StatusContainer;