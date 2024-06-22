import React, { useState, useEffect } from 'react';
import { News } from '../Static/types';
import { LOOKUP } from '../Static/lookup';
import bbcIcon from "../Assests/Icons/bbc.jpg";
import abcLogo from "../Assests/Icons/abc.png";
import vergeIcon from "../Assests/Icons/verge.jpg";
import moment from 'moment';
import wiredLogo from "../Assests/Icons/wired.jpg";
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import {launchIcon} from "../Static/styles";
import { useTranslation } from 'react-i18next';


const NewsCard: React.FC<{ otherNews: News }> = ({ otherNews }) => {
    const {t} = useTranslation();

    const selectLogo = (id:string) =>{
        switch(id){
            case LOOKUP?.NEWS_COMPONENT?.BBC_ID:
                return bbcIcon;
            case LOOKUP?.NEWS_COMPONENT?.ABC_ID:
                return abcLogo;
            case LOOKUP?.NEWS_COMPONENT?.VERGE_ID:
                return vergeIcon;
            default:
                return wiredLogo;
        }
    }

  return (
    <div className='otherNews-card'>
        <div>
            <img src = {otherNews?.urlToImage} className='news-Image'/>
        </div>
        <div className='otherNews-header'>
            <img src={selectLogo(otherNews?.source?.id)} className='news-Icon'/>
            <h5>{moment(otherNews?.publishedAt).format(LOOKUP?.NEWS_COMPONENT?.DATE_FORMAT_2)}</h5>
        </div>
        <div className='otherNews-title'>
            {`'${otherNews?.title}'`}
        </div>
        <div className='otherNews-desc'>
            {otherNews?.description}
        </div>
        <div>
            <a href={otherNews?.url} target='_blank'>{t(LOOKUP?.NEWS_COMPONENT?.READ_ARTICLE)}<ArrowOutwardRoundedIcon sx = {launchIcon}/></a>
        </div>
    </div>
  );
};

export default NewsCard;
