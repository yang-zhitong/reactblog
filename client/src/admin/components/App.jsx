import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';

import PostList from '../containers/PostList.jsx';
import NowPost from '../containers/NowPost.jsx';
import Modal from '../containers/Modal.jsx';

import Aside from './Aside';
import EditPage from '../containers/EditPage.jsx';

const List = () => {
  return (
  <div className="columns column">
    <PostList />
    <NowPost />
  </div>
  )
}

const App = () => (
  <Router>
    <div className="columns">
      <Aside/>
        <Route exact path="/admin" component={List} />
        <Route path="/admin/edit/:id" component={EditPage} />
      <Modal />
    </div>
  </Router>
);

export default App;