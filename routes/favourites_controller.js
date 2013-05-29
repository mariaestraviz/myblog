
var models=require('../models/models.js');

//GET /users/:userid/favourites
exports.index = function(req, res, next) {

  //Búsqueda del array de posts favoritos de un usuario
   models.Favourite

      .findAll({where: {userId:req.user.id}})

      // generar array con postIds de los post favoritos

      .success(function(favourites) {

      	var postIds = favourites.map(function(favourite) {
      	 return favourite.postId;
      	});

      // busca los posts identificados por array postIds

      var where_value_patch;
         if (postIds.length == 0) {
            where_value_patch = '"Posts"."id" in (NULL)';
            } else {
            where_value_patch = '"Posts"."id" in (' + postIds.join(',') + ')';
            }

        // busca los posts identificados por array postIds
        // pasamos a la vista: autor, num comentarios y favoritos
      	models.Post 
      	   .findAll({order: 'updatedAt DESC',
      	             where: {id: postIds},
      	             include: [ { model: models.User, as: 'Author' },
                      {model: models.Comment, as: 'Comments' },
                         models.Favourite]
                   })

            .success(function(posts) {

                  res.render('favourites/index', {
                        posts: posts
                  });
              })
            .error(function(error) {
                  next(error);
            });
      })
      .error(function(error) {
            next(error);
      });
   };

// PUT /users/:userid/favourites/:postid
exports.add = function(req, res, next) {

   //var newbest = req.body.best || 0;

   //console.log("BEST = " + newbest);
   
   var redir = req.query.redir || '/users/' + req.user.id + '/favourites/';
   
   models.Favourite.findOrCreate({userId: req.user.id,
                                 postId: req.post.id })

            .success(function(favourite) {
               favourite.save()

            .success(function() {
              req.flash('success', 'Marcado el favorito con éxito.');
              //redireccionamos a la lista de post favoritos
              res.redirect(redir);
            })

            .error(function(error) {
                next(error);
            });
          })
          .error(function(error) {
            next(error);
          });    
};

//DELETE /users/:userid/favourites/:postid

exports.del = function(req, res, next) {

   var redir = req.query.redir || '/users/' + req.user.id + '/favourites/';

   models.Favourite.
        find({userId: req.user.id,
            postId: req.post.id})
        .success(function(favourite) {

         if(favourite) {

            favourite.destroy()

            .success(function() {
              req.flash('success', 'Eliminado favorito con éxito');
              res.redirect(redir);
            })
            .error(function(error) {
              next(error);
            });
          }
        })
        .error(function(error) {
          next(error);
        });
};

