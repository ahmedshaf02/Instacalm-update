import React, { useEffect, useState } from "react";
import "./news.css";
import { Link } from "react-router-dom";

const News = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(
      "https://content.guardianapis.com/search?api-key=39782412-e5f8-4010-823b-cdb63041e8e4"
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setData(data.response.results);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="containerNews">
        <h4>Top News - </h4>
        {data &&
          data.map(ele => (
            <>
              <div className="newsBox">
                <div className="newsDisplay">
                  <div className="newsImg">
                    <img
                      width="60"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxOYtUvih4-o1dZk474agAXbvY-et2jZiVezbBbcsTTwxX_s4e&usqp=CAU"
                      alt="news"
                    />
                  </div>

                  <div>
                    <h6>{ele.webTitle}</h6>
                    <h6>{ele.sectionName}</h6>
                    <h6>{ele.webPublicationDate.substr(0, 10)}</h6>
                    <h6>
                      <a href={ele.webUrl} target="_blank">
                        Read More
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default News;
