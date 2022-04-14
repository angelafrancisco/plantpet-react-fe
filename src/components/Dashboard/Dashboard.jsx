import { useState, useEffect } from 'react';
import Hero from "./hero"
import TaskContainer from './TaskContainer/taskContainer';
import PlantContainer from './PlantContainer/plantContainer';

const Dashboard = () => {
    const [requestError, setRequestError] = useState("");
    const [plants, setPlants] = useState([]);
// GET
    useEffect(() => {
        const getPlants = async () => {
            try {
                const plants = await fetch("http://localhost:8000/plants/");
                // const plants = await fetch("https://plantpet-django-be.herokuapp.com/plants/");
                const parsedPlants = await plants.json();
                // setPlants(parsedPlants.data);
                setPlants(parsedPlants);
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
                {/* <TaskContainer plants={plants} setPlants={setPlants} requestError={requestError}></TaskContainer> */}
                <PlantContainer plants={plants} setPlants={setPlants} requestError={requestError}></PlantContainer>
            </div>
        </>
    )
}

export default Dashboard;