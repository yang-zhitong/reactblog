import { Link } from 'react-router-dom';
import React from 'react';

export default () => {
  return (
    <aside className="aside column is-2 menu">
      <p className="menu-label">文  章</p>
      <ul className="menu-list">
        <li>
          <Link to="/admin">列表</Link>
        </li>
        <li>
          <a>片段</a>
        </li>
      </ul>
      <p className="menu-label">todo</p>
      <ul className="menu-list">
        <li>
          <a>数据</a>
        </li>
      </ul>
    </aside>
  );
};