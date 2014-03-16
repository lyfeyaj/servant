/**
 * User
 */

var bcrypt = require('bcrypt'),
    uuid   = require('node-uuid'),
    http   = require('http'),
    crypto = require('crypto');

module.exports = {

  tableName: 'users',

  attributes: {
    uuid: {
      type: 'uuidv4',
      unique: true,
      index: true,
      defaultsTo: function(){return uuid.v4()}
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

    // Indicate that a user is active or not
    status: {
      type: 'string',
      defaultsTo: 'active'
    },

    // Password that encrypted by Bcrypt
    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: 'encrypted_password'
    },

    avatar: 'string',

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

    // Associations
    // +Comments+: comments made by a user
    comments: {
      collection: 'comment',
      via: 'user'
    },

    // +Posts+: posts created by a user
    posts: {
      collection: 'post',
      via: 'author'
    },

    // User's sharings to other users
    sharings: {
      collection: 'sharing',
      via: 'sharedBy'
    },

    // Shared posts by other users to me
    shareds: {
      collection: 'sharing',
      via: 'shareWith'
    },

    // Instance methods
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.authorizationToken;
      delete obj.email;
      delete obj.name;
      obj.avatar = _.isEmpty(obj.avatar)
                  ? obj.avatar
                  : this.gravatar();
      return obj;
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
    },

    gravatar: function(cb) {
      var md5 = crypto.createHash('md5');
      var gravatarUrl = '//www.gravatar.com/avatar/' +
                        md5.update(this.email.toLowerCase().trim()).digest('hex');
                        // "?d=404";
      // http.get('http:' + gravatarUrl, function (res) {
      //     if (res.statusCode !== 404) {
      //         userData.image = gravatarUrl;
      //     }
      //     checkPromise.resolve(userData);
      // }).on('error', function () {
      //     //Error making request just continue.
      //     checkPromise.resolve(userData);
      // });
      return 'http:' + gravatarUrl;
    }

  },

  beforeCreate: function(values, cb) {

    // Generate bcrypt password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });

  },

  active: function(cb) {
    this.find({status: 'active'})
        .sort("createdAt desc")
        .exec(cb);
  }

};
