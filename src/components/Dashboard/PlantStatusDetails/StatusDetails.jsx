import { useState, useEffect } from "react";
import PlantModal from "../PlantContainer/plantModal";

const StatusDetails = (props) =>{
    const [showing, setShowing] = useState(false);
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });
    const [updateStatus, setUpdateStatus] = useState({});

    useEffect(()=>{
        setUpdateStatus(props.status)
    }, [props.status])
    
    const toggleShowing = () => {
        setShowing(!showing)
    }
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
        <div className="plant-index-container">
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    <p className="plant-text">Date Added: {props.status.created}</p>
                    <p className="plant-text">Plant Health: {props.status.health}</p>
                    <p className="plant-text">Notes: {props.status.notes}</p>
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
                            <input type="text" name="plant" readOnly value={updateStatus.plant} />
                            <label htmlFor="created">Date: </label>
                            <input type="text" name="created" readOnly value={updateStatus.created} />
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