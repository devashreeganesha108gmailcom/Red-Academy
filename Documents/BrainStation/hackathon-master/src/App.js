import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer'
import axios from 'axios'
import { geolocated, geoPropTypes } from 'react-geolocated';
import Summary from './Components/Summary'
import FullDetail from './Components/FullDetails'
// import MapContainer from './Components/MapContainer'
import { Route } from 'react-router-dom'


class App extends Component {
  constructor() {
    super()
    this.state = {
      coordinates: {
        lat: 4.2827,
        lon: -123.1207
      },
      userCoordinates: {},
      placeName: "Vancouver",
      isLoading: true,
    }
  }
  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position', position)
      this.setState({
        userCoordinates: {
          lon: position.coords.longitude,
          lat: position.coords.latitude
        },
        isLoading: false,
      });
    }, (error) => {
      alert(JSON.stringify(error))
    }, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }
  render() {
    if (!this.state.isLoading) {
      console.log('props', this.state.userCoordinates)
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <MapContainer coordinates={this.state.userCoordinates} placeName={this.state.placeName} />
          <div id="map"></div>
        </div>
      );
    }
    else {
      return (
        <div>
          Loading...
       </div>
      )
    }

    this.state = {
      events: [
        {
          subject: 'Coffee',
          time: '10.30am',
          description: 'drink coffee drink coffee drink coffee drink coffee drink coffee drink coffee drink coffee drink coffee',
          location: 'Quantum Coffee',
        },
        {
          subject: 'Shit',
          time: '11am',
          description: 'go shit go shit go shit go shit go shit go shit go shit go shit',
          location: 'Brainstation Toilet',
        }
      ],
      location: ['1235', '99999'],
    }
  }

  submitTask = () => {

    this.setState({
      events: this.state.events.concat(
        {
          subject: this.subject.value,
          time: this.time.value,
          description: this.description.value,
          location: this.location.value,
        }
      )
    })
  }

  render() {

    console.log(this.state)

    return (
      <div className="App">
        {/* <MapContainer /> */}
        <div id="map"></div>

        <Route exact path='/' render={() => <Summary events={this.state.events} />} /><hr/>
        {/* <Route exact path='/' render={() => <Form submitTask={this.submitTask} />} /><hr/> */}
        {/* <Route exact path='/' render={() => <MapContainer />} /><hr/> */}
        <Route path='/:eventId' render={(props) => <FullDetail events={this.state.events} {...props} />} />


        <div className="Form">
          <h1>Add an event</h1>
          <form>
            Subject: <input type="text" ref={(self) => { this.subject = self }} /><br />
            Time: <input type="time" ref={(self) => { this.time = self }} /><br />
            Description: <textarea rows="4" cols="50" ref={(self) => { this.description = self }} /><br />
            Location: <input type="text" placeholder="value comes from map" ref={(self) => { this.location = self }} /><br />
            <button type="button" onClick={this.submitTask}>Add task</button>
          </form>
        </div>

      </div>
    );
  }
}


App.propTypes = { ...App.propTypes, ...geoPropTypes };

export default geolocated()(App);