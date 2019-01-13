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
		showingInfoWindow: true,
		
    });

	showPopUpOfMarker = (props, marker, e) =>
		this.setState({
		selectedPlace: props,
		activeMarker: marker, 
		showingInfoWindow: true
    });
	hidePopUpOfMarker = (props, marker, e) =>
		this.setState({
		selectedPlace: props,
		showingInfoWindow: false
    });    
	
	onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  
	render() {
         var goodIcon = {
        url:  'https://image.flaticon.com/icons/svg/290/290633.svg', // url
        scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
    };
	    var badIcon = {
        url:  'https://image.flaticon.com/icons/svg/361/361583.svg', // url
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
			name={'University of Alberta'} 			
			/>		
		<Marker
			onClick={this.onMarkerClick}
			title={'Computing Science'}
			name={'3.44'}
			position={{lat: 53.526805, lng: -113.526671}} 
			icon={badIcon}
			/>
		<Marker
			onClick={this.onMarkerClick}
			title={'Chemistry'}
			name={'3.64'}
			position={{lat: 53.527470, lng: -113.524521}} 
 
			icon={badIcon}
			/>	
		<Marker
			onClick={this.onMarkerClick}
			title={'Mechanical Engineering'}
			name={'3.66'}
			position={{lat: 53.527736, lng: -113.527784	}}
			icon={badIcon}
			/>	
		<Marker
			onClick={this.onMarkerClick}
			title={'Art'}
			name={'4.13'}
			position={{lat: 53.524387, lng:  -113.519970	}}
			icon={goodIcon}
			/>	
			
		<Marker
			onClick={this.onMarkerClick}
			title={'Law'}
			name={'3.91'}
			position={{lat: 53.524405, lng: -113.518570	}}
			icon={badIcon}
			/>		
		<Marker
			onClick={this.onMarkerClick}
			title={'Economics'}
			name={'3.45'}
			position={{lat: 53.527749, lng: -113.521533}}
			icon={badIcon}
			/>		
		<Marker
			onClick={this.onMarkerClick}
			title={'Business'}
			name={'3.66'}
			position={{lat: 53.527371, lng: -113.521721}}
			icon={badIcon}
			/>	

		<Marker
			onClick={this.onMarkerClick}
			title={'Statistics'}
			name={'3.18'}
			position={{lat: 53.526622,  lng: -113.524676}}
			icon={badIcon}
			/>	
			
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
			  <h2>{this.state.selectedPlace.name}</h2>
            </div>
        </InfoWindow>
		</Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('API_KEY')
})(MapContainer)

//export App
//export class MapContainer extends React.Component {}
 
//export default GoogleApiWrapper({apiKey: ('AIzaSyCA32YtSecGralPoFapbqOSR1pY58EXwRA')})(MapContainer);

