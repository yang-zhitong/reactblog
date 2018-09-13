import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { axios } from '../api';
import Markdown from 'react-markdown';

import 'github-markdown-css';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      menu: [],
    };
    this.handlePage = this.handlePage.bind(this);
  }

  handlePage() {
    const { name } = this.props.match.params;
    axios({
      url: '/post/' + name,
      method: 'get',
    }).then((res) => {
      this.setState(res);
    });
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate', prevProps);
    if (prevProps.match.params.name !== this.props.match.params.name) {
      console.log('只是切换了url');
      this.handlePage();
    }
  }

  componentDidMount() {
    this.handlePage();
  }

  render() {
    const { content, menu } = this.state;
    let [ prev = {}, center = {}, next = {} ] = menu;
    if (menu.length === 2) {
      if (menu[0].index === 0) {
        [ center, next, prev = null ] = menu;
      } else {
        [ prev, center, next = null ] = menu;
      }
    }
    return (
      <div className="content">
        <article className="post">
          <header className="post-header">
            <h1 className="post-title">{center.title}</h1>
            <time className="post-time">{center.date}</time>
          </header>
          <div className="markdown-body post-content">
            <Markdown source={content} />
          </div>
          <footer className="post-footer">
          <div className="post-tags">
            {center.tag && center.tag.map((tag, i) => <Link key={i} to={`/tag/${tag}`}>{tag}</Link>)}
          </div>
            <nav className="post-nav">
              {
                !prev
                ? <i/>
                : (
                  <Link className="prev" to={`/post/${prev.filename}`}>
                    <span className="iconfont icon-left">&#10216;</span>
                    <span className="prev-text nav-default">{prev.title}</span>
                  </Link>
                ) 
              }
              {
                !next
                ? <i/>
                : (
                  <Link className="next" to={`/post/${next.filename}`}>
                    <span className="next-text nav-default">{next.title}</span>
                    <span className="iconfont icon-right">&#10217;</span>
                  </Link>
                ) 
              }
            </nav>

          </footer>
        </article>
      </div>
    )
  }
}

export default Detail;
