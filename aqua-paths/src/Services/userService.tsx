import { usersLoggingIn, loginUser,loginUserError, saveUserRoute} from '../Redux/features/userSlice';
import axios from 'axios';

export const userSignupFunction = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const response = await axios.post('http://localhost:8080/user/signUp', body);
            if(response.status === 200){
                dispatch(loginUser(response?.data?.result))
            }
            else {
                dispatch(loginUser({}));
            }
        } catch (error:any) {
            console.error('Error loading News Data:', error);
            dispatch(loginUserError(error?.response?.data?.message));
        }
    };
};


export const userLoginFunction = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const response = await axios.post('http://localhost:8080/user/login', body);
            if (response.status === 200) {
                console.log(response.data?.result);
                dispatch(loginUser(response.data?.result));
            } else {
                dispatch(loginUser({}));
            }
        } catch (error) {
            console.error('Error loading News Data:', error);
            dispatch(loginUser({}));
        }
    };
};

export const googleSignIn = (token:string) => {
    return async (dispatch:any) => {
        dispatch(usersLoggingIn());
        try {
            const config = {
                headers: { authorization: `Bearer ${token}`}
            };
            const response = await axios.post('http://localhost:8080/user/googleLogin', {}, config);
            if (response.status === 200 && response.data && response.data.data) {
                dispatch(loginUser(response.data.data));
            } else {
                dispatch(loginUser({}));
            }
        } catch (error) {
            console.error('Error loading User:', error);
            dispatch(loginUser({}));
        }
    };
};

export const userSaveRoutes = (body: any) => {
    return async (dispatch: any) => {
        dispatch(usersLoggingIn());
        try {
            const response = await axios.put('http://localhost:8080/user/saveRoute', body);
            if (response.status === 200) {
                console.log(response);
                dispatch(saveUserRoute(response.data?.result));
            } else {
                dispatch(saveUserRoute({}));
            }
        } catch (error) {
            console.error('Error Updating User Data:', error);
            dispatch(saveUserRoute({}));
        }
    };
}; 