import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const rediredRegister = () => {
        navigate('/register');
    };

    const rediredLogin = () => {
        navigate('/Login');
    }

    const containerStyle = {
        backgroundColor: "#f4f4f4",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rbg(0, 0, 0, 0.1)",
        textAlign: "center",
    }
    const titleStyle = {
        color: "#333",
        fontSize: "36px",
        marginBottom: "10px"
    };
    const subtitleStyle = {
        color: "#666",
        fontSize: "24px"
    }

    return (
        <div style={containerStyle} className="mt-5">
            <h1 style={titleStyle}>Home</h1>
            <h2 style={subtitleStyle}>ToDo</h2>
            <p className="lead">Welcome to our page, have a good experience</p>
            <button className="btn btn-primary mr-2" onClick={rediredRegister}>Register</button>
            <button className="btn btn-primary" onClick={rediredLogin}>Login</button>
        </div>    
    )
}

export default HomePage;