/**
 * Setting
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

    key: {
      type: 'string',
      maxLength: 150,
      unique: true,
      required: true
    },

    value: 'text',

    type: {
      type: 'string',
      maxLength: 150
    },

    userId: {
      type: 'string',
      columnName: 'user_id'
    }
  }

};
