import { newsLoading,newsReceived } from '../Redux/features/newsSlice';
import axios from 'axios';


export const loadNews = () => {
    return async (dispatch:any) => {
      dispatch(newsLoading());
      try {
        const response = await axios.get("http://localhost:8080/news/getNews");
        if (response.status === 200) {
            console.log(response)
          dispatch(newsReceived(response.data?.data));
        } else {
          dispatch(newsReceived({})); 
        }
      } catch (error) {
        console.error('Error loading News Data:', error);
        dispatch(newsReceived({})); 
      }
    };
  };
