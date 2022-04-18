import { useState } from "react";
import PlantModal from "../PlantContainer/plantModal";

const StatusIndex = (props) =>{
    const [showing, setShowing] = useState(false);
    const [isValidState, setIsValidState] = useState({ valid: true, message: "" });
    const [updateStatus, setUpdateStatus] = useState(props.status);
    // const [updateStatus, setUpdateStatus] = useState({});

    // useEffect(()=>{
    //     setUpdateStatus(props.status)
    // }, [props.status])
    
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
    // function to search through all plants, match plant.id = status.plant and return plant name
    const findLinkedPlantName = (statusPlantId)=> {
        return props.plants.filter(plant => plant.id === statusPlantId).map(selectedPlant => <h3 className="plant-text-name">Plant: {selectedPlant.name}</h3>)
    }
    // console.log(findLinkedPlantName)
    
    return (
        <div className="plant-index-container">
            {/* To do: add status image here */}
            {/* <div className="plant-index-img" style={{ backgroundImage: `url("./images/default-plant.png")` }}></div> */}
            <div className="plant-index-box">
                <div className="plant-index-text-box">
                    {findLinkedPlantName(props.status.plant)}
                    <p className="plant-text">Date: {props.status.created}</p>
                    <p className="plant-text">Health: {props.status.health}</p>
                    <p className="plant-text">Notes: {props.status.notes}</p>
                </div>
                <button onClick={toggleShowing} className="outline-btn edit">Edit</button>
                <button onClick={() => props.deleteStatus(props.status.id)} className="outline-btn">Delete</button>
                
                {/* Modal for UPDATE/EDIT */}
                < PlantModal isOpen={showing} >
                    <div className="edit-plant-form">
                        <button onClick={toggleShowing} className="outline-btn">X</button>
                        <p className='required-text'><span className='required-field'>* <span className='small-text'>required</span></span></p>
                        <form onSubmit={submitUpdateStatus}>
                            {isValidState.valid ? null : <p className='form-error'>{isValidState.message}</p>}
                            {/* PLANT NAME - DOES NOT CHANGE */}
                            <label htmlFor="plant">Plant Name:</label>
                            <input type="text" name="plant" readOnly value={props.status.plant} placeholder={findLinkedPlantName(props.status.plant)}/>
                            {/* CREATED */}
                            <label htmlFor="created">Date:</label>
                            <input onChange={handleInputChange} type="text" name="created" value={updateStatus.created}/>
                            {/* HEALTH */}
                            <label htmlFor="health">Plant Health:<span className='required-field'>*</span></label>
                            <select onChange={handleInputChange} name="health" required value={updateStatus.health}>
                                <option value="" disabled>-Select-</option>
                                <option value="Poor">Poor</option>
                                <option value="Good">Good</option>
                                <option value="Excellent">Excellent</option>
                            </select>
                            <label htmlFor="notes">Notes:</label>
                            <input onChange={handleInputChange} type="text" name="notes" value={updateStatus.notes} />
                            <button type="submit" className="solid-btn update">Update</button>
                        </form>
                    </div>
                </PlantModal>
            </div>
        </div>
    )
}

export default StatusIndex;