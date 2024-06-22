import { useState, FormEvent,useEffect } from 'react';
import { LOOKUP } from "../Static/lookup";
import VideoBackground from './videoBackground';
import { Link, useNavigate } from 'react-router-dom';
import { userSignupFunction } from "../Services/userService";
import { useSelector,useDispatch } from 'react-redux';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import GoogleSignIn from './GoogleSignIn';
import { RootState } from '../Redux/store';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const dispatch: any = useDispatch();
    const userData = useSelector((state: RootState) => state.user as any);
    const navigate = useNavigate();
  
  
    useEffect(()=>{
        if(userData?.userData?._id){
            navigate(LOOKUP?.PATHS?.HOME)
      }
    },[userData])

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault();
        const requestBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        try {
            dispatch(userSignupFunction(requestBody));
        } catch (error: any) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    


    return (
        <>
            <div className='loginPage'>
            <VideoBackground />
                <div className='signupForm'>
                    <form onSubmit={handleSignUp} >
                        <div className='loginTitle'>
                            {t(LOOKUP?.LOGIN_PAGE?.CREATE_ACCOUNT)}
                            <Brightness1Icon className='circle-Icon' />
                        </div>
                        <div className="loginSwitch">
                            {t(LOOKUP?.LOGIN_PAGE?.ALREADY_A_MEMBER)}<Link to="/userLogin">{t(LOOKUP?.LOGIN_PAGE?.LOGIN)}</Link>
                        </div>

                        <div className='inputGroup'>
                            <input
                                type='text'
                                placeholder={t(LOOKUP?.LOGIN_PAGE?.FIRST_NAME_PH)}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='inputGroup'>
                            <input
                                type='text'
                                placeholder={t(LOOKUP?.LOGIN_PAGE?.LAST_NAME_PH)}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className='btn-layout'>
                            <div className='submit-btn-layout'>
                                <button type='submit' className='signupButton'>{t(LOOKUP?.LOGIN_PAGE?.CREATE_ACCOUNT)}</button>
                            </div>
                            <div className='google'>
                                <GoogleSignIn />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
