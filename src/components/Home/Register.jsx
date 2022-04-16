import { Link } from "react-router-dom";

const Register = (props) => {
    return (
        <div className="login-container">
            <div className="left-text-box">
                <h1 className="register-heading">Ready to start your plant care journey?</h1>
            </div>
            <div className="user-form new">
                <h3>Sign up for a free account</h3>
                <form>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" />
                    {/* temporary link here until user route backend finished */}
                    <Link to="/dashboard" className="register-btn"><button onClick={() => props.setIsLoggedIn(true)} className="solid-btn">Register!</button></Link>
                </form>
            </div>
        </div>
    )
}

export default Register;