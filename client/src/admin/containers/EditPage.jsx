import React, { Component } from 'react';
import Markdown from 'react-markdown';
import Editor from './Editor.jsx';

import 'github-markdown-css';

const debounce = function (func, wait) {
  var args;
  var timeout = null;
  var context;
  var later = function () {
    func.apply(context, args);
  };
  return function () {
    args = arguments;
    context = this;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const { io } = window;

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:9000/');
    this.state = {
      markdownSrc: '',
    };
    this.debounceEmit = debounce(function(data) {
      this.socket.emit('mypost', { content: data.value, filename: data.filename });      
    }, 2000);
    this.handleMarkdownChange = data => {
      this.debounceEmit(data);
      this.setState({ markdownSrc: data.value });
    };
  }

  componentDidMount() {
  }

  render() {
    const { id } = this.props.match.params;    
    return (
      <div className="column columns" style={{ marginBottom: 0 }}>
        <div className="hero is-fullheight column is-5">
          <Editor
            id={id}
            onChange={this.handleMarkdownChange}
          />
        </div>
        <div className="hero is-fullheight column">
          <div className="markdown-body">
            <Markdown source={this.state.markdownSrc} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditPage;
