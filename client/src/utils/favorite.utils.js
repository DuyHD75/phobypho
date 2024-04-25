const favoriteUtils = {
   check: ({ listFavorites, photoId }) => listFavorites && listFavorites.find(e => e.photo.id.toString() === photoId.toString()) !== undefined
};

export default favoriteUtils;