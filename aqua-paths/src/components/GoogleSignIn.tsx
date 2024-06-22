import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { googleSignIn } from '../Services/userService';
import { RootState } from '../Redux/store';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOOKUP } from '../Static/lookup';




function GoogleSignIn() {
  const dispatch: any = useDispatch();
  const userData = useSelector((state: RootState) => state.user as any);
  const navigate = useNavigate();


  useEffect(()=>{
    console.log(userData)
    if(userData?.userData?._id){
      navigate(LOOKUP?.PATHS?.HOME)
    }
  },[userData])

  return (
    <GoogleLogin
  onSuccess={credentialResponse => {
    if(credentialResponse?.credential){
      dispatch(googleSignIn(credentialResponse?.credential));
    }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
  );
}

export default GoogleSignIn;
