import React, { Component } from "react";
import { axios } from "../api";
import { Link } from "react-router-dom";
import { getDate } from '../tool';

class Archives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
    }
  }

  componentDidMount() {
    axios.get('/post').then(res => {
      this.setState({ postList: res });
    });
  }

  render() {
    const list = this.state.postList.map(it => {
      return (
        <Link to={`/post/${it.filename}`}  key={it.index} className="archive-post">
          <span className="archive-post-time">{getDate(it.date, {day: 1}).replace(/^\w+\s/, '')}</span>
          <span className="archive-post-title">
              {it.title}<span className="archive-post-link"></span>
          </span>
        </Link>
      )
    });
    return (
      <section id="archive" className="archive">
        <div className="collection-title">
          <h2 className="archive-year">2018</h2>
        </div>
        {list}
      </section>
    );
  }
}

export default Archives;
