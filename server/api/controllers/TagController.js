/**
 * TagController
 */

module.exports = {

  index: function(req, res) {
    Tag.find().exec(function(err, tags){
      if (err) return res.serverError(err);
      if (!_.isEmpty(tags)) {
        res.json({status: 200, tags: tags});
      } else {
        res.notFound();
      }
    });
  },

  find: function(req, res) {
    Tag.findOne({slug: req.param('id')})
        .exec(function(err, tag){
          if (err) return res.serverError(err);
          if (!_.isEmpty(tag)) {
            res.json({status: 200, tag: tag});
          } else {
            res.notFound();
          }
        });
  },

  _config: {}


};
