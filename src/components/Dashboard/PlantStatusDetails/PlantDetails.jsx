import { useState } from "react";
import PlantModal from "../PlantContainer/plantModal";

const PlantDetails = (props) =>{
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });
    const [updatePlant, setUpdatePlant] = useState(props.plant);
    const handleInputChange = (e) => {
        setUpdatePlant({
            ...updatePlant,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdatePlant = (e) => {
        e.preventDefault();
        props.updatePlant(props.plant.id, updatePlant);
        setShowing(false);
    }
    return(
        <div className="plant-index-container">
            <div className="plant-index-img" style={{ backgroundImage: `url(${props.plant.image || "../../images/default-plant.png"})` }}></div>
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    <h3 className="plant-text-name">{props.plant.name}</h3>
                    <p className="plant-text type">Type: {props.plant.type}</p>
                    <p className="plant-text">Location: {props.plant.room}</p>
                    <p className="plant-text">Window: {props.plant.direction} facing</p>
                    <p className="plant-text">Pot Size: {props.plant.size}in</p>
                    <p className="plant-text">Notes: {props.plant.notes}</p>
                </div>
                <button onClick={toggleShowing} className="outline-btn edit">Edit</button>
                <button onClick={() => props.deletePlant(props.plant.id)} className="outline-btn">Delete</button>
                
                {/* Modal for EDIT */}
                < PlantModal isOpen={showing} >
                    <div className="edit-plant-form">
                        <button onClick={toggleShowing} className="outline-btn">X</button>
                        <form onSubmit={submitUpdatePlant}>
                            {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                            <label htmlFor="name">Plant Name: <span className='required-field'>*</span></label>
                            <input onChange={handleInputChange} type="text" name="name" value={updatePlant.name} />
                            <label htmlFor="type">Plant Type: <span className='required-field'>*</span></label>
                            <input onChange={handleInputChange} type="text" name="type" value={updatePlant.type} />
                            <label htmlFor="image">Image URL: </label>
                            <input onChange={handleInputChange} type="text" name="image" value={updatePlant.image} />
                            <label htmlFor="potSize">Pot Size (in): <span className='required-field'>*</span></label>
                            <input onChange={handleInputChange} type="number" name="size" value={updatePlant.size} />
                            <label htmlFor="roomName">Location: </label>
                            <input onChange={handleInputChange} type="text" name="room" value={updatePlant.room} />
                            <label htmlFor="direction">Window Direction: </label>
                            <select name="direction" required value={updatePlant.direction} onChange={handleInputChange}>
                                <option value="" disabled>-Select-</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                            <label htmlFor="notes">Notes: </label>
                            <input onChange={handleInputChange} type="text" name="notes" value={updatePlant.notes} />
                            <button type="submit" className="solid-btn update">Update</button>
                        </form>
                    </div>
                </PlantModal>
            </div>
        </div>
    )
}

export default PlantDetails;