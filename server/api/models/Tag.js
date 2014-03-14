/**
 * Tag
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var uuid = require('node-uuid');

module.exports = {
  tableName: 'tags',

  attributes: {
    uuid: {
      type: 'uuidv4',
      unique: true,
      index: true,
      defaultsTo: function(){return uuid.v4()}
    },

    name: {
      type: 'string',
      required: true,
      maxLength: 150
    },

    slug: {
      type: 'string',
      required: true,
      maxLength: 150,
      unique: true
    },

    description: {
      type: 'text',
      defaultsTo: ''
    },

    parentId: {
      type: 'string',
      columnName: 'parent_id'
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
    }

  }

};
