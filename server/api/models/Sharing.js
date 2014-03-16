/**
 * Sharing
 */

var uuid   = require('node-uuid'),
    crypto = require('crypto');

module.exports = {
  tableName: 'sharings',

  attributes: {
    uuid: {
      type: 'uuidv4',
      unique: true,
      index: true,
      defaultsTo: function(){return uuid.v4()}
    },

    permissionType: {
      type: 'string',
      defaultsTo: 'read',
      in: ['read', 'write'],
      columnName: 'permission_type'
    },

    // Add password authentication when trying to
    // share a content to non-registered people
    password: {
      type: 'string',
      defaultsTo: function() {crypto.randomBytes(4).toString('hex')}
    },

    // Associations
    // People to share with
    shareWith: {
      model: 'user',
      columnName: 'share_with'
    },

    // Post shared by who
    sharedBy: {
      model: 'user',
      columnName: 'shared_by'
    },

    // Content to be shared: such as a `Post`
    sharedPost: {
      model: 'post',
      columnName: 'shared_post'
    }
  }

};
