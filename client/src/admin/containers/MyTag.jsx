import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTag, removeTag, tagging } from '../actions';

const MyTag = ({ all, now, allTags, tagging, removeTag, addTag }) => {
  const nowPost = all[now];
  const buttons = allTags.map((it, index) => {
    return (
      <p key={index} className="control" onClick={() => tagging(it, nowPost.id)}>
        <a className="button">{it.name}</a>
      </p>
    );
  });

  const myTags =
    nowPost.tags &&
    nowPost.tags.map((it, index) => {
      return (
        <div className="control" key={index}>
          <div className="tags has-addons">
            <a className="tag is-link">{it.name}</a>
            <a onClick={() => removeTag(it.id, nowPost.id)} className="tag is-delete">
              &nbsp;
            </a>
          </div>
        </div>
      );
    });

  return (
    <div style={{ marginBottom: '10px' }}>
      <div className="field">
        <label className="label">标签</label>
      </div>
      <div className="field is-grouped is-grouped-multiline">{myTags}</div>
      <div className="field">
        <label className="label">全部标签</label>
      </div>

      <div className="field is-grouped">
        {buttons}
        <div className="control">
          <input
            onKeyPress={addTag}
            className="input"
            type="text"
            placeholder="新增标签"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ all, now, tags }) => {
  return {
    all,
    now,
    allTags: tags,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeTag: bindActionCreators(removeTag, dispatch),
  tagging: bindActionCreators(tagging, dispatch),
  addTag: event => {
    if (event.which === 13) {
      const target = event.target;
      const value = target.value;
      dispatch(addTag(value));
      target.value = '';
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTag);
