import { useState } from 'react';
import PlantModal from './plantModal';

const PlantNew = (props) => {
    const initialPlantObject = {
        name: "",
        type: "",
        image: "",
        size: "",
        room: "",
        direction: "",
        notes: "",
        task: false
    }
    const [newPlant, setNewPlant] = useState(initialPlantObject);
    const [showing, setShowing] = useState(false);
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });

    const toggleShowing = () => {
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value
        })
    }
    const submitNewPlant = (e) => {
        e.preventDefault()
        let validSubmission = true;
        // if (newPlant.type.length < 2) {
        if (!newPlant.name || !newPlant.type || !newPlant.size || !newPlant.direction) {
            setIsValidState({
                valid: false,
                message: "Fields marked with an asterisk (*) are required!"
            })
            validSubmission = false;
        }
        if (validSubmission) {
            props.createNewPlant(newPlant)
            setIsValidState({
                valid: true,
                message: ""
            })
            setShowing(false)
            setNewPlant(initialPlantObject)
        }
    }

    return (
        <>
            <button onClick={toggleShowing} className="solid-btn">Add Plant!</button>
            {/* Modal for CREATE NEW */}
            <PlantModal isOpen={showing}>
                <div className="new-plant-form">
                    <button onClick={toggleShowing} className="outline-btn">X</button>
                    <p className='required-text'><span className='required-field'>* <span className='small-text'>required</span></span></p>
                    <form onSubmit={submitNewPlant}>
                        {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                        {props.newPlantServerError ? <p className='form-error'>{props.newPlantServerError}</p> : null}
                        {/* NAME */}
                        <label htmlFor="name">Plant Name:<span className='required-field'>*</span></label>
                        <input onChange={handleInputChange} type="text" name="name" required value={newPlant.name} placeholder="Nickname or plant type"/>
                        {/* TYPE */}
                        <label htmlFor="type">Plant Type:<span className='required-field'>*</span></label>
                        <input onChange={handleInputChange} type="text" name="type" required value={newPlant.type} placeholder="i.e. Succulent, Cactus, etc." />
                        {/* IMAGE */}
                        <label htmlFor="image">Image URL:</label>
                        <input onChange={handleInputChange} type="text" name="image" value={newPlant.image} />
                        {/* SIZE */}
                        <label htmlFor="size">Pot Size (in):<span className='required-field'>*</span></label>
                        <input onChange={handleInputChange} type="number" name="size" required value={newPlant.size} />
                        {/* ROOM */}
                        <label htmlFor="room">Location: </label>
                        <input onChange={handleInputChange} type="text" name="room" value={newPlant.room} placeholder="i.e. Office, Living Room, etc."/>
                        {/* DIRECTION */}
                        <label htmlFor="direction">Window Direction:<span className='required-field'>*</span></label>
                        <select onChange={handleInputChange} name="direction" required value={newPlant.direction} >
                            <option value="" disabled>-Select-</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                        {/* NOTES */}
                        <label htmlFor="notes">Notes: </label>
                        <input onChange={handleInputChange} type="text" name="notes" value={newPlant.notes} />
                        <button type="submit" className="solid-btn">Add Plant!</button>
                    </form>
                </div >
            </PlantModal>
        </>
    )
}

export default PlantNew;