import { useState, useEffect } from 'react';
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
                const apiResponse = await fetch("http://localhost:8000/plants/");
                // const plants = await fetch("https://plantpet-django-be.herokuapp.com/plants/");
                const parsedResponse = await apiResponse.json();
                // setPlants(parsedPlants.data);
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