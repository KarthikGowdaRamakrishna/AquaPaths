import { useEffect, useState } from "react";
import { LOOKUP } from "../Static/lookup";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useSelector,useDispatch } from 'react-redux';
import { languageDropDown, languageMenuItem } from "../Static/styles";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { menuIcon } from "../Static/styles";
import { RootState } from '../Redux/store';
import {signOutUser} from "../Redux/features/userSlice";



export default function Nav() {
    const [inHome, setInHome] = useState(true)
    const [lang, setLang] = useState<string | null>(LOOKUP?.LANGUAGES?.EN);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [openMenu, setOpenMenu] = useState(false);
    const userData = useSelector((state: RootState) => state.user as any);
    const dispatch = useDispatch();


   

    useEffect(() => {
        if (location?.pathname === LOOKUP?.PATHS?.HOME || location?.pathname === LOOKUP?.PATHS?.DEFAULT_HOME) {
            setInHome(true)
        }
        else {
            setInHome(false)
        }
    }, [location])

    console.log(userData);

    const signout =() =>{
        console.log("reached")
        dispatch(signOutUser());
        navigate(LOOKUP?.PATHS?.HOME);
    }

    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setLang(newValue)
    };

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang])


    const handleClick = (path: any) => {
        setOpenMenu(false);
        navigate(path)
    };
    return (
        <div className={inHome ? 'nav home-background-nav' : 'nav'}>
            <div className="logo" onClick={() => { handleClick(LOOKUP?.PATHS?.HOME) }}>
                {t(LOOKUP?.WEB_APP_NAME)}
            </div>
            <div className="navigation">
                <ul>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.HOME)}>{t(LOOKUP?.NAVBAR?.HOME)}</li>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.GETPATH)}>{t(LOOKUP?.NAVBAR?.CHECK_CARGO)}</li>
                    <li onClick={() => handleClick(LOOKUP?.PATHS?.NEWS)}>{t(LOOKUP?.NAVBAR?.NEWS)}</li>
                    {!userData?.userData._id?(
                        <li onClick={() => handleClick(LOOKUP?.PATHS?.LOGIN)}>{t(LOOKUP?.NAVBAR?.LOGIN)}</li>
                    ):(
                        <li onClick={() => signout()}>{t(LOOKUP?.NAVBAR?.SIGNOUT)}</li>
                    )}
                    <div className="languageDropDown">
                        <Select defaultValue={LOOKUP?.LANGUAGES?.EN} onChange={handleChange} sx={languageDropDown}>
                            <Option value={LOOKUP?.LANGUAGES?.EN} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.EN.toUpperCase()}</Option>
                            <Option value={LOOKUP?.LANGUAGES?.FR} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.FR.toUpperCase()}</Option>
                            <Option value={LOOKUP?.LANGUAGES?.KN} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.KN.toUpperCase()}</Option>
                        </Select>
                    </div>
                </ul>
            </div>
            <div className="drawer-menu">
                <MenuIcon onClick={() => { setOpenMenu(true) }} sx={menuIcon}></MenuIcon>
                <Drawer
                    open={openMenu}
                    onClose={() => { setOpenMenu(false) }}
                    anchor="right"
                >
                    <div className="drawer-menus">
                        <ul>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.HOME)}>{t(LOOKUP?.NAVBAR?.HOME)}</li>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.GETPATH)}>{t(LOOKUP?.NAVBAR?.CHECK_CARGO)}</li>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.NEWS)}>{t(LOOKUP?.NAVBAR?.NEWS)}</li>
                            <li>{t(LOOKUP?.NAVBAR?.About)}</li>
                            <li onClick={() => handleClick(LOOKUP?.PATHS?.LOGIN)}>{t(LOOKUP?.NAVBAR?.LOGIN)}</li>
                            <div className="languageDropDown">
                                <Select defaultValue={LOOKUP?.LANGUAGES?.EN} onChange={handleChange} sx={languageDropDown}>
                                    <Option value={LOOKUP?.LANGUAGES?.EN} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.EN.toUpperCase()}</Option>
                                    <Option value={LOOKUP?.LANGUAGES?.FR} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.FR.toUpperCase()}</Option>
                                    <Option value={LOOKUP?.LANGUAGES?.KN} sx={languageMenuItem}>{LOOKUP?.LANGUAGES?.KN.toUpperCase()}</Option>
                                </Select>
                            </div>
                        </ul>
                    </div>
                </Drawer>
                <div></div>
            </div>
        </div>

    )
}