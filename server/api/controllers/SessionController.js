/**
 * SessionController
 */

module.exports = {

  signin: function(req, res) {
    if (req.session.currentUser) {
      return res.json({status: 501, message: res.i18n('alreadySignin')});
    }
    if (_.isEmpty(req.body.usernameOrEmail) || _.isEmpty(req.body.password)) {
      return res.json({status: 401, message: res.i18n('usernameEmailOrPasswordEmpty')});
    }
    User.findOne({
      or: [
        { username: req.body.usernameOrEmail },
        { email: req.body.usernameOrEmail }
      ]
    }).exec(function(err, user){
      if (err) return res.json({status: 500, message: err});
      if (!_.isEmpty(user)) {
        user.authenticate(req.body.password, function(err, matched){
          if (err) return res.json({status: 500, message: err});
          if (matched) {
            req.session.currentUser = user;
            res.json({status: 200, authorizationToken: user.authorizationToken});
          } else {
            res.json({status: 401, message: res.i18n('unmatchedPassword')});
          }
        });
      } else {
        res.json({status: 404, message: res.i18n('userNotExisted')});
      }
    });
  },

  signout: function(req, res) {
    req.session.currentUser = null;
    res.json({status: 200, message: res.i18n('userSignoutSuccess')});
  },

  _config: {
    blueprints: {
      rest: false
    }
  }

};
