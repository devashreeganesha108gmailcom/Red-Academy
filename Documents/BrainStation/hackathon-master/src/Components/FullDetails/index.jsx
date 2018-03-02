import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class FullDetail extends Component {
    render() {

        // console.log(this.props.match.params.eventId)

        const { eventId } = this.props.match.params
        const { events } = this.props

        return (
            <div className="FullDetail">
                <h1>Full Details Page</h1>
                <h1>{events[eventId].subject}</h1>
                <h3>{events[eventId].location}</h3>
                <span>{events[eventId].time}</span>
                <p>{events[eventId].description}</p>
                <Link to='/'>Home</Link>
            </div>
        );
    }
}

export default FullDetail