import { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, ListItem, ListItemText, Box } from '@mui/material';
import { inputAutocomplete, savedRouteBox, inputBox } from "../Static/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import { PortData } from "../Static/types";
import { MapInputLayerProps } from "../Static/types";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import { LOOKUP } from "../Static/lookup";
import { primaryBtn,savedIcon } from "../Static/styles";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IOSSwitch } from "../Static/customMaterialUI";
import { t } from "i18next";
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { userSaveRoutes } from "../Services/userService";
import { Location } from "../Static/types";
import StarIcon from '@mui/icons-material/Star';


const MapInputLayer: React.FC<MapInputLayerProps> = ({ findCoordinates, getPath, midPoints, durationInfo }) => {
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.user as any);
    const [srcValue, setSrcValue] = useState<string | null>("");
    const [destValue, setDestValue] = useState<string | null>("");
    const [inputValueSrc, setInputValueSrc] = useState('');
    const [inputValueDest, setInputValueDest] = useState('');
    const [openFilter, setOpenFilter] = useState(false);
    const [allowPanama, setOpenPanama] = useState(false);
    const [allowSuez, setAllowSuez] = useState(false);
    const [allowIceCaps, setAllowIceCaps] = useState(false);
    const portData = useSelector((state: RootState) => state.port as PortData);
    const [value, setValue] = useState(0);
    const [warningMessage, setWarningMessage] = useState('');
    const [searchDone, setSearchDone] = useState(false);
    const [nContainer, setNContainers] = useState(1);
    const [contCode, setContCode] = useState('20GP');
    // const [existingConfig,setExistingConfig] = useState(false)
;

    const savedLocations: Location[] = user?.userData?.savedLocation || [];

    const dispatch: any = useDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function millisecondsConverter(milliseconds: any) {
        const hours = milliseconds / (1000 * 60 * 60);
        const formattedHours = Math.floor(hours);

        return (
            <div className="journey-duration">
                {formattedHours}{t(LOOKUP?.SPECIAL_CHARS?.SPACE)}{t(LOOKUP?.MAP_INPUTS?.HOURS)}
            </div>
        );
    }


    function metersToKilometers(meters: number) {
        const kilometers = meters / 1000;
        const formattedKilometers = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(kilometers);
        return <div className="journey-distance">({formattedKilometers}{t(LOOKUP?.SPECIAL_CHARS?.SPACE)}{t(LOOKUP?.MAP_INPUTS?.KM)})</div>;
    }

    const chekcDuplicate = () => {
        if (savedLocations) {
            return savedLocations.some(location =>
                location.srcCoordinates === srcValue && location.destCoordinates === destValue
            )
        }
    }


    useEffect(() => {
        if (srcValue && destValue) {
            // if(chekcDuplicate()){
            //     setExistingConfig(true);
            // }
            const srcCoordinates = portData?.portData[portData?.searchData?.findIndex(option => option === srcValue)]?.COORDINATES;
            const destCoordinates = portData?.portData[portData?.searchData?.findIndex(option => option === destValue)]?.COORDINATES;
            const srcCode = srcValue?.split(' ')[0].replace(/[{()}]/g, '');
            const destCode = destValue?.split(' ')[0].replace(/[{()}]/g, '');
            findCoordinates(srcCoordinates, destCoordinates, srcValue, destValue, srcCode, destCode);
        }
    }, [srcValue, destValue])

    const searchPath = () => {
        getPath(allowPanama, allowSuez, allowIceCaps);
        setSearchDone(true);
    }




    const savePath = () => {
        const isDuplicate = chekcDuplicate();

        if (isDuplicate) {
            setWarningMessage('*This route configuration already exists*');
            return;
        }
        setWarningMessage('');
        const reqBody = {
            email: user?.userData?.email,
            srcCoordinates: srcValue,
            destCoordinates: destValue,
            blockIceCaps: allowIceCaps,
            allowPanama: allowPanama,
            allowSuez: allowSuez
        };
        console.log(reqBody);
        if (user?.userData?.email?.trim() !== '') {
            dispatch(userSaveRoutes(reqBody));
        }
    }

    const handleLocationSelect = (location: Location) => {
        console.log("Inside Saved Routes");
        setSrcValue(location.srcCoordinates);
        setDestValue(location.destCoordinates);
        setOpenPanama(location.allowPanama);
        setAllowSuez(location.allowSuez);
        setAllowIceCaps(location.blockIceCaps);
        setValue(0);
    };



    return (
        <div className="map-overlay-inputs">
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Find Route" {...a11yProps(0)} />
                <Tab label="Saved Routes" {...a11yProps(1)} />
            </Tabs>
            <div role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-${0}`}
                aria-labelledby={`simple-tab-${0}`}>
                <div className="map-overlay-trip">
                    {portData?.searchData?.length > 0 ? (
                        <>
                            <div>
                                <Autocomplete
                                    value={srcValue}
                                    onChange={(event: any, newValue: string | null) => {
                                        setSrcValue(newValue);
                                    }}
                                    inputValue={inputValueSrc}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueSrc(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={portData?.searchData}
                                    sx={inputAutocomplete}
                                    renderInput={(params) => <TextField {...params} label="Source" />}
                                />
                            </div>
                            <div>
                                <Autocomplete
                                    value={destValue}
                                    onChange={(event: any, newValue: string | null) => {
                                        setDestValue(newValue);
                                    }}
                                    inputValue={inputValueDest}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueDest(newInputValue);
                                    }}
                                    id="controllable-states-demo"
                                    options={portData?.searchData}
                                    sx={inputAutocomplete}
                                    renderInput={(params) => <TextField {...params} label="Destination" />}
                                />
                            </div>
                            <div className="add-filter" onClick={() => { setOpenFilter(!openFilter) }}>
                                <div>
                                    {t(LOOKUP?.MAP_INPUTS?.ADD_FILTERS)}
                                </div>
                                <div className={openFilter ? "rotated-down" : "rotated-up"}>
                                    <KeyboardArrowUpIcon />
                                </div>
                            </div>
                            <div className={openFilter ? "filter-open" : "filter-close"}>
                                <div className="block-areas-containers">
                                    <div className="checkbox-areas">
                                        {t(LOOKUP?.MAP_INPUTS?.PANAMA_CANAL)}
                                        <IOSSwitch
                                            checked={allowPanama}
                                            onChange={() => setOpenPanama(!allowPanama)}
                                        />
                                    </div>
                                    <div className="checkbox-areas">
                                        {t(LOOKUP?.MAP_INPUTS?.SUEZ_CANAL)}
                                        <IOSSwitch
                                            checked={allowSuez}
                                            onChange={() => setAllowSuez(!allowSuez)}
                                        />
                                    </div>
                                    <div className="checkbox-areas">
                                        {t(LOOKUP?.MAP_INPUTS?.BLOCK_ICE_AREAS)}
                                        <IOSSwitch
                                            checked={allowIceCaps}
                                            onChange={() => setAllowIceCaps(!allowIceCaps)}
                                        />
                                    </div>
                                    {/* <div className="additional-co2">
                                        <div className="disclamer">
                                            {LOOKUP?.MAP_INPUTS?.ADDITIONAL_PARAMETERS_FOR_CO2}
                                        </div>
                                        <div className="inputfields-co2">
                                            <TextField id="standard-basic" value={contCode} label={LOOKUP?.MAP_INPUTS?.CONTAINERS_SIZE_TYPE_CODE} variant="standard" sx={inputBox}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setContCode(event.target.value) }} />
                                            < TextField id="standard-basic" value={nContainer} label={LOOKUP?.MAP_INPUTS?.NO_OF_CONTAINERS} variant="standard" sx={inputBox}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNContainers(parseInt(event.target.value)) }} />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="serch-btn">
                                <Button variant="contained" sx={primaryBtn} onClick={() => { searchPath() }}>{LOOKUP?.MAP_INPUTS?.SEARCH}</Button>
                            </div>
                            {durationInfo && midPoints && (
                                <div className="journey-info">
                                    <div className="infoo">
                                        <div className="info-sub">
                                        {millisecondsConverter(durationInfo?.duration)}
                                        {metersToKilometers(durationInfo?.distance)}
                                        </div>
                                        <div>
                                    </div>
                                    </div>
                                    
                                    <div className="midpoints">
                                        {t(LOOKUP?.MAP_INPUTS?.VIA)}
                                        {midPoints?.map((mids: any, items: number) => (
                                            <ul>
                                                <li className="card-title">
                                                    {mids?.properties?.name}
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                    <div className="save-btn">
                                        <Button variant="contained" disabled={!searchDone} sx={primaryBtn}  onClick={() => { savePath() }}>{LOOKUP?.MAP_INPUTS?.SAVE}</Button>
                                        {warningMessage && <p className='WarningMessage'>{warningMessage}</p>}
                                    </div>
                                </div>
                            )}


                        </>
                    ) : (
                        <></>
                    )}

                </div>
            </div>
            <div className="saved-routes" role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-${1}`}
                aria-labelledby={`simple-tab-${1}`}>
                <Stack spacing={2}>
                    {savedLocations.map((location, index) => (
                        <>
                            <Box sx={savedRouteBox}>
                                <ListItem button key={index} onClick={() => handleLocationSelect(location)}>
                                    <ListItemText primary={`From: ${location?.srcCoordinates}`} secondary={`To: ${location?.destCoordinates}`} />
                                </ListItem >
                            </Box>
                        </>
                    ))}
                </Stack>

            </div>
        </div >
    )
}

export default MapInputLayer;
