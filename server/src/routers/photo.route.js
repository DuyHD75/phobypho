import express from 'express';
import {
     getAllPhotoInfo, getPhotoDetail, searchPhotoByMultiFactor, createNewPost, updatePost, deletePost,
     getPhotosByAuthor,
     updatePostByAuth
} from '../controllers/photo.controller.js';
import tokenMiddleware from '../middlewares/token.middleware.js';


const router = express.Router({ mergeParams: true });

router.get("/", getAllPhotoInfo);

router.post("/", tokenMiddleware.authenticate, tokenMiddleware.authorize, createNewPost);

router.put("/post", tokenMiddleware.authenticate, tokenMiddleware.authorize, updatePostByAuth);

router.get("/post/:authorId", getPhotosByAuthor);

router.get("/:photo_id", getPhotoDetail);

router.get("/search", searchPhotoByMultiFactor);

router.put("/:photo_id", tokenMiddleware.authenticate, updatePost);

router.delete("/:photo_id", tokenMiddleware.authenticate, tokenMiddleware.authorize, deletePost);


// router.route("/:photo_id/services/:package_id")
//      .get((req, res, next) => {
//           dishesModel.findById(req.params.dishId)
//                .then((dish) => {
//                     if (dish != null && dish.comments.id(req.params.commentId) != null) {
//                          res.statusCode = 200;
//                          res.setHeader("Content-Type", "application/json");
//                          res.json(dish.comments.id(req.params.commentId));
//                     } else {
//                          err = new Error('Comment ' + req.params.dishId + ' not found !');
//                          err.statusCode = 404;
//                          return next(err);
//                     }
//                }, (err) => next(err))
//                .catch((err) => next(err));
//      })
//      .post((req, res, next) => {
//           res.statusCode = 403;
//           res.end("PUT not supported for the comments id path !")
//      })
//      .put(tokenMiddleware.authenticate, phot.updateCommentById)
//      .delete(tokenMiddleware.authenticate, dishesController.deleteCommentById);

export default router;