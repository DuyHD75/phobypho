import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
     name: "User",
     initialState: {
          user: null,
          listFavorite: []
     },
     reducers: {
          setUser: (state, action) => {
               if (action.payload === null) {
                    localStorage.removeItem('actkn');
               } else {
                    if (action.payload && action.payload.token)
                         localStorage.setItem("actkn", action.payload.token);
               }
               state.user = action.payload;
          },
          setListFavorite: (state, action) => {
               state.listFavorite = action.payload
          },
          removeItemInFavorites: (state, action) => {
               const { photo_id } = action.payload;
               state.listFavorite = [...state.listFavorite].filter(e => e.id.toString() !== photo_id.toString());
          },
          addItemInFavorites: (state, action) => {
               state.listFavorite = [action.payload, ...state.listFavorite];
          }
     }
});


export const {
     setUser, setListFavorite, removeItemInFavorites, addItemInFavorites
} = userSlice.actions;


export default userSlice.reducer;