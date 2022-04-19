import { useState, useEffect } from 'react';
import apiUrl from '../../apiConfig';
import Hero from "./hero"
import TaskContainer from './TaskContainer/taskContainer';
import PlantContainer from './PlantContainer/plantContainer';
import StatusContainer from './StatusContainer/StatusContainer';

const Dashboard = () => {
    const [requestError, setRequestError] = useState("");
    const [plants, setPlants] = useState([]);
    const [allStatus, setAllStatus] = useState([]);

// == GET ALL PLANTS ========================================================= //
    useEffect(() => {
        const getPlants = async () => {
            try {
                const apiResponse = await fetch(`${apiUrl}/api/plants/`);
                const parsedResponse = await apiResponse.json();
                setPlants(parsedResponse);
                // console.log(parsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getPlants()
    }, []);    

// == GET ALL STATUS ======================================================== //
    useEffect(() => {
        const getStatus = async () => {
            try {
                const apiResponse = await fetch(`${apiUrl}/api/status/`);
                const parsedResponse = await apiResponse.json();
                setAllStatus(parsedResponse);
                // console.log(parsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getStatus()
    }, []);  

    return (
        <>
            <Hero></Hero>
            <div className="content-wrapper top">
                <TaskContainer
                    key={`tasks-container`}
                    plants={plants}
                    setPlants={setPlants}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></TaskContainer>
                <PlantContainer
                    key={`plants-container`}
                    plants={plants} 
                    setPlants={setPlants}
                    allStatus={allStatus}
                    setAllStatus={setAllStatus}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></PlantContainer>
            </div>
            <div className="content-wrapper status">
                <StatusContainer
                    key={`status-container`}
                    plants={plants}
                    setPlants={setPlants}
                    allStatus={allStatus}
                    setAllStatus={setAllStatus}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></StatusContainer>
            </div>
        </>
    )
}

export default Dashboard;