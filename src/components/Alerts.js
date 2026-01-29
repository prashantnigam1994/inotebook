import React from 'react'

const Alerts = ({ alerts }) => {
    return (
        <div className="alert-container">
            {alerts && (<div className={`alert alert-${alerts.type}`} role="alert">{alerts.msg}</div>)}
        </div>
    )
}

export default Alerts
