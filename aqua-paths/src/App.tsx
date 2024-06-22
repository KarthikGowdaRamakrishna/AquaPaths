import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import "leaflet/dist/leaflet.css";
import PathFinder from './components/pathFinder';
import GoogleSignIn from './components/GoogleSignIn';
import NewsComponent from './components/newsComponent';
import Nav from './components/nav';
import { loadPortData } from "../src/Services/portService";
import { useDispatch } from 'react-redux';
import Home from './components/home';
import Login from './components/login';
import About from './components/about';
import UserLogin from './components/userLogin';
import { LOOKUP } from './Static/lookup';
import { loadNews } from './Services/newsService';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';


function App() {
  const dispatch: any = useDispatch();
  
  useEffect(() => {
    dispatch(loadPortData());
    dispatch(loadNews());
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
          <Route path={LOOKUP?.PATHS?.GETPATH} element={<PathFinder />} />
          <Route path={LOOKUP?.PATHS?.NEWS} element={<NewsComponent />} />
          <Route path={LOOKUP?.PATHS?.LOGIN} element={<Login />} />
          <Route path={LOOKUP?.PATHS?.USERLOGIN} element={<UserLogin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
