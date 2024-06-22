import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import * as maptilersdk from '@maptiler/sdk';
import Map from "./mapWithTier";
import MapInputLayer from "./mapInputLayer";
import { loadPathCoordinates } from "../Services/portService";
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import CO2Metrics from "./carbonEmissions";
import WeatherOverview from "./weatherChart";
import {ChartProps} from "../Static/types";

export default function PathFinder() {
    const dispatch: any = useDispatch();
    const [srcValue, setSrcValue] = useState<string | null>("");
    const [destValue, setDestValue] = useState<string | null>("");
    const [srcCoordinate, setSrcCoordinate] = useState<[number, number]>([0, 0]);
    const [destCoordinate, setDestCoordinate] = useState<[number, number]>([0, 0]);
    const [pathCoordinates, setPathCoordinates] = useState<[[number, number]]>([[0, 0]])
    const [midPoints,setMidPoints] = useState<[maptilersdk.Feature]|null>();
    const [durationInfo,setDurationInfo] = useState<any>({})
    const [co2data,setCo2Data] = useState<any>({})
    const [srcCode,setSrcCode] = useState<string|null>('')
    const [destCode,setDestCode] = useState<string|null>('')
    const [weatherData,setWeatherData] = useState<any>()

    const findCoordinates = (srcIndex: [number, number], destIndex: [number, number],srcName : string|null,destName: string|null,srcCode:string|null,destCode:string|null) => {
        setSrcCoordinate(srcIndex)
        setDestCoordinate(destIndex);
        setSrcValue(srcName);
        setDestValue(destName);
        setSrcCode(srcCode);
        setDestCode(destCode);
    }

    const path = useSelector((state: RootState) => state.port as any);

    useEffect(() => {
        if (path?.pathCoordinates?.features?.length > 0) {
            setPathCoordinates(path?.pathCoordinates?.features[0]?.geometry?.coordinates);
            setMidPoints(path?.pathCoordinates?.features[0]?.properties?.areas?.features);
            setDurationInfo(path?.pathCoordinates?.properties);
            setCo2Data(path?.co2Data?.co2e);
            setWeatherData(path?.weatherData?.features);

        }
    }, [path])

    console.log(path);

    const getPath = (allowPanama:boolean,allowSuez:boolean,allowIceCaps:boolean) => {
        const pathData = { srcCoordinate, destCoordinate,allowPanama,allowSuez,allowIceCaps,srcCode,destCode }
        dispatch(loadPathCoordinates(pathData))
    }

    return (
        <>
            <div className="pathfinder-container">
                <MapInputLayer findCoordinates={findCoordinates} getPath = {getPath} midPoints = {midPoints} durationInfo = {durationInfo}/>
                <Map srcCoordinate={srcCoordinate} destCoordinate={destCoordinate} pathCoordinates = {pathCoordinates} midPoints = {midPoints} />
                {pathCoordinates?.length > 0 && co2data?.average && (
                    <CO2Metrics co2data = {co2data} />
                 )}
                {pathCoordinates?.length > 0 && path?.weatherData?.features && (
                    <WeatherOverview data={path?.weatherData?.features} />
                )}
            </div>
        </>

    )
}