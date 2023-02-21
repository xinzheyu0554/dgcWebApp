import React, {useEffect} from 'react'
import { Loader } from "@googlemaps/js-api-loader";
import {Container} from "react-bootstrap";

const GoogleMapSite = () => {
    
  // use the googlemap apiKey and set the places library
    const location = {
        lat: -37.78814220376919,
        lng: 145.15254641554145
    };
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries: ["places"]
    });
  // set the lng and lat which will be passed from props for a place, and then the zoom is 15 
    const mapOptions = {
        center: location,
        zoom: 19
    };

      useEffect(() => {
        loader
        .load()
        .then((google) => {
            const map = new google.maps.Map(document.getElementById("map"), mapOptions);
            new google.maps.Marker({
                position: location,
                map: map,
                title: 'Hello World!'
              });
        })
        .catch(e => {
          console.log(e.message)
        });
        // eslint-disable-next-line 
      }, [mapOptions])
  return (    
    <Container id="map" style={{ textAlign:"center", height:"50vh", width:"100%"}}></Container>
    
  )
}

export default GoogleMapSite