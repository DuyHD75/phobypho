import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { FiSettings } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { GiUpgrade } from "react-icons/gi";
const main = [
     {
          display: "Trang Chủ",
          path: "/",
          state: "home"
     },
     {
          display: "Giới Thiệu & Chính Sách",
          path: "/aboutus",
          state: "aboutus"
     },
     {
          display: "Thợ Chụp Ảnh",
          path: "/photos",
          state: "photos",
          role: ["CUSTOMER", "USER"]
     },
     {
          display: "hồ sơ bài viết",
          path: "/photos/history_post",
          state: "post.history",
          role: "PHOTOGRAPHER"
     }, {
          display: "Khuyến Mãi",
          path: "/vouchers",
          state: "vouchers",
          role: "CUSTOMER"
     },
];


const user = [
     {
          display: "Cập nhật thông tin",
          path: "/profile",
          icon: <FiSettings style={{ fontSize: '1rem' }} />,
          state: "profile"
     },
     {
          display: "Nâng cấp tài khoản",
          path: "/upgrade-account",
          icon: <GiUpgrade style={{ fontSize: '1rem' }} />,
          state: "upgrade-account",
          role: 'PHOTOGRAPHER'
     },
     {
          display: "Lịch sử đặt lịch",
          path: "/booking_history",
          icon: <TbBrandBooking style={{ fontSize: '1rem' }} />,
          state: "booking.history"
     },
     {
          display: "Đổi mật khẩu",
          path: "/password-update",
          icon: <LockResetOutlinedIcon style={{ fontSize: '1rem' }} />,
          state: "password.update"
     },
     {
          display: "Danh sách yêu thích",
          path: "/favorites",
          icon: <FaHeart style={{ fontSize: '1rem' }} />,
          state: "favorites",
          role: 'CUSTOMER'
     },

];

const photographer = [
     {
          display: "Post",
          path: "/photos",
          icon: <PostAddIcon />,
          state: "post"
     },
     {
          display: "reviews",
          path: "/reviews",
          icon: <RateReviewOutlinedIcon />,
          state: "reviews"
     },
     {
          display: "password update",
          path: "/password-update",
          icon: <RiLockPasswordFill />,
          state: "password.update"
     }
];


const social = [
     {
          display: "Facebook",
          path: "#",
          icon: <FacebookIcon />,
     },
     {
          display: "Instagram",
          path: "#",
          icon: <InstagramIcon />,
     },
     {
          display: "Twitter",
          path: "#",
          icon: <TwitterIcon />,
     }
];




const menuConfigs = { main, user, social };

export default menuConfigs;