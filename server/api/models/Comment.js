/**
 * Comment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var uuid = require('node-uuid');

module.exports = {

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

    userId: {
      type: 'string',
      columnName: 'user_id'
    },

    spam: {
      type: 'boolean',
      defaultsTo: false
    },

    depth: {
      type: 'integer',
      defaultsTo: 0
    },

    state: {
      type: 'string',
      defaultsTo: 'draft'
    },

    parentId: {
      type: 'string',
      columnName: 'parant_id'
    }
  }

};
