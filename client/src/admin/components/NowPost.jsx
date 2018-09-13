import React from 'react';
import { Link } from 'react-router-dom';
import MyTags from '../containers/MyTag';

const NowPost = (props) => {
  const { now, inputChange, saveInfo } = props;

  const categories = ['前端', '后端'].map((it, index) => {
    return (
      <a
        key={index}
        onClick={inputChange}
        className="dropdown-item"
      >
        {it}
      </a>
    );
  });

  return (
    <div className="info-form column is-7 is-fullheight">
    <div className="field">
      <label className="label">标题</label>
      <div className="control">
        <input 
          onChange={inputChange}
          className="input" type="text" 
          name="title"
          value={now.title || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">描述</label>
      <div className="control">
        <input 
          onChange={inputChange}
          className="input" type="text" 
          name="description"
          value={now.description || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">文件名</label>
      <div className="control">
        <input
          onChange={inputChange}
          name="filename"           
          className="input"
          type="text"
          value={now.filename || ""}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">分类</label>
    </div>
    <div className="field is-grouped">
      <div className="control">
        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button className="button">
              <span>{now.category}</span>
            </button>
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-content">{categories}</div>
          </div>
        </div>
      </div>
    </div>

    <div className="field is-grouped">
      <div className="control">
        <a onClick={saveInfo} className="button is-info">
          确认
        </a>
      </div>
      <div className="control"><Link to={`admin/edit/${now.id}`} className="button is-primary">编辑</Link></div>
    </div>
    <MyTags />
    <div className="field">
      <label className="label">当前评论</label>
    </div>
    {/* {comments} */}
  </div>
  )
}

export default NowPost;