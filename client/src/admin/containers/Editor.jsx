import React, { Component } from 'react';
import { axios } from '../../api.js';

const { CodeMirror } = window;


class Editor extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.editor = null;
    this.filename = '';
  }

  componentDidMount() {
    axios({
      url: '/articles/' + this.props.id,
      method: 'get',
    }).then(res => {
      this.editor = CodeMirror.fromTextArea(this.refs.editor, {
        mode: "markdown",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });
      this.editor.on('change', this.handleChange);
      this.filename = res.postRes.filename;
      // res.content = '# test';
      this.editor.setValue(res.content);
    });
  }

  handleChange() {
    const value = this.editor.getValue();
    this.props.onChange({ value, filename: this.filename })
  }

  render() {
    var editor = React.createElement('textarea', {
      ref: 'editor',
      value: this.props.value,
      onChange: () => {},
      className: this.props.textAreaClassName || 'markdown-textarea'
    });
    return (
      <div className="editor">
        {editor}
      </div>
    )
  }
}

export default Editor;