import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Summary extends Component {
    render() {

        let summaryJSX = this.props.events.map((event, i) => {
            return <div key={i}>
                <li>{event.subject}</li>
                <li>{event.time}</li>
                <li>{event.location}</li>
                <button>Join!</button>
                <Link to={`/${i}`}>See Details</Link>
                </div>
        })

        return (
            <div className="Summary">
                <h1>Summary Page</h1>
                <ul>
                    {summaryJSX}
                </ul>
            </div>
        );
    }
}

export default Summary;