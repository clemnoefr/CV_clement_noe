const Comment = require('../model/comment');

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    _id: req.params.id,
    nom: req.body.nom,
    prenom: req.body.prenom,
    comment: req.body.comment,
    
  });

  // sauvegarde dans la BDD
  comment.save().then(
    () => {
      res.status(201).sendFile(process.cwd() + "/contact.html");
      
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


// affichage de tous les commentaires
exports.getAllComment = (req, res, next) => {
  var page = req.url.substring(11);
  var offset = (page-1)*4;
  
  Comment.find().skip(offset).limit(4).then(
    (comments) => {
      
      
      res.status(200).json(comments);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};