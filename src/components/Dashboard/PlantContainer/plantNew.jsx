import { useState } from 'react';
import PlantModal from './plantModal';

const PlantNew = (props) => {
    const initialPlantObject = {
        name: "",
        type: "",
        image: "",
        potSize: "",
        roomName: "",
        direction: "",
        userNotes: "",
        task: { completed: false, waterSchedule: 7 }
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
                        <label for="name">Plant Name: </label>
                        <input onChange={handleInputChange} type="text" name="name" value={newPlant.name} />
                        <label for="type">Plant Type: </label>
                        <input onChange={handleInputChange} type="text" name="type" value={newPlant.type} placeholder="i.e. succulent, cactus, etc." />
                        <label for="image">Image url: </label>
                        <input onChange={handleInputChange} type="text" name="image" value={newPlant.image} />
                        <label for="potSize">Pot Size (in): </label>
                        <input onChange={handleInputChange} type="number" name="potSize" value={newPlant.potSize} />
                        <label for="roomName">Location: </label>
                        <input onChange={handleInputChange} type="text" name="roomName" value={newPlant.roomName} />
                        <label for="direction">Window Direction: </label>
                        {/* <input onChange={handleInputChange} type="text" name="direction" value={newPlant.direction} /> */}
                        <select name="direction" required value={newPlant.direction} onChange={handleInputChange}>
                            <option value="" disabled>-Select-</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                        </select>
                        <label for="notes">Notes: </label>
                        <input onChange={handleInputChange} type="text" name="userNotes" value={newPlant.userNotes} />
                        <button type="submit" className="solid-btn">Add Plant!</button>
                    </form>
                </div >
            </PlantModal>
            <button onClick={toggleShowing} className="solid-btn">Add Plant!</button>
        </>
    )
}

export default PlantNew;