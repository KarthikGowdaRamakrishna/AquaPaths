const NewsAPI = require('newsapi');
require('dotenv').config()

const newsapi = new NewsAPI(process.env.NEWS_API);
const today = new Date();

const fromDate = new Date(today);
fromDate.setDate(today.getDate() - 16);
const toDate = today;


const getNews = (req,res) =>{
    newsapi.v2.everything({
        q: 'marine OR cargo',
        sources: 'bbc-news,the-verge,wired',
        domains: 'bbc.co.usa',
        from: fromDate,
        to: toDate,
        language: 'en',
        sortBy: 'publishedAt',
        page: 1
      }).then(response => {
        res.send({
          status:200,
          data:response
        })
      })
      .catch(err=>{
        console.log(err);
        res.send({
            status:200,
            error:err
        })
      })
}

module.exports = {getNews}