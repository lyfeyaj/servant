/**
 * Comment
 */
var marked = require("marked"),
    uuid   = require('node-uuid');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = {
  tableName: 'comments',

  attributes: {
    uuid: {
      type: 'uuidv4',
      unique: true,
      index: true,
      defaultsTo: function(){return uuid.v4()}
    },

    title: {
      type: 'string',
      required: true,
      maxLength: 150
    },

    rawContent: {
      type: 'text',
      defaultsTo: '',
      columnName: 'raw_content'
    },

    content: {
      type: 'text',
      defaultsTo: ''
    },

    commentableType: {
      type: 'string',
      columnName: 'commentable_type'
    },

    commentableUrl: {
      type: 'string',
      columnName: 'commentable_url'
    },

    commentableTitle: {
      type: 'string',
      columnName: 'commentable_title'
    },

    ip: 'ip',

    email: {
      type: 'email',
      required: true,
      maxLength: 150
    },

    depth: {
      type: 'integer',
      defaultsTo: 0
    },

    // `confirmed` or `spam` or `draft`
    state: {
      type: 'string',
      defaultsTo: 'draft'
    },

    // Associations
    user: {
      model: 'user',
      columnName: 'user_id'
    },

    post: {
      model: 'post',
      columnName: 'post_id'
    },

    parent: {
      model: 'comment',
      columnName: 'parant_id'
    },

    child: {
      model: 'comment'
    }
  },

  beforeCreate: function(values, next) {
    // Convert markdown to html
    marked(values.rawContent, function(err, content){
      if (err) return next(err);
      values.content = content;
      next();
    });
  },

  beforeUpdate: function(values, next) {
    // Convert markdown to html
    marked(values.rawContent, function(err, content){
      if (err) return next(err);
      values.content = content;
      next();
    });
  }

};
