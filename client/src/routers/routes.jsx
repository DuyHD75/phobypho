import HomePage from "../pages/HomePage";
import PhotoListPage from "../pages/PhotoList";
import PhotoDetailPage from "../pages/PhotoDetail";
import BookingHistoryPage from "../pages/BookingHistory";
import FavoriteListPage from "../pages/FavoriteList";
import PasswordUpdatePage from "../pages/PasswordUpdate";
import ProtectedPage from "../components/common/ProtectedPage";
import Checkout from "../pages/Checkout";
import PostPhoto from "../pages/PostPhoto";

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
    state: "home",
  },
  {
    path: "/photos/:photo_id",
    element: <PhotoDetailPage />,
    state: "photos.detail",
  },
  {
    path: "/password_update",
    element: (
      <ProtectedPage>
        <PasswordUpdatePage />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteListPage />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/photos",
    element: <PhotoListPage />,
    state: "photos",
  },
  {
    path: "/checkout",
    element: <Checkout />,
    state: "checkout",
  },
  {
    path: "/booking_history",
    element: (
      <ProtectedPage>
        <BookingHistoryPage />
      </ProtectedPage>
    ),
    state: "booking.history",
  },
  {
    path: "/photos/history_post",
    element: (
      <ProtectedPage>
        <PostPhoto />
      </ProtectedPage>
    ),
    state: "post.history",
  },
];

export default routes;