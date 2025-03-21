
  const Notification = ({ errorMessage }) => {
    if (errorMessage.lenght === 0) {
        return null
    }
    const errorStyle = {
        color: errorMessage[1],
        background: "lightgrey",
        fontSize: 20, 
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    if (errorMessage[0] === null) {
        return null
    }
    return (
        <div className="error" style={errorStyle}>
            {errorMessage[0]}
        </div>
    )
}


export default Notification