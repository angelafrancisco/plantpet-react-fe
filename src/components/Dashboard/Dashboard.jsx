import { useState, useEffect } from 'react';
import apiUrl from '../../apiConfig';
import Hero from "./hero"
import TaskContainer from './TaskContainer/taskContainer';
import PlantContainer from './PlantContainer/plantContainer';

const Dashboard = () => {
    const [requestError, setRequestError] = useState("");
    const [plants, setPlants] = useState([]);

// GET PLANTS
    useEffect(() => {
        const getPlants = async () => {
            try {
                const apiResponse = await fetch(`${apiUrl}/plants/`);
                const parsedResponse = await apiResponse.json();
                setPlants(parsedResponse);
            } catch (err) {
                console.log(err);
            }
        }
        getPlants()
    }, []);

    return (
        <>
            <Hero></Hero>
            <div className="content-wrapper">
                {/* <TaskContainer 
                    plants={plants} 
                    setPlants={setPlants} 
                    requestError={requestError}
                ></TaskContainer> */}
                <PlantContainer 
                    plants={plants} 
                    setPlants={setPlants}
                    requestError={requestError}
                    setRequestError={setRequestError}
                ></PlantContainer>
            </div>
        </>
    )
}

export default Dashboard;