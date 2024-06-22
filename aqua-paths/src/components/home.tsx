import React, { useState, useEffect } from 'react';
import HomeNews from './homeNews';
import VideoBackground from './videoBackground';
import HomeNGO from './homeNGO';
import Embed from 'react-embed';
import { LOOKUP } from '../Static/lookup';
import { useTranslation } from 'react-i18next';


const Home = () => {

  const {t} = useTranslation();

  return (
    <div>
    <div className='home-banner'>
      <VideoBackground/>
    </div>
    <div className="animated-title">
  <div className="text-top">
    <div>
      <span>{t(LOOKUP?.HOME_NEWS?.HEADER_1)}</span>
      <span>{t(LOOKUP?.HOME_NEWS?.HEADER_2)}</span>
    </div>
  </div>
  <div className="text-bottom">
    <div>{t(LOOKUP?.HOME_NEWS?.HEADER_3)}</div>
  </div>
</div>
    <HomeNews/>
    <HomeNGO/>
    </div>
  );
};

export default Home;
