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
        props.updatePlant(props.plant.id, updatePlant);
        // console.log(props.updatePlant(props.plant.id, updatePlant))
        setShowing(false);
    }

    return (
        <div className="plant-index-container">
            <div className="plant-index-img" style={{ backgroundImage: `url(${props.plant.image || "./images/default-plant.png"})` }}></div>
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    <h3 className="plant-text-name">{props.plant.name}</h3>
                    <p className="plant-text type">Plant Type: {props.plant.type}</p>
                    <p className="plant-text">Location: {props.plant.room}</p>
                    <p className="plant-text">Window: {props.plant.direction} facing</p>
                    <p className="plant-text">Pot Size: {props.plant.size} in.</p>
                    <p className="plant-text">Notes: {props.plant.notes}</p>
                </div>
                {/* Link to PlantStatusDetails - TRY AGAIN ANOTHER TIME :'( */}
                {/* <Link to={`plant/${props.plant.id}`} className="outline-btn grave">More Info</Link> */}
                
                {/* Modal for UPDATE/EDIT */}
                < PlantModal isOpen={showing} >
                    <div className="edit-plant-form">
                        <button onClick={toggleShowing} className="outline-btn">X</button>
                        <p className='required-text'><span className='required-field'>* <span className='small-text'>required</span></span></p>
                        <form onSubmit={submitUpdatePlant}>
                            {isValidState.valid ? null : <p className='form-error'>{setIsValidState(isValidState.message)}</p>}
                            {/* NAME */}
                            <label htmlFor="name">Plant Name:<span className='required-field'>*</span></label>
                            <input onChange={handleInputChange} type="text" name="name" required value={updatePlant.name} />
                            {/* TYPE */}
                            <label htmlFor="type">Plant Type:<span className='required-field'>*</span></label>
                            <input onChange={handleInputChange} type="text" name="type" required value={updatePlant.type} />
                            {/* IMAGE */}
                            <label htmlFor="image">Image URL:</label>
                            <input onChange={handleInputChange} type="text" name="image" value={updatePlant.image} />
                            {/* SIZE */}
                            <label htmlFor="size">Pot Size (in):<span className='required-field'>*</span></label>
                            <input onChange={handleInputChange} type="number" name="size" required value={updatePlant.size} />
                            {/* ROOM */}
                            <label htmlFor="room">Location:</label>
                            <input onChange={handleInputChange} type="text" name="room" value={updatePlant.room} />
                            {/* DIRECTION */}
                            <label htmlFor="direction">Window Direction:<span className='required-field'>*</span></label>
                            <select onChange={handleInputChange} name="direction" required value={updatePlant.direction}>
                                <option value="" disabled>-Select-</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                            {/* NOTES */}
                            <label htmlFor="notes">Notes: </label>
                            <input onChange={handleInputChange} type="text" name="notes" value={updatePlant.notes} />
                            <button type="submit" className="solid-btn update">Update</button>
                        </form>
                    </div>
                </PlantModal>
                <button onClick={toggleShowing} className="outline-btn edit">Edit</button>
                <button onClick={() => props.deletePlant(props.plant.id)} className="outline-btn">Delete</button>
            </div>
        </div>
    )
}

export default PlantIndex;