/**
 * Post
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
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

  tableName: 'posts',

  attributes: {

    uuid: {
      type: 'uuidv4',
      index: true,
      unique: true,
      defaultsTo: function(){return uuid.v4()}
    },

    title: {
      type: 'string',
      maxLength: 150,
      required: true
    },

    permanentLink: {
      type: 'string',
      maxLength: 150,
      required: true,
      unique: true,
      columnName: 'permanent_link'
    },

    markdown: {
      type: 'text',
      defaultsTo: ''
    },

    html: {
      type: 'text',
      defaultsTo: ''
    },

    authorId: {
      type: 'string',
      columnName: 'author_id'
    },

    metaTitle: {
      type: "string",
      maxLength: 150,
      columnName: 'meta_title'
    },

    metaDescription: {
      type: "string",
      maxLength: 200,
      columnName: 'meta_description'
    },

    status: {
      type: 'string',
      defaultsTo: 'draft'
    }

  },

  afterValidation: function(values, next) {
    // Convert markdown to html
    marked(values.markdown, function(err, content){
      console.log(content);
      if (err) return next(err);
      values.html = content;
      next();
    });
  },

  // Scope search
  published: function(cb) {
    this.find({status: "published"})
        .sort("createdAt desc")
        .exec(cb)
  }

};
