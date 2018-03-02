import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';

const style = {
    width: '70%',
    height: '70%'
}

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coordinates: {},
            markerPosition: {},
            placeName: '',
            isLoading: true,
            showingInfoWindow: false
        }
        this.markerClick = this.markerClick.bind(this);
        this.mapClicked = this.mapClicked.bind(this);
    }

    componentDidMount() {
        this.setState({
            coordinates: this.props.coordinates,
            placeName: this.props.placeName,
            isLoading: false
        })
    }

    markerClick = (props, marker, e) => {
        console.log('markerClick')
        this.setState({
            showingInfoWindow: true
        });
    }

    mapClicked = (props) => {
        console.log('props', props)
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {
        return (
            <Map google={this.props.google}
                style={style}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                zoom={14}
                onClick={this.mapClicked}
                onReady={this.fetchPlaces}>

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDK5cgjI7DpnkOJrbLuXUcx6FA2KPl72Jw')
})(MapContainer)