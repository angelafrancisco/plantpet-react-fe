const Features = () => {
    return (
        <div className="features-container">
            <h2 className="home-sub-heading">Add photos and track plant care like never before</h2>
            <div className="features-grid">
                <div className="single-feature-box">
                    <div className="feature-img leaf">
                        <img src="/img/01-plant-feature.png" alt="leaf icon" />
                    </div>
                    <h4 className="feature-title">Plant Care Reminders</h4>
                    <p className="feature-text">Not sure when to water your plants? PlantPet can help! Add plants and get reminded when it's time to water and more!</p>
                </div>
                <div className="single-feature-box">
                    <div className="feature-img photo">
                        <img src="/img/02-plant-feature.png" alt="photo icon" />
                    </div>
                    <h4 className="feature-title">Plant Identification</h4>
                    <p className="feature-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam magni iusto soluta impedit vero accusantium modi inventore dolores ducimus!</p>
                </div>
                <div className="single-feature-box">
                    <div className="feature-img sun">
                        <img src="/img/03-plant-feature.png" alt="sun icon" />
                    </div>
                    <h4 className="feature-title">Light Meter</h4>
                    <p className="feature-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam magni iusto soluta impedit vero accusantium modi inventore dolores ducimus!</p>
                </div>
            </div>
        </div>
    )
}

export default Features;