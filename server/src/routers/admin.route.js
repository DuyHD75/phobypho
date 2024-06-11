import express from "express";
import tokenMiddleware from "../middlewares/token.middleware.js";
import adminController from "../controllers/admin.controller.js";

const router = express.Router({ mergeParams: true });
// /admins/....

router.put(
  "/order",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.updateBookingStatus
);

router.get(
  "/customers",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.getAllCustomers
);
router.get(
  "/photographers",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.getAllPhotographers
);


//ex: http://localhost:5000/api/v1/admins/bookings/search?status=PENDING
router.get(
  "/bookings/search",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.searchBookingsByStatus
);

router.get(
  "/bookings/photographer/:photographerId",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.getBookingsByPhotographer
);
// view all or view by limit bookings
// ex: http://localhost:5000/api/v1/admins/bookings/limit?limit=1&skip=0
router.get(
  "/bookings/limit",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.getBookings
);
// ex: http://localhost:5000/api/v1/admins/bookings/2024-05-27
router.get(
  "/bookings/:date",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.getAllBookingsByDate
  
)
router.get(
  "/bookings/:year/:month",
  tokenMiddleware.authenticate,
  tokenMiddleware.adminAuthorize,
  adminController.getAllBookingsByMonth
)
export default router;
