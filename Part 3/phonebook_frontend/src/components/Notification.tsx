 import { NotificationProps } from "./types";
  
  const Notification: React.FC<NotificationProps> = ({ errorMessage }) => {
    const errorStyle = {
        color: errorMessage.color,
        background: "lightgrey",
        fontSize: 20, 
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    if (errorMessage.data === null) {
        return null
    }
    return (
        <div className="error" style={errorStyle}>
            {errorMessage.data}
        </div>
    )
}


export default Notification