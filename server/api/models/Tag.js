/**
 * Tag
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

    parent: {
      model: 'tag',
      columnName: 'parent_id'
    },

    children: {
      collection: 'tag',
      via: 'parent'
    }

  },

  idsFromToken: function(tokens, cb) {
    // TODO
  },

  tokens: function(q, cb) {
    var tags = [];
    var searchText = new RegExp(q);
    this.find({name: searchText})
        .sort("createdAt desc")
        .exec(function(err, results) {
          if (err) return cb(err);
          tags = _.map(results, function(tag) {
            return {name: tag.name, slug: tag.slug}
          });
          Tag.find({name: q}).done(function(err, tag) {
            if (err) return cb(err);
            if (_.isEmpty(tag)) {
              var name = "<<<" + q + ">>>";
              tags.push({id: name, name: q});
            }
            if (cb) {
              return cb(err, tags);
            } else {
              return tags;
            }
          });
        });
  }

};
