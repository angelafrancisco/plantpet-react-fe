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
                const apiResponse = await fetch(`${apiUrl}/plants/`);
                const parsedResponse = await apiResponse.json();
                // setPlants(parsedResponse.data);
                setPlants(parsedResponse);
                console.log(parsedResponse);
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
                const statusApiResponse = await fetch(`${apiUrl}/status/`);
                const statusParsedResponse = await statusApiResponse.json();
                // setAllStatus(statusParsedResponse.data);
                setAllStatus(statusParsedResponse);
                console.log(statusParsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getStatus()
    }, [])

    return (
        <>
            <Hero></Hero>
            <div className="content-wrapper">
                <PlantContainer
                    key={`plants`}
                    plants={plants} 
                    setPlants={setPlants}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></PlantContainer>
                <TaskContainer
                    key={`tasks`}
                    plants={plants}
                    setPlants={setPlants}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></TaskContainer>
                <StatusContainer
                    key={`status`}
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