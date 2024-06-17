import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
   try {
      const isFavorite = await favoriteModel.findOne({
         account: req.account.id,
         photo: req.body.photoId
      });

      if (isFavorite) return responseHandler.ok(res, isFavorite);

      const favorite = new favoriteModel({
         photo: req.body.photoId,
         account: req.account.id,
      });

      await favorite.save();

      responseHandler.created(res, favorite);

   } catch {
      responseHandler.error(res);
   }
};

const removeFavorite = async (req, res) => {
   try {
      const { favoriteId } = req.params;

      const favorite = await favoriteModel.findOneAndDelete({
         account: req.account.id,
         _id: favoriteId
      }).exec();

      if (!favorite) return responseHandler.notfound(res);

      responseHandler.ok(res);
   } catch {
      responseHandler.error(res);
   }
};



const getFavoritesOfUser = async (req, res) => {
   try {
      const favorite = await favoriteModel.find({ account: req.account.id }).populate("photo").exec();

      responseHandler.ok(res, favorite);
   } catch {
      responseHandler.error(res);
   }
};


export default { addFavorite, removeFavorite, getFavoritesOfUser };