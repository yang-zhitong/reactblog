import React from "react";
import { Link } from "react-router-dom";
import { getDate } from '../tool';

const Article = props => {
  const tags = props.tag.map((it,index) => {
    return (
      <Link key={index} to={`/tag/${it}`} className="tag">
        #{it}
      </Link>
    );
  });
  return (
    <div className="article-box">
      <div className="title-wrap">
        <h1>
          <Link to={`/post/${props.filename}`} className="article-link">
            {props.title || ''}
          </Link>
        </h1>
        <time dateTime={getDate(props.date)} className="article-time">
          {getDate(props.date, { day: 1 })}
        </time>
      </div>
      <p className="article-tags">
        {tags}
        <Link to={`/post/${props.filename}`} className="more">
          Read More...
        </Link>
      </p>
    </div>
  );
};

const ArticleList = props => {
  const { post } = props;
  const list = post.map((item, index) => {
    return <Article {...item} key={index} />;
  });

  return (
    <div className="left-content">
      {list}
    </div>
  );
}

export default ArticleList;
