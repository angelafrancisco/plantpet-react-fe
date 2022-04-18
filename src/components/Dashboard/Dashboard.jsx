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

// GET ALL PLANTS + ALL STATUS
    useEffect(() => {
        const getPlants = async () => {
            try {
                const apiResponse = await fetch(`${apiUrl}/plants`);
                const parsedResponse = await apiResponse.json();
                // setPlants(parsedResponse.data);
                setPlants(parsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        const getStatus = async () => {
            try {
                const statusApiResponse = await fetch(`${apiUrl}/status/`);
                const statusParsedResponse = await statusApiResponse.json();
                setAllStatus(statusParsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getPlants()
        getStatus()
    }, []);

    return (
        <>
            <Hero></Hero>
            <div className="content-wrapper">
                <TaskContainer 
                    plants={plants} 
                    setPlants={setPlants} 
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></TaskContainer>
                <PlantContainer
                    plants={plants} 
                    setPlants={setPlants}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></PlantContainer>
                <StatusContainer
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