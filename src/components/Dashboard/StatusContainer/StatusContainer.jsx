import { useState } from "react";
import apiUrl from "../../../apiConfig";
import StatusNew from "./StatusNew";
import StatusIndex from "./StatusIndex";

const StatusContainer = (props) => {
    const [newStatusServerError, setNewStatusServerError] = useState("");

// == CREATE STATUS =========================================================================== //
    const createNewStatus = async (newStatus) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/api/status/`, {
                method: "POST",
                body: JSON.stringify(newStatus),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            // console.log(parsedResponse);
            props.setAllStatus([...props.allStatus, parsedResponse]);
        } catch (err) {
            setNewStatusServerError(err)
            console.log(err)
        }
    }

// == UPDATE STATUS ============================================================================================ //
    const updateStatus = async (idToUpdate, statusToUpdate) => {
        try {
            await fetch(`${apiUrl}/api/status/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(statusToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const newStatus = props.allStatus.map(status => status.id === idToUpdate ? statusToUpdate : status)
            props.setAllStatus(newStatus)
        } catch (err) {
            props.setRequestError(err)
            console.log(err)
        }
        // console.log(`Updating Status # ${idToUpdate}`);
    }

// == DELETE STATUS =============================================================================================== //
    const deleteStatus = async (idToDelete) => {
        try {
            await fetch(`${apiUrl}/api/status/${idToDelete}/`, {
                method: "DELETE"
            })
            const newStatus = props.allStatus.filter(status => status.id !== idToDelete);
            props.setAllStatus(newStatus);
        } catch (err) {
            console.log(err);
            console.log(`Unable to delete Status #${idToDelete}`)
        }
    }

    return (
        <div className="task-container">
            <h2 className="section-header task">Plant Status</h2>
            {/* Button for New Status */}
            <div className="btn-section task">
                <StatusNew
                    key={`status-new`}
                    plants={props.plants}
                    createNewStatus={createNewStatus}
                    newStatusServerError={newStatusServerError}
                    setNewStatusServerError={setNewStatusServerError}
                ></StatusNew>
            </div>
            {/* Section displaying Status Index */}
            {props.allStatus.length > 0 ?
                <div className="grid-container task">
                    {props.allStatus.map((status) =>{
                        return <StatusIndex
                            key={status.id}
                            status={status}
                            plants={props.plants}
                            updateStatus={updateStatus}
                            deleteStatus={deleteStatus}
                        ></StatusIndex>
                    })}
                </div>
            :
                <div className="grid-container task">
                    <div className="message-box">
                        <h3 className="message-text">Looks like you haven't added any plant statuses!</h3>
                    </div>
                </div>
            }
        </div>
    )
}
export default StatusContainer;