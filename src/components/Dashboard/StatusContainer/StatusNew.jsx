import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import PlantModal from "../PlantContainer/plantModal";

const StatusNew = (props) =>{
    // const { id } = useParams();
    // const today = new Date();
    // const currentDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const initialStatusObject = {
        plant: "",
        created: "",
        health: "",
        notes: ""
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
        // if (newStatus.length < 2) {
        if (!newStatus.plant || !newStatus.created || !newStatus.health) {
            setIsValidState({
                valid: false,
                message: "Fields marked with an asterisk (*) are required!"
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
            {/* Modal for CREATE NEW */}
            <PlantModal isOpen={showing}>
                <div className="new-plant-form">
                    <button onClick={toggleShowing} className="outline-btn">X</button>
                    <form onSubmit={submitNewStatus}>
                        {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                        {props.newStatusServerError ? <p className='form-error'>{props.newStatusServerError}</p> : null}
                        {/* PLANT NAME */}
                        <label htmlFor="plant">New Status for Plant:<span className='required-field'>*</span></label>
                        <select onChange={handleInputChange} name="plant" required value={newStatus.plant}>
                            <option value="" disabled>-Select-</option>
                            {props.plants.map((plant) => {
                                return <option value={plant.id}>{plant.name} - {plant.room}</option>
                            })}
                        </select>
                        {/* CREATED */}
                        <label htmlFor="created">Date:</label>
                        <input type="text" name="created" value={newStatus.created} placeholder="MM/DD/YYYY"/>
                        {/* HEALTH */}
                        <label htmlFor="health">Plant Health:<span className='required-field'>*</span></label>
                        <select onChange={handleInputChange} name="health" required value={newStatus.health}>
                            <option value="" disabled>-Select-</option>
                            <option value="Poor">Poor</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                        {/* NOTES */}
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