import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

import './home.css';

import Home from "./Home";
import Archives from "./Archives";
import Detail from "./Detail";

let requireAll = requireContext => requireContext.keys().map(requireContext)
const avatarCtx = require.context('./avatar', false, /\.(png|jpg)$/)
const avatars = requireAll(avatarCtx);

class ChangeAvatar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const ran = (Math.random() * avatars.length | 0);
    const avatar = avatars[ran];
    return (
      <div className="left-hd">
        <img className="avatar" src={avatar} onClick={() => this.setState({})} alt="点我试试"/>
        <Link to="/" className="link">是小小小白菜呀</Link>
      </div>
    )
  }
}
const ChangeAvatarWithRouter = withRouter(ChangeAvatar)

const Header = () => {
  return (
    <header id="header">
      <div className="header">
        <ChangeAvatarWithRouter />
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/archives">Archives</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer id="footer">
      <p className="footer">
        <span className="copyright-year">
          © 2018  
          {/* - 2018 */}
          <span className="footer-author" style={{margin: '0 10px'}}>@zhitong</span>
          <span className="power-by">
            Powered by React/Koa and Theme copy from
            <a
              className="theme-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/frostfan/hexo-theme-polarbear"
            >
              &nbsp; Polar Bear
            </a>
          </span>
        </span>
      </p>
    </footer>
  );
};

const About = () => {
  return (
    <div className="content markdown-body">
      <article className="post">
        <header className="post-header">
          <h1 className="post-title">欢迎来到小白菜的博客</h1>
        </header>
        <div className="post-content">
          <p>目前文章还比较少, 不过点点上面的头像是不是可以玩一年</p>
          <p>博客用react, nodejs搭的, 仿照下面提到的hexo主题</p>
          <p>下一步为seo上ssr</p>
          <p>爱生活, 爱二狗</p>
          <p>And Bboy in life</p>
          <p>以上</p>
          {/* <p>QQ: 747327204</p> */}
        </div>
      </article>
    </div>
  );
};

const Index = () => {
  return (
    <Router>
      <div className="real-body">
        <Header />
        <main>
          <Switch>
            <Route path="/post/:name" component={Detail} />
            <Route exact path="/archives" component={Archives} />
            <Route exact path="/about" component={About} />
            <Route path="/:condition(tag|category)?/:name?" component={Home} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// registerServiceWorker();
