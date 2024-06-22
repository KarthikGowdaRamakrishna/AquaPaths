import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../Redux/store';
import moment from "moment";
import { News } from "../Static/types";
import NewsCard from "./newsCard";
import { LOOKUP } from "../Static/lookup";
import { useState, useEffect, useTransition } from "react";
import { loadNews } from "../Services/newsService";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { launchIcon, pagination, newsImageBox, newsContentBox, newsImageSkeleton } from "../Static/styles";
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from "react-i18next";


const NewsComponent = () => {
    const dispatch: any = useDispatch();
    const {t} = useTranslation();

    const news = useSelector((state: RootState) => state.news as any);
    const [currentPage, setCurrentPage] = useState(0);
    const newsPerPage = 17;

    const indexOfLastNews = (currentPage + 1) * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news?.newsData?.slice(indexOfFirstNews, indexOfLastNews);

    const handleChangePage = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber - 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (news?.newsData?.length === 0) {
                dispatch(loadNews());
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

    if (news?.newsData?.length === 0) {
        console.log("Displaying Skeletons, news data is empty.");
        return (
            <Box sx={newsImageBox}>
                <Skeleton variant="rectangular" height={380} width="55%" sx={newsImageSkeleton} />
                <Box sx={newsContentBox}>
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    <Skeleton width="100%" height={110} />
                    <Skeleton width="100%" height={110} />
                    <Skeleton width="100%" height={70} />
                    <Skeleton width="30%" height={30} />
                </Box>
            </Box>
        );
    }

    return (
        <div>
            {currentNews ? (
                <>
                    <section className="featured-article">
                        <article>
                            <img src={currentNews[0]?.urlToImage} alt={currentNews[0]?.title} />
                            <div className="article-info">
                                <div className='article-header'>
                                    <span>{currentNews[0]?.source?.name}</span>
                                    <span>{moment(currentNews[0]?.publishedAt).format(LOOKUP?.NEWS_COMPONENT?.DATE_FORMAT)}</span>
                                </div>
                                <h2>{currentNews[0]?.title}</h2>
                                <p className="description">{currentNews[0]?.description}</p>
                                <p className="newsContent">{currentNews[0]?.content}</p>
                                <a className="read-article" href={currentNews[0]?.url}>{t(LOOKUP?.NEWS_COMPONENT?.READ_ARTICLE)}<ArrowOutwardRoundedIcon sx={launchIcon} /></a>
                            </div>
                        </article>
                    </section>
                    <div className="otherNews-container">
                        {currentNews?.slice(1).map((otherNews: News, index: number) => (
                            <NewsCard key={index} otherNews={otherNews} />
                        ))}

                    </div>
                    <Box className="Pagination-Box">
                        <Pagination
                            count={Math.ceil(news?.newsData?.length / newsPerPage)}
                            page={currentPage + 1}
                            onChange={handleChangePage}
                            color="primary"
                            size='large'
                            sx={pagination}
                        />
                    </Box>
                </>
            ) : (
                <Box sx={newsImageBox}>
                    <Skeleton variant="rectangular" height={380} width="55%" sx={newsImageSkeleton} />
                    <Box sx={newsContentBox}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        <Skeleton width="100%" height={110} />
                        <Skeleton width="100%" height={110} />
                        <Skeleton width="100%" height={70} />
                        <Skeleton width="30%" height={30} />
                    </Box>
                </Box>
            )}
        </div>
    )
}

export default NewsComponent;