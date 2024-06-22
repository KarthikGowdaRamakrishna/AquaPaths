import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { WindLayer } from "@maptiler/weather";
import { MapProps, PathCoordinates } from '../Static/types';

import { config, MapStyle } from "@maptiler/sdk";


const Map: React.FC<MapProps> = ({ srcCoordinate, destCoordinate, pathCoordinates, midPoints }) => {
    const mapContainer = useRef(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const [zoom] = useState(10);
    const [markers, setMarkers] = useState<maptilersdk.Marker[]>([]);


    useEffect(()=>{
        if (process.env.REACT_APP_MAPTILERSDSK !== undefined) {
            maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILERSDSK;
        } else {
            console.error("REACT_APP_MAPTILERSDSK is undefined");
        }
    },[])

    const addMarkers = (map: any) => {
        const newMarkers = midPoints.map((coordinate: any) => {
            const marker = new maptilersdk.Marker()
                .setLngLat(coordinate?.geometry?.coordinates)
                .addTo(map.current);
            const popup = new maptilersdk.Popup()
                .setLngLat(coordinate?.geometry?.coordinates)
                .setHTML(coordinate?.properties?.name)
                .addTo(map.current);
                marker.setPopup(popup);
            return marker;
        });

        setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
    };

    const removeMarkers = () => {
        markers.forEach(marker => marker.remove());
        setMarkers([]);
    };

    useEffect(() => {
        if (!map.current && mapContainer.current) {
            map.current = new maptilersdk.Map({
                container: mapContainer.current,
                style: MapStyle.BASIC,
                geolocate: maptilersdk.GeolocationType.POINT,
            });
        }
        else {
            if (map.current && !map.current.style._loaded) {
                return;
            }
            removeMarkers();
            if (map.current && mapContainer.current && srcCoordinate && srcCoordinate[0] !== 0 && srcCoordinate[1] !== 0) {
                const originMarker = new maptilersdk.Marker({
                    color: 'red'
                })
                    .setLngLat(srcCoordinate)
                    .addTo(map.current);
                setMarkers(prevMarkers => [...prevMarkers, originMarker]);
                map.current?.flyTo({ center: srcCoordinate, zoom: 9 })
            }
        }
        if (map.current && mapContainer.current && srcCoordinate && destCoordinate && pathCoordinates?.length > 3 && map?.current) {
            const destMarker = new maptilersdk.Marker({
                color: 'blue'
            })
                .setLngLat(destCoordinate)
                .addTo(map.current);
            setMarkers(prevMarkers => [...prevMarkers, destMarker]);
            if (map.current && mapContainer.current && pathCoordinates?.length > 0) {
                if (map.current.getLayer('route')) {
                    map.current.removeLayer('route');
                }

                if (map?.current?.getSource('route')) {
                    map?.current?.removeSource('route');
                }

                map.current?.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': pathCoordinates
                        }
                    }
                });

                map.current?.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#0BDA51',
                        'line-width': 5,
                        "line-blur": 0,
                    }
                });
                addMarkers(map);
                map.current?.flyTo({ center: destCoordinate, zoom: 2 })
            }
        }
    }, [srcCoordinate, destCoordinate, zoom, pathCoordinates]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}
export default Map;
