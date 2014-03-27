/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  async.series([
    // createUsers(),
    // createTags()
    // createPosts()
  ], function(err, values){
    if (err) return sails.log.error(JSON.stringify(err));
  });
  cb();
};

function createUsers() {
  var users = [
    {
      username: 'lyfeyaj',
      password: 'lyfeyaj',
      email: 'lyfeyaj@gmail.com',
      name: 'Felix Liu'
    },
    {
      username: 'shmily',
      password: 'shmily',
      email: 'shmily@gmail.com',
      name: 'Shmily'
    },
    {
      username: 'davidleo',
      password: 'davidleo',
      email: 'david@gmail.com',
      name: 'David Leo'
    }
  ];
  createSample('User', 'username', users);
};

function createTags() {
  var tag_names = ['lyfeyaj', 'shmily', 'edgepeek', 'github', 'ruby', 'ticket', 'sails'];
  var tags = [];
  _.forEach(tag_names, function(el) {
    tags.push({name: el, slug: el});
  });
  createSample('Tag', 'slug', tags);
}

function createPosts() {
  User.find().exec(function(err, authors) {
    if (err) return sails.log.error(JSON.stringify(err));
    var posts = [
      {
        title: 'Ubuntu 上搭建 Ruby on Rails 生产环境',
        permanentLink: 'setup-ruby-on-rails-environment-on-ubuntu',
        markdown: '\
          ### 设置环境\
          \
          ```javascript\
            var environment = Setup.environment();\
          ```\
          \
          + First Step\
          + Second Step',
        author: _.sample(authors)["id"],
        status: 'public'
      },
      {
        title: 'Ubuntu 上搭建 Ruby',
        permanentLink: 'setup-ruby-on',
        markdown: '\
          ### 设置环境\
          \
          ```javascript\
            var environment = Setup.environment();\
          ```\
          \
          + First Step\
          + Second Step',
        author: _.sample(authors)["id"],
        status: 'public'
      },
      {
        title: 'Ubuntu 上搭建 Ruby on Rails',
        permanentLink: 'setup-ruby-on-rails-environment',
        markdown: '\
          ### 设置环境\
          \
          ```javascript\
            var environment = Setup.environment();\
          ```\
          \
          + First Step\
          + Second Step',
        author: _.sample(authors)["id"],
        status: 'public'
      },
      {
        title: 'Rails 生产环境',
        permanentLink: 'rails-environment-on-ubuntu',
        markdown: '\
          ### 设置环境\
          \
          ```javascript\
            var environment = Setup.environment();\
          ```\
          \
          + First Step\
          + Second Step',
        author: _.sample(authors)["id"],
        status: 'public'
      }
    ];
    createSample('Post', 'permanentLink', posts);
  });
}

function createSample(modelName, uniqueAttribute, collections) {
  var model = sails.models[modelName.toLowerCase()];
  collections.forEach(function(collection, index){
    var searchOpt = {};
    searchOpt[uniqueAttribute] = collection[uniqueAttribute];
    model.findOne(searchOpt).exec(function(err, existEntry){
      if(err) return sails.log.error(JSON.stringify(err));
      if (_.isEmpty(existEntry)){
        model.create(collection).exec(function(err, entry){
          if (err) return sails.log.error(JSON.stringify(err));
          sails.log.info(modelName + ' ' + entry[uniqueAttribute] + ' created!');
        });
      } else {
        sails.log.info(modelName + ' ' + existEntry[uniqueAttribute] + ' existed!');
      }
    })
  });
}