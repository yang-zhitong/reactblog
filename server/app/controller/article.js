
const fs = require('fs');
const { join } = require('path');

const { path: { app: appPath } } = require('../config.js');

const postPath = filename => join(appPath, '/upload/post/', `${filename}.md`);


module.exports = class {
  static writeFile(filename, oldname) {
    if (filename) {
      const newPath = postPath(filename);
      if (oldname) {
        const oldPath = postPath(oldname);
        fs.renameSync(oldPath, newPath);
      } else {
        fs.writeFileSync(newPath, '');
      }
    }
  }

  static async all(ctx, {
    page, unlimited, ids, category, pageSize,
  }) {
    // const currentPage = (+page && page > 0) ? page - 1 : 0;
    // const paging = unlimited ? '' : `LIMIT 5 OFFSET ${currentPage * 5}`;
    let whereCondition;
    if (ids) {
      whereCondition = `WHERE FIND_IN_SET(post.id, '${ids}')`;
    } else if (category) {
      whereCondition = `WHERE category = '${category}'`;
    }
    let [res] = await ctx.sequelize.query(`
    SELECT post.filename as oldname ,post.*, GROUP_CONCAT(tag.name) as tag_name, GROUP_CONCAT(tag.id) as tag_id
    FROM post
    LEFT JOIN tagging as map on map.p_id = post.id
    LEFT JOIN tag on map.t_id = tag.id
    ${whereCondition || ''}
    GROUP BY post.id 
    `);

    let pageCount = 1;
    // 如果没有限制为false, 说明有限制
    if (!unlimited) {
      pageCount = Math.ceil(res.length / pageSize);
      res = res.slice((page - 1) * pageSize, page * pageSize);
    }

    res.forEach((it) => {
      if (!it.tag_name || !it.tag_id) {
        it.tags = [];
        return;
      }
      const tagName = it.tag_name.split(',');
      const tagId = it.tag_id.split(',');
      it.tags = tagName.map((name, index) => ({ name, id: tagId[index] }));
    });
    return { res, pageCount, page };
  }

  static async find(ctx) {
    let {
      page, unlimited, tag, pageSize, name, category,
    } = ctx.query;
    const { id } = ctx.params;
    let pids;

    name = name ? decodeURI(name) : '';
    category = category ? decodeURI(category) : '';
    page = +page || 1;
    unlimited = unlimited || false;
    tag = +tag; // tag id,传入字符串无效
    pageSize = +pageSize || 5;
    // 好像没用
    if (/\D+/.test(page) || page < 1) ctx.fail();
    if (/\D+/.test(pageSize) || pageSize < 5) ctx.fail();

    if (tag) {
      pids = await ctx.mysql('tagging').findAll({
        attributes: [
          ['p_id', 'id'],
        ],
        where: { t_id: tag },
      });
      pids = pids.map(it => it.id).join(',');
    }

    if (!id && !name) {
      ctx.body = await this.all(ctx, {
        page, unlimited, ids: pids, category, pageSize,
      });
    } else {
      ctx.body = await this.findOne(ctx, { id, name });
    }
  }

  static async addOne(ctx) {
    const { body } = ctx.request;
    const res = await ctx.mysql('post').add(body);
    this.writeFile(res.filename);
    ctx.body = res;
  }

  static async findOne(ctx, { id, name }) {
    let postRes;
    let queryID = +id;
    if (!id) {
      // 没有id, 用finename查到id
      postRes = await ctx.mysql('post').findOne({ where: { filename: name } });
      queryID = postRes.id;
    }
    const allRes = await ctx.mysql('post').findAll({
      where: {
        id: { [ctx.op.gte]: queryID < 1 ? 1 : queryID - 1 },
      },
      limit: 3,
    });
    if (id) {
      [postRes] = allRes.filter(it => +it.id === queryID);
    }
    if (!postRes || !postRes.filename) ctx.fail();
    const [tagsRes] = await ctx.sequelize.query(`SELECT tag.name,tag.id FROM tagging as map JOIN tag on tag.id = map.t_id and map.p_id = ${queryID}`);
    const filePath = postPath(postRes.filename);
    let content = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
    }).catch(e => e);
    if (content.code === 'ENOENT') {
      fs.writeFileSync(filePath, '', 'utf-8');
      content = '';
    }
    return {
      postRes, allRes, tagsRes, content,
    };
  }

  static async editOne(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    console.log('body', body);
    const res = await ctx.mysql('post').update(body, { where: { id } });
    console.log('body', res);
    if (body.filename !== body.oldname) {
      this.writeFile(body.filename, body.oldname);
    }
    ctx.body = res;
  }

  static async deleteOne(ctx) {
    const { id } = ctx.params;
    const res = await ctx.mysql('post').destroy({ where: { id } });
    ctx.body = res;
  }

  static async category(ctx) {
    const res = await ctx.mysql('post').findAll({
      attributes: [
        ['category', 'name'],
      ],
      group: ['category'],
    });
    ctx.body = res;
  }

  static async addTag(ctx) {
    const { tag } = ctx.request.body;
    const { id: p_id } = ctx.params;
    const res = await ctx.mysql('tag').add(tag);
    const mRes = await ctx.mysql('tagging').add([{ p_id, t_id: res[0].id }]);
    ctx.body = { res, mRes };
  }

  static async removeTag(ctx) {
    const { id: pId, tag_id: tagId } = ctx.params;
    const res = await ctx.mysql('tagging').destroy({ where: { p_id: pId, t_id: tagId } });
    ctx.body = res;
  }
};

