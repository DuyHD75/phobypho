import HomePage from '../pages/HomePage';
import PhotoListPage from '../pages/PhotoList';
import PhotoDetailPage from '../pages/PhotoDetail'
import FavoriteList from '../pages/FavoriteList';
import ProtectedPage from '../components/common/ProtectedPage';
import Checkout from '../pages/Checkout';
import PostPhoto from '../pages/PostPhoto';
import Voucher from '../pages/Voucher';
import AboutUs from './../pages/AboutUs';
import Profile from '../pages/Profile';
import ChangePassword from '../components/common/ChangePassword';
import BookingHistory from '../pages/BookingHistory';
import UpgradeAccount from '../components/common/UpgradeAccount';


export const routesGen = {
     home: "/",
     photoList: "/photos",
     photoDetail: (photoId) => `/photos/${photoId}`,
     favoriteList: "/favorites",
     bookingHistory: "/booking_history",
     passwordUpdate: "/password_update",
     checkOut: "/checkout",
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
          path: "/password-update",
          element: (
               <ProtectedPage>
                    <ChangePassword />
               </ProtectedPage>
          ),
          state: "password.update"
     },
     {
          path: "/favorites",
          element: (
               <ProtectedPage>
                    <FavoriteList />
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
          path: "/checkout",
          element: <ProtectedPage>
               <Checkout />
          </ProtectedPage>,
          state: "checkout"
     },
     {
          path: "/booking_history",
          element: (
               <ProtectedPage>
                    <BookingHistory />
               </ProtectedPage>
          ),
          state: "booking.history"
     },
     {
          path: "/photos/history_post",
          element: (
               <ProtectedPage>
                    <PostPhoto />
               </ProtectedPage>
          ),
          state: "post.history"
     },
     {
          path: "/vouchers",
          element: <Voucher />,
          state: "vouchers"
     },
     {
          path: "/aboutus",
          element: <AboutUs />,
          state: "aboutus"
     },
     {
          path: "/profile",
          element: (
               <ProtectedPage>
                    <Profile />
               </ProtectedPage>
          ),
          state: "profile"
     },
     {
          path: "/upgrade-account",
          element: (
               <ProtectedPage>
                    <UpgradeAccount />
               </ProtectedPage>
          ),
          state: "upgrade-account"
     },

];

export default routes;