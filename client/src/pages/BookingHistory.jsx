import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/common/UserSidebar";
import { Box, Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import customerApi from "../api/modules/customer.api";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { MdOutlineFreeCancellation, MdOutlineRateReview } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import CommonModal from "../components/common/CommonModal";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import ORDER_STATUS from "../api/configs/OrderStatus.Config";
import photographerApi from "../api/modules/photographer.api";
import NotFound from "../components/common/NotFound";
import moment from "moment";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "primary.main",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BookingHistoryPage = () => {
  const { user } = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [bookingDate, setBookingDate] = useState();
  const [duration, setDuration] = useState();
  const [bookingId, setBookingId] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cancelFee, setCancelFee] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      if (user && user.userData.account.role === "CUSTOMER") {
        const { response, err } = await customerApi.getBookings(
          user.userData.account.id || user.userData.account._id
        );
        if (response) setBookings(response);
        if (err) toast.error(err.message);
      } else {
        const { response, err } =
          await photographerApi.getBookingOfPhotographer(
            user.userData.account.id || user.userData.account._id
          );
        if (response) setBookings(response);
        if (err) toast.error(err.message);
      }
    };
    getBookings();
  }, []);

  const handleCancelBooking = async (
    bookingId,
    bookingDate,
    total_price,
    createdAt
  ) => {
    const currentTime = dayjs();
    const bookingTime = dayjs(bookingDate);

    setCreatedAt(createdAt);
    setOpenModal(true);
    setBookingDate(bookingDate);

    const remainingTime = bookingTime.diff(currentTime);
    setDuration(remainingTime);

    const percent = calculateCancellationFee(bookingDate, new Date());
    setCancelFee(total_price * percent);
    setBookingId(bookingId);
  };

  const calculateCancellationFee = (bookingDate, cancelDate) => {
    const remainingTime = dayjs(bookingDate).diff(dayjs(cancelDate));
    const daysDifference = remainingTime / (1000 * 60 * 60 * 24);
    if (daysDifference >= 3) {
      return 0;
    } else if (daysDifference >= 2 && daysDifference < 3) {
      return 0.1;
    } else if (daysDifference >= 1 && daysDifference < 2) {
      return 0.5;
    } else if (daysDifference >= 0.5) {
      return 1;
    } else {
      return 1;
    }
  };

  const processCancelBooking = async (bookingId) => {
    setIsProcessing(true);
    const { response, err } = await customerApi.cancelBooking(
      bookingId,
      "CANCELLED",
      cancelFee
    );

    setIsProcessing(false);
    if (response) {
      setOpenModal(false);
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "CANCELLED" }
            : booking
        )
      );
      toast.success("Hủy lịch hẹn thành công!");
    }
    if (err) {
      toast.error(err.message);
    }
  };

  const handleConfirmCompleted = async (bookingId,bookingDate,    createdAt) => {
    setOpenModalConfirm(true);
    setBookingId(bookingId);
    setBookingDate(bookingDate);
    setCreatedAt(createdAt);
  };
  const processConfirmCompleted = async (bookingId) => {
    setIsProcessing(true);
    const { response, err } = await customerApi.confirmCompleted(bookingId);
    setIsProcessing(false);
    if (response) {
      setOpenModalConfirm(false);
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: response.status,
                customerCompleted: response.customerCompleted,
                photographerCompleted: response.photographerCompleted,
              }
            : booking
        )
      );
      toast.success("Xác nhận hoàn thành lịch hẹn thành công!");
    }
    if (err) {
      toast.error(err.message);
    }
  };

  const isButtonDisabled = (row, userRole) => {
    const isCustomer = userRole === "CUSTOMER";
    const isPhotographer = userRole === "PHOTOGRAPHER";
    const isPending = row.status === ORDER_STATUS.pending;
    const isCustomerNotCompleted = !row.customerCompleted;
    const isPhotographerNotCompleted = !row.photographerCompleted;
    const bookingDate = dayjs.utc(row.booking_date);
    const currentDate = dayjs();
  
    // Check if the current date is after the booking date
    const isAfterBookingDate = currentDate.isAfter(bookingDate);
  
    if (isPending && isAfterBookingDate && ((isCustomer && isCustomerNotCompleted) || (isPhotographer && isPhotographerNotCompleted))) {
      return false;
    }
  
    return true;
  };
  

  return (
    <Fragment>
      <CommonModal open={openModal} onClose={() => setOpenModal(false)}>
        <Box>
          <Typography
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
              color: "primary.main",
              textTransform: "Capitalize",
              textShadow: "1px 1px 1px #000",
              fontSize: "1.2rem",
              textTransform: "uppercase",
            }}
          >
            Hủy Lịch Hẹn
          </Typography>

          <Box>
            <Typography
              variant="p"
              sx={{
                ...uiConfigs.style.typoLines(4, "left"),
                color: "secondary.colorText",
                paddingTop: "2rem",
                fontSize: "1rem",
              }}
            >
              Việc hủy lịch hẹn sẽ ảnh hưởng đển thời gian đã được sắp xếp giữ
              các bên. Dựa vào thời gian thực hiện cuộc hẹn và thời gian hủy sẽ
              có mức phụ thu theo phần trăm theo hóa đơn!
            </Typography>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Thời gian đặt lịch:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }}
              >
                {dayjs(createdAt).format("DD-MM-YYYY HH:mm")}
              </Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Thời gian cuộc hẹn:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }}
              >
                {dayjs(bookingDate).format("DD-MM-YYYY HH:mm")}
              </Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Thời gian hủy lịch:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }}
              >
                {dayjs(new Date()).format("DD-MM-YYYY HH:mm")}
              </Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Thời gian còn lại:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }}
              >
                {duration
                  ? `${Math.floor(
                      duration / (1000 * 60 * 60 * 24)
                    )} ngày ${Math.floor(
                      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    )} giờ ${Math.floor(
                      (duration % (1000 * 60 * 60)) / (1000 * 60)
                    )} phút`
                  : "Calculating duration..."}
              </Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Phí hủy lịch:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }}
              >
                {cancelFee &&
                  cancelFee.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
              </Typography>
            </Stack>

            <Typography
              variant="p"
              sx={{
                ...uiConfigs.style.typoLines(3, "center"),
                color: "secondary.colorText",
                paddingTop: "2rem",
              }}
            >
              Bạn có chắc chắn muốn hủy lịch hẹn này không?
            </Typography>

            <LoadingButton
              variant="contained"
              loadingPosition="start"
              fullWidth
              size="small"
              sx={{
                marginTop: 2,
                fontFamily: '"Nunito", sans-serif',
                fontSize: "0.9rem",
              }}
              loading={isProcessing}
              onClick={() => processCancelBooking(bookingId)}
            >
              Xác Nhận
            </LoadingButton>
          </Box>
        </Box>
      </CommonModal>

      <CommonModal
        open={openModalConfirm}
        onClose={() => setOpenModalConfirm(false)}
      >
        <Box>
          <Typography
            sx={{
              ...uiConfigs.style.typoLines(2, "center"),
              color: "primary.main",
              textTransform: "Capitalize",
              textShadow: "1px 1px 1px #000",
              fontSize: "1.2rem",
              textTransform: "uppercase",
            }}
          >
            Hoàn thành lịch hẹn
          </Typography>

          <Box>
            <Typography
              variant="p"
              sx={{
                ...uiConfigs.style.typoLines(4, "left"),
                color: "secondary.colorText",
                paddingTop: "2rem",
                fontSize: "1rem",
              }}
            >
              Đơn hàng sẽ chuyển trạng thái "Hoàn thành" sau khi cả hai bên đã
              xác nhận hoàn thành buổi chụp hình!
            </Typography>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Thời gian đặt lịch:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }}
              >
                {dayjs(createdAt).format("DD-MM-YYYY HH:mm")}
                </Typography>
            </Stack>

            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              sx={{ marginTop: "1rem" }}
            >
              Thời gian cuộc hẹn:
              <Typography
                sx={{
                  ...uiConfigs.style.typoLines(2, "center"),
                  color: "primary.main",
                }} 
              >
                {dayjs.utc(bookingDate).format("DD-MM-YYYY HH:mm")}
                </Typography>
            </Stack>

            <Typography
              variant="p"
              sx={{
                ...uiConfigs.style.typoLines(3, "center"),
                color: "secondary.colorText",
                paddingTop: "2rem",
              }}
            >
              Bạn có chắc chắn muốn xác nhận hoàn thành buổi chụp này không?
            </Typography>

            <LoadingButton
              variant="contained"
              loadingPosition="start"
              fullWidth
              size="small"
              sx={{
                marginTop: 2,
                fontFamily: '"Nunito", sans-serif',
                fontSize: "0.9rem",
              }}
              loading={isProcessing}
              onClick={() => processConfirmCompleted(bookingId)}
            >
              Xác Nhận
            </LoadingButton>
          </Box>
        </Box>
      </CommonModal>

      <UserSidebar>
        <Typography
          sx={{
            ...uiConfigs.style.typoLines(1, "left"),
            fontSize: "1rem",
            color: "primary.headerColor",
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
            bgcolor: "#172149",
            padding: "1rem",
            borderRadius: "10px",
            border: "2px solid rgba(255,255,255,0.1)",
            textTransform: "capitalize",
            overflow: "hidden",
          }}
        >
          Lịch sử đặt lịch{" "}
        </Typography>

        {bookings.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Thợ Chụp Ảnh</StyledTableCell>
                  <StyledTableCell align="left">Địa Điểm</StyledTableCell>
                  <StyledTableCell align="left">
                    Thời gian đặt lịch
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Thời gian cuộc hẹn
                  </StyledTableCell>
                  <StyledTableCell align="left">Combo</StyledTableCell>
                  <StyledTableCell align="left">Trạng Thái</StyledTableCell>
                  <StyledTableCell align="left">Tổng Tiền</StyledTableCell>
                  {user.userData.account.role === "CUSTOMER" && (
                    <StyledTableCell align="left">Hủy</StyledTableCell>
                  )}
                  {user.userData.account.role === "CUSTOMER" && (
                    <StyledTableCell align="left">Đánh giá</StyledTableCell>
                  )}
                  
                    <StyledTableCell align="center">Hoàn thành</StyledTableCell>
    
                </TableRow>
              </TableHead>
              <TableBody> 
                {bookings.map((row, index) => (
                  <Fragment key={index}>
                    <StyledTableRow key={row.name}>
                      <StyledTableCell align="left" component="th" scope="row">
                        <Link
                          to={`/photos/${row.photo}`}
                          style={{
                            ...uiConfigs.style.typoLines(2, "left"),
                            fontSize: "0.9rem",
                          }}
                        >
                          {row.photographerName}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.location}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {dayjs(row.createdAt).format("DD-MM-YYYY HH:mm")}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {dayjs.utc(row.booking_date).format("DD-MM-YYYY HH:mm")}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.servicePackageName}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{
                          color: Object.values(ORDER_STATUS).includes(
                            row.status
                          )
                            ? row.status === ORDER_STATUS.pending
                              ? "#ffdc48"
                              : "primary.main"
                            : "#0000",
                          textTransform: "uppercase",
                          textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
                        }}
                      >
                        {row.status === ORDER_STATUS.pending
                          ? "Đang chờ"
                          : row.status === ORDER_STATUS.confirmed
                          ? "Đã xác nhận"
                          : row.status === ORDER_STATUS.completed
                          ? "Hoàn thành"
                          : row.status === ORDER_STATUS.cancelled
                          ? "Đã hủy"
                          : "Trạng thái không xác định"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.total_price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </StyledTableCell>

                      {user.userData.account.role === "CUSTOMER" && (
                        <StyledTableCell align="left">
                          {
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleCancelBooking(
                                  row.id,
                                  row.booking_date,
                                  row.total_price,
                                  row.createdAt
                                )
                              }
                              disabled={
                                row.status === ORDER_STATUS.pending ||
                                row.status === ORDER_STATUS.confirmed
                                  ? false
                                  : true
                              }
                            >
                              <MdOutlineFreeCancellation
                                style={{ fontSize: "1.2rem" }}
                              />
                            </Button>
                          }
                        </StyledTableCell>
                      )}

                      {user.userData.account.role === "CUSTOMER" && (
                        <StyledTableCell align="left">
                          {
                            <Button
                              variant="outlined"
                              onClick={() => {
                                navigate(`/photos/${row.photo}`, {
                                  state: { bookingId: row.id },
                                });
                              }}
                              disabled={row.status !== ORDER_STATUS.completed}
                            >
                              <MdOutlineRateReview
                                style={{ fontSize: "1.2rem" }}
                              />
                            </Button>
                          }
                        </StyledTableCell>
                      )}
                      {(user.userData.account.role === "CUSTOMER" ||
                        user.userData.account.role === "PHOTOGRAPHER") && (
                        <StyledTableCell align="center">
                          {
                            <Button
                              variant="outlined"
                              onClick={() => handleConfirmCompleted(row.id, row.booking_date,
                                row.createdAt)}
                              disabled={
                                isButtonDisabled(row, user.userData.account.role)
                                
                              }
                            >
                              <IoCheckmarkDone style={{ fontSize: "1.2rem" }} />
                            </Button>
                          }
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <NotFound />
        )}
      </UserSidebar>
    </Fragment>
  );
};

export default BookingHistoryPage;
