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

    content: {
      type: 'text',
      defaultsTo: ''
    },

    state: {
      type: 'string',
      defaultsTo: 'draft'
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

    postId: {
      type: 'string',
      columnName: 'post_id'
    },

    spam: {
      type: 'boolean',
      defaultsTo: false
    },

    depth: {
      type: 'integer',
      defaultsTo: 0
    }

  }

};
