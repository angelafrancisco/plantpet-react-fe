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
    }
    const [showing, setShowing] = useState(false);
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });
    const [newPlant, setNewPlant] = useState(initialPlantObject);
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
        if (newPlant.type.length < 2) {
            setIsValidState({
                valid: false,
                message: "Plant type is required. Use your best guess until plant API search is implemented!"
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
            {/* modal open to view new plant form */}
            <PlantModal isOpen={showing}>
                <div className="new-plant-form">
                    <button onClick={toggleShowing} className="outline-btn">X</button>
                    <form onSubmit={submitNewPlant}>
                        {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                        {props.newPlantServerError ? <p className='form-error'>{props.newPlantServerError}</p> : null}
                        <label htmlFor="name">Plant Name: <span className='required-field'>*</span></label>
                        <input onChange={handleInputChange} type="text" name="name" value={newPlant.name} placeholder="nickname or plant type"/>
                        <label htmlFor="type">Plant Type: <span className='required-field'>*</span></label>
                        <input onChange={handleInputChange} type="text" name="type" value={newPlant.type} placeholder="i.e. succulent, cactus, etc." />
                        <label htmlFor="image">Image URL: </label>
                        <input onChange={handleInputChange} type="text" name="image" value={newPlant.image} />
                        <label htmlFor="potSize">Pot Size (in): <span className='required-field'>*</span></label>
                        <input onChange={handleInputChange} type="number" name="size" value={newPlant.size} />
                        <label htmlFor="roomName">Location: </label>
                        <input onChange={handleInputChange} type="text" name="room" value={newPlant.room} placeholder="i.e. Office, Living Room, etc."/>
                        <label htmlFor="direction">Window Direction: </label>
                        <select name="direction" required value={newPlant.direction} onChange={handleInputChange}>
                            <option value="" disabled>-Select-</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                        <label htmlFor="notes">Notes: </label>
                        <input onChange={handleInputChange} type="text" name="notes" value={newPlant.notes} />
                        <button type="submit" className="solid-btn">Add Plant!</button>
                    </form>
                </div >
            </PlantModal>
            <button onClick={toggleShowing} className="solid-btn">Add Plant!</button>
        </>
    )
}

export default PlantNew;