/**
 * PostController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  // Fetch all published posts
  index: function(req, res) {
    Post.published(function(err, posts){
      if (err) return res.json({status: 404, errors: err});
      if (!_.isEmpty(posts)) {
        res.json({status: 200, posts: posts});
      } else {
        res.json({status: 404, errors: 'Record not found!'});
      }
    });
  },

  find: function(req, res) {
    Post.findOne({permanentLink: req.param('id')})
        .exec(function(err, post){
          if (err) return res.json({status: 404, errors: err});
          if (!_.isEmpty(post)) {
            res.json({status: 200, post: post});
          } else {
            res.json({status: 404, errors: 'Record not found!'});
          }
        });
  },

  create: function(req, res) {

  },

  update: function(req, res) {
    // Post.findOne({permanentLink: req.body.id})
    //     .exec(function(err, post){
    //       if (err) return res.json({status: 404, errors: err});
    //       if (!_.isEmpty(post)) {
    //         post.
    //       } else {

    //       }
    //     })
  },

  destroy: function(req, res) {

  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostController)
   */
  _config: {}


};
