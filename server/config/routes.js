module.exports.routes = {

  // 'get /': 'PostsController.index',

  // UserController
  // User authentication actions
  'post /signin': 'SessionController.signin',
  'delete /signout': 'SessionController.signout'
};
