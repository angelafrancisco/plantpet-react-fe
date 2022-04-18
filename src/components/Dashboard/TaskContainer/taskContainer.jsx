import { Link } from "react-router-dom";
import apiUrl from "../../../apiConfig";
import PlantTasks from "./plantTasks";

const TaskContainer = (props) => {
    const checkIfTasksComplete = props.plants.every(plant => plant.task);

// == UPDATE PLANT.TASK ====================================================================================== //
    const updateTask = async (idToUpdate, taskToUpdate) => {
        try {
            const apiResponse = await fetch(`${apiUrl}/plants/${idToUpdate}/`, {
                method: "PUT",
                body: JSON.stringify(taskToUpdate),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const parsedResponse = await apiResponse.json();
            console.log(parsedResponse);
            if (parsedResponse.success) {
            // if (parsedResponse) {
                const newPlants = props.plants.map(plant => plant.id === idToUpdate ? taskToUpdate : plant)
                props.setPlants(newPlants)
            } else {
                props.setRequestError(parsedResponse.data);
                // setNewPlantServerError(parsedResponse);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="task-container">
            <h2 className="section-header task">My Tasks</h2>
            <div className="btn-section task">
                <Link to='/dashboard' className="solid-btn">Today</Link>
                <Link to='/dashboard' className="outline-btn">Upcoming</Link>
            </div>
            {checkIfTasksComplete ?
                <div className="grid-container task">
                    <div className="message-box">
                        <h3 className="message-text">All tasks completed for today!</h3>
                    </div>
                </div>
                :
                <div className="grid-container task">
                    {props.plants.map((plant) => {
                        return (
                            !plant.task ?
                                <PlantTasks
                                    key={plant.id}
                                    plant={plant}
                                    updateTask={updateTask}
                                ></PlantTasks>
                                : null
                        )
                    })
                    }
                </div>
            }
        </div>
    )
}

export default TaskContainer;