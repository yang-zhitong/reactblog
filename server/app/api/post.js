const Router = require('koa-router');

const router = new Router();
const { post: allPost, content } = require('../upload/post.js');

/*
$.get('post?tag=1');
$.get('post?category=后端');
$.get('post/docker');
*/

router.prefix('/post');

router.get('/:filename?', async (ctx) => {
  const { tag, category } = ctx.query;
  const { filename } = ctx.params;

  let res = allPost;

  if (filename) {
    const [nowPost] = allPost.filter(one => one.filename === filename);

    if (nowPost.index === 0) {
      res = allPost.slice(0, 2);
    } else if (nowPost.index === allPost.length - 1) {
      res = allPost.slice(-2);
    } else {
      res = allPost.slice(nowPost.index - 1, nowPost.index + 2);
    }
    res = { menu: res, content: content[filename] };
  } else if (tag) {
    res = allPost.filter(one => one.tag.includes(tag));
  } else if (category) {
    res = allPost.filter(one => one.category === category);
  }

  ctx.body = res;
});

module.exports = router;
