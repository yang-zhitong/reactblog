import { axios } from '../../api.js';

const receiveData = (payload) => ({
  type: 'RECEIVE_ALL',
  payload,
  // payload: {
  //   all: [
  //     {
  //       title: '1',
  //       filename: '1',
  //       category: '后端',
  //       tags: [{ name: 'a', id: 1 }, { name: 'b', id: 2 }],
  //     },
  //     {
  //       title: '2',
  //       filename: '2',
  //       category: '前端',
  //       tags: [{ name: 'a', id: 1 }],      
  //     },
  //   ],
  //   tags: [{ name: 'a', id: 1 }, { name: 'b', id: 2 }],
  // }
});

export const getAllData = () => dispatch => {
  Promise.all([
    axios({
      url: "/articles?unlimited=true",
      method: "get",
    }),
    axios({
      url: "/tags",
      method: "get"
    })
  ]).then(res => {
    const [ { res: all } = {} , tags = []] = res;
    if (!all[0]) all[0] = {};
    dispatch(receiveData({all, tags}));
  });
};

export const updateField = ({ key, value }) => ({
  type: 'UPDATE_FIELD',
  value,
  key,
});

 const saveNewPost = (raw) => ({
   type: 'SAVE_NEW_POST',
   payload: raw,
   modal: '新建好了'
 });

export const saveInfo = post => dispatch => {
  if (!post.filename) {
    dispatch({
      type: 'SAVE_INFO',
      modal: '输入文件名啊',
    });
    return false;
  }
  if (!post.id) {
    return axios.post('/articles', post).then(raw =>dispatch(saveNewPost(raw)));
  }
  axios({
    url: `/articles/${post.id}`,
    method: "put",
    data: post,
  }).then(res => {
    dispatch({
      type: 'SAVE_INFO',
      modal: '成功了',
    });
  });

};

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
  modal: false,
})

export const choosePost = index => ({
  type: 'CHOOSE_POST',
  index,
});

export const addTag = name => dispatch => {
  axios.post('/tags', { tag: name })
    .then(( [{id , name}] ) => dispatch({ 
      type: 'ADD_TAG',
      id,
      name,
    }));
};

/* 文章和tag的关系
$.post('/articles/1/tag', {
  tag: 'a',
});
$.ajax({
  url: '/articles/1/tag/1',
  type: 'DELETE',
});
*/

export const tagging = ({ id, name }, postid) => dispatch => {
  axios.post(`/articles/${postid}/tag`, { tag: name })
    .then(({ mRes }) => { 
      if (mRes !== 0) {
        dispatch({ 
          type: 'TAGGING',
          id,
          name, 
        });
      }
    });
};

export const removeTag = (id, postid) => dispatch => {
  axios.delete(`/articles/${postid}/tag/${id}`)
    .then((res) => dispatch({ 
      type: 'REMOVE_TAG',
      id,
    }));
};

export const newPost = () => ({
  type: 'ADD_NEW_POST',
});
