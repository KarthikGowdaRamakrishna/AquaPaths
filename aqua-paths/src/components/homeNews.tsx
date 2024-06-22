import React, { useState, useEffect } from 'react';
import NewsCard from './newsCard';
import { useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import { News } from '../Static/types';
import {LOOKUP} from "../Static/lookup";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const HomeNews = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const news = useSelector((state: RootState) => state.news as any);
  return (
    <div className='home-news-container'>
      <div className='homeNews-header'>
        <h1>{t(LOOKUP?.HOME_NEWS?.LATEST_NEWS)}</h1>
        <h5 onClick={() =>(navigate(LOOKUP?.PATHS?.NEWS))}>{t(LOOKUP?.HOME_NEWS?.VIEW_ALL)}</h5>
      </div>
      <div className='home-news'>
        {news?.newsData?.slice(0, 4).map((latest: News, index: number) => (
          <NewsCard otherNews={latest} />
        ))}
      </div>
    </div>
  );
};

export default HomeNews;
