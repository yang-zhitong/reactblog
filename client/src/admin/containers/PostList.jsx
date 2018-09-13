import React from 'react';
import { connect } from 'react-redux';
import { choosePost, newPost } from '../actions';
import PostList from '../components/PostList.jsx';
import PostItem from '../components/PostItem.jsx';

const ListContainer = ({
  post,
  choosePost,
  newPost,
}) => {
  return (
    <PostList addNew={newPost}>
      {post.map((postItem, index) => (
        <PostItem
          key={index}
          item={postItem}
          onChoosePostClick={() => choosePost(index)}
        />
      ))}
    </PostList>
  );
};

const mapStateToProps = state => {
  return {
    post: state.all,
  };
};

export default connect(
  mapStateToProps,
  { newPost, choosePost },
)(ListContainer);
