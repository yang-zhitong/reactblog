import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axios } from '../api';
import ArticleList from './ArticleList';

function WidgetTitle(props) {
  return <h3 className="widget-title">{props.title}</h3>;
}

/* eslint-disable jsx-a11y/anchor-has-content */
function Contact(props) {
  return (
    <div className="widget contact">
      <WidgetTitle title={'Contact'} />
      <div>
        <a
          className="icon github"
          href="https://github.com/yang-zhitong"
          target="_blank"
          rel="noopener noreferrer"
          title="github"
        />
        <a
          className="icon gmail"
          href="mailto://yangzhitong1@gmail.com"
          title="yangzhitong1@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        />
        <a
          className="icon zhihu"
          href="https://www.zhihu.com/people/shi-yike-dou-zi/activities"
          title="知乎"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  );
}

const Categories = props => {
  const list = props.list.map((it, index) => {
    return (
      <li key={index}>
        <Link to={`/category/${it}`} className="category-link">
          {it}
        </Link>
      </li>
    );
  });
  return (
    <div className="widget categories">
      <WidgetTitle title={'Categories'} />
      <ul>{list}</ul>
    </div>
  );
};

const Tags = props => {
  const tags = props.list.map((tag, index) => {
    return (
      <Link to={`/tag/${tag}`} key={index} className="tag">
        {tag}
      </Link>
    );
  });
  return (
    <div className="widget tags-box">
      <WidgetTitle title={'Tags'} />
      <div>{tags}</div>
    </div>
  );
};

let allPost = [];

class HomeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      post: [],
      tags: [],
      categories: [],
      page: 1
    };
  }

  componentDidMount() {
    axios.get('/post').then(all => {
      allPost = all;
      // console.log(res);
      const rightData = all.reduce(
        (total, { category, tag }) => {
          total.categories[category] = 1;
          tag.forEach(onetag => (total.tags[onetag] = 1));
          return total;
        },
        { categories: {}, tags: {} },
      );
      this.setState({
        post: all,
        tags: Object.keys(rightData.tags),
        categories: Object.keys(rightData.categories),
      });
    });
  }

  static getDerivedStateFromProps(nextProps, { page: prevPage }) {
    const { params: { condition, name }} = nextProps.match;
    let newPost = allPost, page = prevPage;
    if (condition === 'category') {
      newPost = allPost.filter(post => post.category === name);
      page = 1;
    } else if (condition === 'tag') {
      newPost = allPost.filter(post => post.tag.includes(name));
      page = 1;
    }
    return { post: newPost, page };
  }

  handlePaging(which) {
    let { page } = this.state;
    if (which === 'next') {
      page++;
    } else {
      page--;
    }
    this.setState({ page });
  }

  render() {
    const PAGE = 10;
    const { post, page, categories, tags } = this.state;
    const count = Math.ceil(post.length / PAGE);
    const start = (page - 1) * PAGE;
    const nowlist = post.slice(start, start + PAGE);
    return (
      <div className="content">
        <ArticleList post={nowlist}/>
        <div className="right-content">
          <Contact />
          <Categories list={categories} />
          <Tags list={tags} />
        </div>
        <nav className="post-nav">
          <div className="btn-wrap">
            {page !== 1 ? (
              <a
                className="prev"
                onClick={this.handlePaging.bind(this, 'prev')}
              >
                <span className="iconfont icon-left">&#10216;</span>
                <span className="prev-text nav-default">Prev</span>
              </a>
            ) : (
              <i />
            )}
            {count !== 1 && page !== count ? (
              <a
                className="next"
                onClick={this.handlePaging.bind(this, 'next')}
              >
                <span className="next-text nav-default">Next</span>
                <span className="iconfont icon-right">&#10217;</span>
              </a>
            ) : (
              <i />
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default HomeIndex;
