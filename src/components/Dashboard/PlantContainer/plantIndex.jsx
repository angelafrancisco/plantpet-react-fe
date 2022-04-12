import { useState } from "react";
import PlantModal from "./plantModal";

const PlantIndex = (props) => {
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
        props.updatePlant(props.plant._id, updatePlant);
        setShowing(false);
    }
    return (
        <div className="plant-index-container" key={props.plant._id}>
            {/* <img src={props.plant.image} alt="plant photo" className="plant-index-img" /> */}
            <div className="plant-index-img" style={{ backgroundImage: `url(${props.plant.image})` }}></div>
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    <h3 className="plant-text-name">{props.plant.name}</h3>
                    <p className="plant-text type">Type: {props.plant.type}</p>
                    <p className="plant-text">Location: {props.plant.roomName} - {props.plant.direction} facing window</p>
                    <p className="plant-text">Pot Size: {props.plant.potSize}in</p>
                    <p className="plant-text">Notes: {props.plant.userNotes}</p>
                </div>
                {/* modal opens to edit */}
                <PlantModal isOpen={showing}>
                    <div className="edit-plant-form">
                        <button onClick={toggleShowing} className="outline-btn">X</button>
                        <form onSubmit={submitUpdatePlant}>
                            {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                            <label for="name">Plant Name: </label>
                            <input onChange={handleInputChange} type="text" name="name" value={updatePlant.name} />
                            <label for="type">Plant Type: </label>
                            <input onChange={handleInputChange} type="text" name="type" value={updatePlant.type} />
                            <label for="image">Image url: </label>
                            <input onChange={handleInputChange} type="text" name="image" value={updatePlant.image} />
                            <label for="potSize">Pot Size (in): </label>
                            <input onChange={handleInputChange} type="number" name="potSize" value={updatePlant.potSize} />
                            <label for="roomName">Location: </label>
                            <input onChange={handleInputChange} type="text" name="roomName" value={updatePlant.roomName} />
                            <label for="direction">Window Direction: </label>
                            {/* <input onChange={handleInputChange} type="text" name="direction" value={updatePlant.direction} /> */}
                            <select name="direction" required value={updatePlant.direction} onChange={handleInputChange}>
                                <option value="" disabled>-Select-</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                            <label for="notes">Notes: </label>
                            <input onChange={handleInputChange} type="text" name="userNotes" value={updatePlant.userNotes} />
                            <button type="submit" className="solid-btn update">Update</button>
                        </form>
                    </div>
                </PlantModal>
                <button onClick={toggleShowing} className="outline-btn edit">Edit</button>
                <button onClick={() => props.deletePlant(props.plant._id)} className="outline-btn">Delete</button>
            </div>
        </div>
    )
}

export default PlantIndex;