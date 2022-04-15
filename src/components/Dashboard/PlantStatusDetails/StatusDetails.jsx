import { useState } from "react";
import PlantModal from "./plantModal";

const StatusDetails = (props) =>{
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });
    const [updateStatus, setUpdateStatus] = useState(props.status);
    const handleInputChange = (e) => {
        setUpdateStatus({
            ...updateStatus,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdateStatus = (e) => {
        e.preventDefault();
        props.updateStatus(props.status.id, updateStatus);
        setShowing(false);
    }
    return (
        <div className="plant-index-container" key={props.status.id}>
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    <p className="plant-text">Date: {props.status.created}</p>
                    <p className="plant-text">Plant Health: {props.status.health}</p>
                    <p className="plant-text">Notes: {props.plant.notes}</p>
                </div>
                <button onClick={toggleShowing} className="outline-btn edit">Edit</button>
                <button onClick={() => props.deleteStatus(props.status.id)} className="outline-btn">Delete</button>
                {/* Modal for EDIT */}
                < PlantModal isOpen={showing} >
                    <div className="edit-plant-form">
                        <button onClick={toggleShowing} className="outline-btn">X</button>
                        <form onSubmit={submitUpdateStatus}>
                            {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                            <label htmlFor="name">Plant Name:</label>
                            {/* ADD READ ONLY FIELD FOR PLANT NAME? plant.name */}
                            {/* NEED TO PASS PROPS plant.name, plant.id */}
                            <input type="text" name="plant" />
                            <label htmlFor="type">Date: </label>
                            {/* ADD READ ONLY FIELD HERE FOR DATE */}
                            <input type="text" name="created" />
                            <label htmlFor="health">Current Plant Health: </label>
                            <select name="health" required value={updateStatus.health} onChange={handleInputChange}>
                                <option value="" disabled>-Select-</option>
                                <option value="Poor">Poor</option>
                                <option value="Good">Good</option>
                                <option value="Excellent">Excellent</option>
                            </select>
                            <label htmlFor="notes">Notes: </label>
                            <input onChange={handleInputChange} type="text" name="notes" value={updateStatus.notes} />
                            <button type="submit" className="solid-btn update">Update</button>
                        </form>
                    </div>
                </PlantModal>
            </div>
        </div>
    )
}

export default StatusDetails;