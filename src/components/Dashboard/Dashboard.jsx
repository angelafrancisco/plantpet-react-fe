import { useState, useEffect } from 'react';
import Hero from "./hero"
import TaskContainer from './TaskContainer/taskContainer';
import PlantContainer from './PlantContainer/plantContainer';

const Dashboard = () => {
    const [requestError, setRequestError] = useState("");
    const [plants, setPlants] = useState([]);
    // const [plants, setPlants] = useState([{
    //   '_id': "1",
    //   'name': "Cactus",
    //   'type': "Cactus",
    //   'image': "https://images.unsplash.com/photo-1519336056116-bc0f1771dec8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    //   'potSize': 4,
    //   'roomName': "Office",
    //   'direction': "E",
    //   'userNotes': "",
    //   'task': { 'completed': false, 'waterSchedule': 7 }
    // }]);

    useEffect(() => {
        const getPlants = async () => {
            try {
                // const plants = await fetch("http://localhost:3001/plants");
                const plants = await fetch("https://plantpet-api.herokuapp.com/plants");
                const parsedPlants = await plants.json();
                setPlants(parsedPlants.data);
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
                <TaskContainer plants={plants} setPlants={setPlants} requestError={requestError}></TaskContainer>
                <PlantContainer plants={plants} setPlants={setPlants} requestError={requestError}></PlantContainer>
            </div>
        </>
    )
}

export default Dashboard;