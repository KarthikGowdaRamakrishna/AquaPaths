import  { useState, FormEvent,useEffect } from 'react';
import VideoBackground from './videoBackground';
import { LOOKUP } from "../Static/lookup";
import { userLoginFunction } from '../Services/userService';
import GoogleSignIn from './GoogleSignIn';
import { useTranslation } from 'react-i18next';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/store';


const UserLogin = () => {
    const { t } = useTranslation();

    const dispatch: any = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userData = useSelector((state: RootState) => state.user as any);
    const navigate = useNavigate();
  
  
    useEffect(()=>{
        if(userData?.userData?._id){
            navigate(LOOKUP?.PATHS?.HOME)
      }
    },[userData])

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const requestBody = {
                email: email,
                password: password
            }
            dispatch(userLoginFunction(requestBody));
        } catch (error: any) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className='loginPage'>
            <VideoBackground />
                <form onSubmit={handleLogin} className='signupForm'>
                    <h2>{t(LOOKUP?.LOGIN_PAGE?.LOGIN)} </h2>
                    <div className='inputGroup'>
                        <input
                            type='email'
                            placeholder={t(LOOKUP?.LOGIN_PAGE?.EMAIL_PH)}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='inputGroup'>
                        <input
                            type='password'
                            placeholder={t(LOOKUP?.LOGIN_PAGE?.PASSWORD_PH)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='signupButton'>{t(LOOKUP?.LOGIN_PAGE?.LOGIN)} </button>
                    <GoogleSignIn/>
                </form>
            </div>
        </>
    );
}

export default UserLogin;
