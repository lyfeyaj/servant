/**
 * CommentController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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

  // Fetch all comments
  index: function(req, res) {
    Comment.find().exec(function(err, comments){
      if (err) return res.serverError(err);
      if (!_.isEmpty(comments)) {
        res.json({status: 200, comments: comments});
      } else {
        res.notFound();
      }
    });
  },

  find: function(req, res) {
    Comment.findOne({permanentLink: req.param('id')})
        .exec(function(err, comment){
          if (err) return res.serverError(err);
          if (!_.isEmpty(comment)) {
            res.json({status: 200, comment: comment});
          } else {
            res.notFound();
          }
        });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CommentController)
   */
  _config: {}


};
