const PlantTasks = (props) => {
    const completeTask = () => {
        props.updateTask(props.plant._id, { ...props.plant, task: { ...props.plant.task, completed: true } })
    }
    return (
        <>
            <div className="plant-index-container">
                <div className="plant-index-img task" style={{ backgroundImage: `url(${props.plant.image})` }}></div>
                <div className="plant-index-box">
                    <div className="plant-index-text-box">
                        <h3 className="plant-text-name">{props.plant.name}</h3>
                        <p className="plant-text">{props.plant.roomName}</p>
                        <p className="plant-text">Task: Water plant!</p>
                    </div>
                    <div className="plant-task-btn">
                        <button onClick={completeTask} className="solid-btn submit" type="button">Done!</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlantTasks;