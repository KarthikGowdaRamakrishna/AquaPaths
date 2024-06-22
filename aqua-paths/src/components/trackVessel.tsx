import React, { useRef, useState, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

import { config, MapStyle } from "@maptiler/sdk";


const TrackVessel = () => {
    const mapContainer = useRef(null);
    const vesselMap = useRef<maptilersdk.Map | null>(null);
    const [zoom] = useState(10);
    const [markers, setMarkers] = useState<maptilersdk.Marker[]>([]);
    if (process.env.REACT_APP_MAPTILERSDSK !== undefined) {
        maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILERSDSK;
    } else {
        console.error("REACT_APP_MAPTILERSDSK is undefined");
    }
    
    useEffect(()=>{
        if (!vesselMap.current && mapContainer.current) {
            vesselMap.current = new maptilersdk.Map({
                container: mapContainer.current,
                style: MapStyle.BASIC,
                geolocate: maptilersdk.GeolocationType.POINT,
            });
        }
    },[])

  return (
    <div>
    <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    </div>
  );
};

export default TrackVessel;
