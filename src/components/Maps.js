import React, { Component } from "react";
import { connect } from "react-redux";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polyline,
    Marker
} from "react-google-maps";
import { selectPlases } from "../filter";
import { compose, withProps, lifecycle } from "recompose";

const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
            onClick={evt => {
                console.log(evt);
                let lat = evt.latLng.lat();
                let lng = evt.latLng.lng();
                props.handleNewMarker(evt.latLng.lat(), evt.latLng.lng());
            }}>
            <Marker position={{ lat: props.lat, lng: props.lng }} />
            {!props.newMarker ? null : (
                <Marker
                    position={{ lat: props.newMarker.lat, lng: props.newMarker.lng }}
                />
            )}
            <Polyline
                path={[
                    { lat: props.lat, lng: props.lng },
                    { lat: props.newMarker.lat, lng: props.newMarker.lng }
                ]}
            />
        </GoogleMap>
    ))
);

class Maps extends Component {
    state = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 11,
        newMarker: {},
        markerForRoute: {}
    };
    handleNewMarker = (lat, lng) => {
        this.setState({
            newMarker: {
                lat: lat,
                lng: lng
            }
        });
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        });
    }

    render() {
        const { center, newMarker } = this.state;

        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    lat={center.lat}
                    lng={center.lng}
                    onClick={evt => {}}
                    handleNewMarker={this.handleNewMarker}
                    newMarker={newMarker}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        plase: selectPlases(state, ownProps.match.params.id)
    };
};

export default connect(mapStateToProps)(Maps);
