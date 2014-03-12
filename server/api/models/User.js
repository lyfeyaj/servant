var _      = require('lodash'),
    bcrypt = require('bcrypt'),
    uuid   = require('node-uuid')
/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'users',

  attributes: {
    uuid: {
      type: 'uuidv4',
      unique: true,
      index: true,
      defaultsTo: uuid.v4()
    },

    username: {
      type: 'string',
      unique: true,
      index: true,
      required: true,
      maxLength: 50
    },

    email: {
      type: 'email',
      unique: true,
      index: true,
      required: true
    },

    name: {
      type: 'string',
      maxLength: 30,
      minLength: 4
    },

    status: {
      type: 'string',
      defaultsTo: 'active'
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'encrypted_password'
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

    lastLoginAt: {
      type: "datetime",
      columnName: 'last_login_at'
    },

    authorizationToken: {
      type: 'uuid',
      columnName: 'authorization_token'
    },

    authenticate: function(password, cb) {
      var self = this;
      bcrypt.compare(password, this.password, function(err, matched) {
        if (err) return cb(err, false);
        if (matched) {
          self.assignAuthorizationToken(cb);
        } else {
          cb(null, matched);
        }
      });
    },

    assignAuthorizationToken: function(cb) {
      this.authorizationToken = uuid.v1();
      this.lastLoginAt = new Date();
      this.save(function(err){
        if (err) return cb(err, false);
        cb(null, true);
      });
    }

  },

  beforeCreate: function(values, cb) {

    // Generate bcrypt password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });

  }

};
