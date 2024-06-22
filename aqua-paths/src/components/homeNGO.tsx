import React, { useState, useEffect } from 'react';
import { LOOKUP } from '../Static/lookup';
import { useTranslation } from 'react-i18next';

const HomeNGO = () => {
  const { t } = useTranslation();
  return (
    <div className="homeNGO">
      <div className='homeNews-header'>
        <h1>{t(LOOKUP?.NGO?.TITLE)}</h1>
      </div>
      <div className="ngosection oceanCleanup">
        <video autoPlay loop muted className="backgroundVideo">
          <source src="https://res.cloudinary.com/dzhlmx3ec/video/upload/v1713670435/lzoervhxzmncx80togpj.mp4" type="video/webm" />
        </video>
        <div className="content">
          <h1>{t(LOOKUP?.NGO?.OCEAN)}</h1>
          <p>{t(LOOKUP?.NGO?.OCEAN_CONTENT)}</p>
          <a className='NGOachor' href="https://theoceancleanup.com" target="_blank"  >{t(LOOKUP?.NGO?.BUTTON)}</a>

        </div>
      </div>

      <div className='ngosection-container'>

        <div className=" ngosection2 ">
          <div className="content ">
            <h1>{t(LOOKUP?.NGO?.CORAL)}</h1>
            <p>{t(LOOKUP?.NGO?.CORAL_CONTENT)}</p>
            <a className='NGOachor' href="https://coral.org/en/" target="_blank"  >{t(LOOKUP?.NGO?.BUTTON)}</a>
          </div>
        </div>



        <div className=" ngosection2 ">
          <div className="content">
            <h1>{t(LOOKUP?.NGO?.AWARE)}</h1>
            <p>{t(LOOKUP?.NGO?.AWARE_CONTENT)}</p>
            <a className='NGOachor' href="https://www.padi.com/aware" target="_blank"  >{t(LOOKUP?.NGO?.BUTTON)}</a>
          </div>
        </div>

      </div>
    </div>
  );
};


export default HomeNGO;