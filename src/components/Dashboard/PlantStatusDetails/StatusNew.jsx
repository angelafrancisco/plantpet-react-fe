import { useState } from 'react';
import PlantModal from './plantModal';

const StatusNew = (props) =>{
    const initialStatusObject = {
        // plant: props.status.plant ?,
        created: "", // is this autocreated?
        health: "",
        notes: "",
    }
    const [showing, setShowing] = useState(false);
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });
    const [newStatus, setNewStatus] = useState(initialStatusObject);
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        setNewStatus({
            ...newStatus,
            [e.target.name]: e.target.value
        })
    }
    const submitNewStatus = (e) => {
        e.preventDefault()
        let validSubmission = true;
        if (newStatus.type.length < 2) {
            setIsValidState({
                valid: false,
                message: "Plant health is required."
            })
            validSubmission = false;
        }
        if (validSubmission) {
            props.createNewStatus(newStatus)
            setIsValidState({
                valid: true,
                message: ""
            })
            setShowing(false)
            setNewStatus(initialStatusObject)
        }
    }
    return (
        <>
            <button onClick={toggleShowing} className="solid-btn">Add Status!</button>
            {/* modal open to view new status form */}
            <PlantModal isOpen={showing}>
                <div className="new-plant-form">
                    <button onClick={toggleShowing} className="outline-btn">X</button>
                    <form onSubmit={submitNewStatus}>
                        {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                        {props.newStatusServerError ? <p className='form-error'>{props.newStatusServerError}</p> : null}
                        <label htmlFor="name">Plant Name:</label>
                        {/* ADD READ ONLY FIELD FOR PLANT NAME? plant.name */}
                        {/* NEED TO PASS PROPS plant.name, plant.id */}
                        <input type="text" name="plant" />
                        <label htmlFor="type">Date: </label>
                        {/* ADD READ ONLY FIELD HERE FOR DATE */}
                        <input type="text" name="created" />
                        <label htmlFor="health">Current Plant Health:<span className='required-field'>*</span></label>
                        <select name="health" required value={newStatus.health} onChange={handleInputChange}>
                            <option value="" disabled>-Select-</option>
                            <option value="Poor">Poor</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                        <label htmlFor="notes">Notes: </label>
                        <input onChange={handleInputChange} type="text" name="notes" value={newStatus.notes} />
                        <button type="submit" className="solid-btn">Add Status!</button>
                    </form>
                </div >
            </PlantModal>
        </>
    )
}

export default StatusNew;