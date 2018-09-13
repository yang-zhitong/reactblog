import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveInfo, updateField } from '../actions';

import NowPost from '../components/NowPost.jsx';

const NowPostContainer = ({
  post,
  now,
  saveInfo,
  handleFieldChange,
}) => {
  return (
    <div className="info-form column is-7 is-fullheight">
      <NowPost
        inputChange={handleFieldChange}
        now={post[now]}
        saveInfo={() => saveInfo(post[now])}
      />
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    post: state.all,
    allTags: state.tags,
    now: state.now,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveInfo: bindActionCreators(saveInfo, dispatch),
  handleFieldChange: event => {
    let key, value;
    const target = event.target;
    if (event.type === 'click') {
      value = target.innerText;
      key = 'category';
    }
    if (target.type === 'text') {
      value = target.value;
      key = target.name;
    }

    dispatch(
      updateField({
        key,
        value,
      }),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NowPostContainer);
