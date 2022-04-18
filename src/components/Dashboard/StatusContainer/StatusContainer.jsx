import { useState } from "react";
// import { Link } from "react-router-dom";
import apiUrl from "../../../apiConfig";
import StatusNew from "./StatusNew";
import StatusIndex from "./StatusIndex";

const StatusContainer = (props) => {
    const [newStatusServerError, setNewStatusServerError] = useState("");
    // const [singlePlantStatus, setSinglePlantStatus] = useState([]);

// // GET 1 PLANT + ITS STATUS
//     useEffect(()=>{
//         const getPlantDetails = async () => {
//             try {
//                 const plantApiResponse = await fetch(`${apiUrl}/plants/${id}`);
//                 const parsedPlantResponse = await plantApiResponse.json();
//                 setPlant(parsedPlantResponse);
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//         getPlantDetails()
//         if(allStatus){
//             setSinglePlantStatus(allStatus.filter(status => status.plant === parseInt(id)))
//         }
//     }, [allStatus, id])

// == CREATE STATUS =========================================================================== //
    const createNewStatus = async (newStatus) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/status/`, {
                method: "POST",
                body: JSON.stringify(newStatus),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            // console.log(parsedResponse.success);
            // if (parsedResponse.success) {
            if (parsedResponse) {
                props.setAllStatus([...props.allStatus, newStatus]);
            } else {
                // setNewStatusServerError(parsedResponse.data);
                setNewStatusServerError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

// == UPDATE STATUS ============================================================================================ //
    const updateStatus = async (idToUpdate, statusToUpdate) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/status/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(statusToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse)
            // console.log(parsedResponse.success);
            // if (parsedResponse.success) {
            if (parsedResponse) {
                const newStatus = props.allStatus.map(status => status.id === idToUpdate ? statusToUpdate : status)
                props.setAllStatus(newStatus)
            } else {
                // props.setRequestError(parsedResponse.data);
                props.setRequestError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
        console.log(`Updating Status # ${idToUpdate}`);
    }

// == DELETE STATUS =============================================================================================== //
    const deleteStatus = async (idToDelete) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/status/${idToDelete}/`, {
                method: "DELETE"
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            // console.log(parsedResponse.success);
            // if (parsedResponse.success) {
            if (parsedResponse) {
                const newStatus = props.allStatus.filter(status => status.id !== idToDelete);
                props.setAllStatus(newStatus);
            } else {
                console.log(`Unable to delete Status #${idToDelete}`)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(`Deleting Status ID# ${idToDelete}`);
    }

    return (
        <div className="plant-container">
            <h2 className="section-header plants">Plant Status</h2>
            {/* Button for New Status */}
            <div className="btn-section plants">
                <StatusNew
                    plants={props.plants}
                    createNewStatus={createNewStatus}
                    newStatusServerError={newStatusServerError}
                    setNewStatusServerError={setNewStatusServerError}
                ></StatusNew>
            </div>
            {/* Section displaying Status Index */}
            {props.allStatus.length > 0 ?
                <div className="grid-container plants">
                    {props.allStatus.map((status) =>{
                        return <StatusIndex
                            key={status.id}
                            status={status}
                            plants={props.plants}
                            updateStatus={updateStatus}
                            deleteStatus={deleteStatus}
                        ></StatusIndex>
                    })}
                </div>
            :
                <div className="grid-container plants">
                    <div className="message-box">
                        <h3 className="message-text">Looks like you haven't added any plant statuses!</h3>
                    </div>
                </div>
            }
        </div>
    )
}
export default StatusContainer;