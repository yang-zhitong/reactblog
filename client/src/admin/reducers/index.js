const initState = {
  all: [{}],
  now: 0,
  key: '',
  tags: [],
  modal: false,
};

const post = (state = initState, action) => {
  const { now, all } = state;
  const { payload, key, value, id, name } = action;
  
  let newArr;
  switch (action.type) {
    case 'RECEIVE_ALL':
      payload.all.reverse();
      return Object.assign({}, state, payload);
    case 'ADD_NEW_POST':
      if (all[0].title === undefined) {
        return state;
      }
      newArr = [{ description: '' }, ...all];
      return Object.assign({}, state, { now: 0, all: newArr });
    case 'SAVE_NEW_POST':
      payload.oldname = payload.filename;
      all[0] = payload;
      newArr = [...all];
      return Object.assign({}, state, { all: newArr, modal: action.modal });
    case 'CHOOSE_POST':
      return Object.assign({}, state, { now: action.index });
    case 'UPDATE_FIELD':
      newArr = [...all];
      newArr[now][key] = value;
      return Object.assign({}, state, { all: newArr });
    case 'SAVE_INFO':
      // 更新完数据， 文件名 old 可能要改一下
      all[now].oldname = all[now].filename;
      return Object.assign({}, state, { all, modal: action.modal });
    case 'CLOSE_MODAL':
      return Object.assign({}, state, { modal: false });
    case 'ALL_TAGS':
      state.tags = [...action.payload];
      return Object.assign({}, state);
    case 'ADD_TAG':
      newArr = [...state.tags, { id, name }];
      return Object.assign({}, state, { tags: newArr });
    case 'TAGGING':
      if (!all[now].tags) all[now].tags = [];
      all[now].tags.push({ name, id });
      newArr = [...all];      
      return Object.assign({}, state, { all: newArr });
    case 'REMOVE_TAG':
      all[now].tags = all[now].tags.filter(it => +it.id !== +id)
      newArr = [...all];
      return Object.assign({}, state, { all: newArr });
    default:
      return state;
  }
};

export default post;
