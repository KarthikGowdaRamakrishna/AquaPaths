import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LOOKUP } from '../Static/lookup';


const VideoBackground = () => {
    const [isLogin,setIsLogin] = useState(false);

    const location = useLocation();

    useEffect(()=>{
        if(location?.pathname === LOOKUP?.PATHS?.LOGIN || location?.pathname === LOOKUP?.PATHS?.USERLOGIN){
            setIsLogin(true)
        }
        else{
            setIsLogin(false);
        }
    },[location])


  return (
      <div className='video-background'>
        <video autoPlay loop muted className='background-main' src={isLogin === true?LOOKUP?.VIDEO_BACKGROUNDS?.LOGIN_BACKGROUND:LOOKUP?.VIDEO_BACKGROUNDS?.HOME_BACKGROUND}>
        </video>
      </div>
  );
};

export default VideoBackground;
