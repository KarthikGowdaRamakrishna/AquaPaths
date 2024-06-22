import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type PortAction = ReturnType<typeof portsDataLoading> | ReturnType<typeof portsDataReceived>;


const PortSlice = createSlice({
    name: "ports",
    initialState: {
        loading: 'idle',
        portData: [],
        searchData:[],
        pathCoordinates:[],
        pathLoading:'idle',
        co2Data:{},
        weatherData:{}
    },
    reducers: {
        portsDataLoading(state) {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        portsDataReceived(state, action:PayloadAction<any>) {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.portData = action.payload.transformedData
                state.searchData = action.payload.searchData
            }
        },
        pathCoordinatesLoading(state) {
            if(state.pathLoading === 'idle') {
                state.pathLoading = 'pending'
            }
        },
        portsCoordinatesReceived(state, action:PayloadAction<any>) {
            console.log(action.payload)
            if(state.pathLoading === 'pending') {
                state.pathLoading = 'idle'
                state.pathCoordinates = action.payload.data
                state.co2Data = action.payload.co2TenderData
                state.weatherData = action.payload.weatherData
            }
        }
    }
})

export const { portsDataLoading, portsDataReceived,pathCoordinatesLoading,portsCoordinatesReceived } = PortSlice.actions
export default PortSlice.reducer