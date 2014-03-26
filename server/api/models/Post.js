/**
 * Post
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

    author: {
      model: 'user',
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

    // `public` or `private`
    status: {
      type: 'string',
      defaultsTo: 'private'
    },

    // Associations
    comments: {
      collection: 'comment',
      via: 'post'
    },

    sharings: {
      collection: 'sharing',
      via: 'sharedPost'
    }

  },

  beforeCreate: function(values, next) {
    // Convert markdown to html
    marked(values.markdown, function(err, content){
      if (err) return next(err);
      values.html = content;
      next();
    });
  },

  beforeUpdate: function(values, next) {
    // Convert markdown to html
    marked(values.markdown, function(err, content){
      if (err) return next(err);
      values.html = content;
      next();
    });
  },

  // Scope search
  search: function(params, cb) {
//     order: `:attribute-:asc`, example: ?order=createdAt-desc;
//     per_page: 10;
//     page: 1;
//     search: text;
//     author: lyfeyaj;
    sails.log.info("Searching Post by: " + JSON.stringify(params));
    var limit = 10,
        page  = 1,
        userId = '',
        searchText = '',
        order = 'createdAt desc';
    if (params.per_page) limit = params.per_page;
    if (params.page) page = params.page;
    if (params.userId) userId = params.userId;
    if (params.search) searchText = params.search;
    if (params.order) order = params.order.replace('-', ' ');
    var searchQuery = this.find();
    searchQuery.where({or: [{ status: 'public' }, { author: userId }]});
    searchQuery.where({or: [{ title: { contains: searchText }}, { html: { contans: searchText }}]});
    searchQuery.sort(order).paginate({page: page, limit: limit});
    if (params.author) {
      User.findOne({ username: params.author })
          .then(function(user){
            if (user) return searchQuery.where({author: user.id}).exec(cb);
            cb();
          })
          .fail(cb);
    } else {
      searchQuery.exec(cb);
    }
  },

};