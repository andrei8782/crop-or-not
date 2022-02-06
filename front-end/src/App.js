import React, { useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager"

import logo from './logo.svg';
import './App.css';

const MapWithADrawingManager = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCUeqo4q2StqCjFPFKSB_2FoB4O17zBdtI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [drawnRect, setDrawnRect] = useState(false);
  console.log(drawnRect)
  return <GoogleMap
    defaultZoom={8}
    defaultCenter={new google.maps.LatLng(-34.397, 150.644)}
  > {
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
        drawingControl={!drawnRect}
        onOverlayComplete={(evt) => {
          console.log(evt)
          evt.setMap(null)
        }}
        onRectangleComplete={(rectangle) => {
          setDrawnRect(true)
          console.log(rectangle.bounds)
        }}
        defaultOptions={{
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
          }
        }}
      />
    }
  </GoogleMap>
}


);

const style = {
  width: '100%'
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to crop-or-not</h1>
      </header>
      <p className="App-intro">
        To get started, select a location by drawing a rectangle over the map.
      </p>
      <div style={style}>
        <MapWithADrawingManager />
      </div>

    <button>Submit</button>

    </div>
  );
}



export default App;
