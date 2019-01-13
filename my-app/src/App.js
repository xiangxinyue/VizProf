import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
	fetchPlaces(mapProps, map) {
	const {google} = mapProps;
	const service = new google.maps.places.PlacesService(map);
  // ...
    }
	
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
	};

	onMarkerClick = (props, marker, e) =>
		this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
    });
    
	render() {
         var highlightedIcon = {
        url:  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2', // url
        scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
    };
	return (
		<Map 
			google={this.props.google} 
			zoom={17}
			style={style}
			initialCenter={{
            lat: 53.525377, 
            lng: -113.525203
			}}
			>
		<Marker 
		    onClick={this.onMarkerClick}
	    	title={'Administration Building'}
			name={'University of Alberta'} />		
		<Marker
			onClick={this.onMarkerClick}
			title={'Computing Science'}
			name={'3.44'}
			position={{lat: 53.526805, lng: -113.526671}} />
		<Marker
			onClick={this.onMarkerClick}
			title={'Chemistry'}
			name={'3.64'}
			position={{lat: 53.527470, lng: -113.524521}} 
			icon={highlightedIcon}
 
			
			
			/>	
		<Marker
			onClick={this.onMarkerClick}
			title={'Mechanical Engineering'}
			name={'3.66'}
			position={{lat: 53.527736, lng: -113.527784	}} />	

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
		</Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCA32YtSecGralPoFapbqOSR1pY58EXwRA')
})(MapContainer)

//export App
//export class MapContainer extends React.Component {}
 
//export default GoogleApiWrapper({apiKey: ('AIzaSyCA32YtSecGralPoFapbqOSR1pY58EXwRA')})(MapContainer);
