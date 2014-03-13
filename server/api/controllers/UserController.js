/**
 * UserController
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

  index: function(req, res) {
    User.active(function(err, users){
      if (err) return res.json({status: 500, message: err});
      if (!_.isEmpty(users)) {
        res.json({status: 200, users: users});
      } else {
        res.json({status: 404, message: res.i18n('noRecords')});
      }
    });
  },

  find: function(req, res) {
    User.findOne({username: req.param('id')})
        .exec(function(err, user){
          if (err) return res.json({status: 500, message: err});
          if (!_.isEmpty(user)) {
            res.json({status: 200, user: user});
          } else {
            res.json({status: 404, message: res.i18n('noRecords')});
          }
        });
  },

  create: function(req, res) {

  },

  update: function(req, res) {

  },

  // Inactive a user
  destroy: function(req, res) {

  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {

  }


};
