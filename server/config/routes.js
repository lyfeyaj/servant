module.exports.routes = {

  // 'get /': 'PostsController.index',

  // UserController
  // User authentication actions
  'post /signup': 'UsersController.signup',
  'post /signin': 'UsersController.signin',
  'post /signout': 'UsersController.signout'
};
