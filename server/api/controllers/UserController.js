/**
 * UserController
 */

module.exports = {

  index: function(req, res) {
    User.active(function(err, users){
      if (err) return res.serverError(err);
      if (!_.isEmpty(users)) {
        res.json({status: 200, users: users});
      } else {
        res.notFound();
      }
    });
  },

  find: function(req, res) {
    User.findOne({username: req.param('id')})
        .exec(function(err, user){
          if (err) return res.serverError(err);
          if (!_.isEmpty(user)) {
            res.json({status: 200, user: user});
          } else {
            res.notFound();
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
