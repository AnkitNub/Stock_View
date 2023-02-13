import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./News.css";

const arr = ["HDFC", "ICICI", "IBM"];
const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await Promise.all( 
        arr.map(async (data) => {
          try {
            const res = await Axios.get(
              `https://newsapi.org/v2/everything?q=${data}&sortBy=popularity&pageSize=1&apiKey=${process.env.REACT_APP_NEWS_KEY}`
            );
            const { publishedAt, urlToImage, url, content } =
              res.data.articles[0];
            return { publishedAt, urlToImage, url, content, company: data };
          } catch (err) {
            console.log(err);
          }
        })
      );
      setNews(newsData);
    };
    fetchData();
  }, []);

  if (!news.length) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <>
      <div className='news'>
        <div className='news_search'>
          <h2>News</h2>
          <input type='text' placeholder='Search' className='newsSearch' />
        </div>
        {news.map((data, i) => (
          <div>
            <hr />
            <div key={i} className='all-news'>
              <div className='newsbottom' key={data.company}>
                <div>
                  <h4>{data.company}</h4>

                  <p className='description'>{data.content}</p>
                  <p className='time'>{data.publishedAt}</p>
                </div>
                <img src={data.urlToImage} alt={data.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;

//newsData - news of all the company that are stored in data 
