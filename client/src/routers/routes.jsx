import HomePage from '../pages/HomePage';
import PhotoListPage from '../pages/PhotoList';
import PhotoDetailPage from '../pages/PhotoDetail'
import BookingHistoryPage from '../pages/BookingHistory';
import FavoriteListPage from '../pages/FavoriteList';
import PasswordUpdatePage from '../pages/PasswordUpdate';
import ProtectedPage from '../components/common/ProtectedPage';

export const routesGen = {
     home: "/",
     photoList: "/photos",
     photoDetail: (id) => `/photos/${id}`,
     favoriteList: '/favorites',
     bookingHistory: '/booking_history',
     passwordUpdate: '/password_update'
};

const routes = [
     {
          index: true,
          element: <HomePage />,
          state: "home"
     },
     {
          path: "/photos/:photo_id",
          element: <PhotoDetailPage />,
          state: "photos.detail"
     },
     {
          path: "/password_update",
          element: (
               <ProtectedPage>
                    <PasswordUpdatePage />
               </ProtectedPage>
          ),
          state: "password.update"
     },
     {
          path: "/favorites",
          element: (
               <ProtectedPage>
                    <FavoriteListPage />
               </ProtectedPage>
          ),
          state: "favorites"
     },
     {
          path: "/photos",
          element: <PhotoListPage />,
          state: "photos"
     },
     {
          path: "/booking_history",
          element: (
               <ProtectedPage>
                    <BookingHistoryPage />
               </ProtectedPage>
          ),
          state: "booking.history"
     }
];

export default routes;



