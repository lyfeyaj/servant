/**
 * Comment
 */
var uuid = require('node-uuid');

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

    // commentable is refer to something that is commemtable
    commentableState: {
      type: 'string',
      columnName: 'commentable_state'
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

    commentableId: {
      type: 'string',
      columnName: 'commentable_id'
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
  }

};
