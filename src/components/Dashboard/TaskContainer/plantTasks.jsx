const PlantTasks = (props) => {
    const completeTask = () => {
        props.updateTask(props.plant.id, { ...props.plant, task: true })
    }

    return (
            <div className="plant-index-container">
            {/* if time, add a specific task image to display here */}
            <div className="plant-index-img task" style={{ backgroundImage: `url(${props.plant.image || "./images/default-plant.png"})` }}></div>
                <div className="plant-index-box">
                    <div className="plant-index-text-box">
                        <h3 className="plant-text-name">Plant: {props.plant.name}</h3>
                        <p className="plant-text">Location: {props.plant.room}</p>
                        <p className="plant-text">Task: Water plant!</p>
                    </div>
                    <div className="plant-task-btn">
                        <button onClick={completeTask} className="solid-btn submit" type="button">Done!</button>
                    </div>
                </div>
            </div>
    )
}

export default PlantTasks;