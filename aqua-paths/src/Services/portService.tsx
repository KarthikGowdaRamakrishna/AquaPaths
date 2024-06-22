import { PortAction, portsDataLoading, portsDataReceived,pathCoordinatesLoading,portsCoordinatesReceived } from '../Redux/features/portSlice';
import axios from 'axios';
import {PathCoordinates} from "../Static/types";

export const loadPortData = () => {
  return async (dispatch:any) => { 
    dispatch(portsDataLoading()); 
    try {
      const response = await axios.get("http://localhost:8080/port/portData");
      if (response.status === 200) {
        dispatch(portsDataReceived(response.data?.portData)); 
      } else {
        dispatch(portsDataReceived({})); 
      }
    } catch (error) {
      console.error('Error loading port data:', error);
      dispatch(portsDataReceived({})); 
    }
  };   
};

export const loadPathCoordinates = (body:PathCoordinates) => {
  console.log(body)
    return async (dispatch:any) => {
      dispatch(pathCoordinatesLoading());
      try {
        const response = await axios.post("http://localhost:8080/sea/getRoute",body);
        if (response.status === 200) {
          console.log(response);
          dispatch(portsCoordinatesReceived(response.data));
        } else {
          dispatch(portsCoordinatesReceived({})); 
        }
      } catch (error) {
        console.error('Error loading port data:', error);
        dispatch(portsDataReceived({})); 
      }
    };
  };
