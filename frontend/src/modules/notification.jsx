
const Notification = ({ message, color }) => {
    if(message === null) return null
    const colorToUse = color ? color : 'green';
    const styleSheet = {
        color: colorToUse,
        borderLeft: `2px solid ${colorToUse}`,
    }
    return (
        <div className="notification" style={styleSheet}>
            {message}
        </div>
    )
}

export default Notification