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
import { FaHome } from "react-icons/fa";
import { MdOutlinePolicy } from "react-icons/md";
import { SiAffinityphoto } from "react-icons/si";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
const main = [
     {
          display: "Trang Chủ",
          path: "/",
          state: "home", 
          icon: <FaHome style={{ fontSize: '1.2rem' }} />
     },
     {
          display: "Giới Thiệu & Chính Sách",
          path: "/aboutus",
          state: "aboutus", 
          icon: <MdOutlinePolicy style={{ fontSize: '1.2rem' }} />
     },
     {
          display: "Thợ Chụp Ảnh",
          path: "/photos",
          state: "photos",
          role: ["CUSTOMER", "USER"], 
          icon: <SiAffinityphoto style={{ fontSize: '1.2rem' }} />
     },
     {
          display: "hồ sơ bài viết",
          path: "/photos/history_post",
          state: "post.history",
          role: "PHOTOGRAPHER", 
          icon: <MdOutlineLocalLibrary style={{ fontSize: '1.2rem' }} />     
     }, {
          display: "Khuyến Mãi",
          path: "/vouchers",
          state: "vouchers",
          role: "CUSTOMER", 
          icon: <RiDiscountPercentLine style={{ fontSize: '1.2rem' }} />
     },
];


const user = [
     {
          display: "Cập nhật thông tin",
          path: "/profile",
          icon: <FiSettings style={{ fontSize: '1.2rem' }} />,
          state: "profile"
     },
     {
          display: "Nâng cấp tài khoản",
          path: "/upgrade-account",
          icon: <GiUpgrade style={{ fontSize: '1.2rem' }} />,
          state: "upgrade-account",
          role: 'PHOTOGRAPHER'
     },
     {
          display: "Lịch sử đặt lịch",
          path: "/booking_history",
          icon: <TbBrandBooking style={{ fontSize: '1.2rem' }} />,
          state: "booking.history"
     },
     {
          display: "Đổi mật khẩu",
          path: "/password-update",
          icon: <LockResetOutlinedIcon style={{ fontSize: '1.2rem' }} />,
          state: "password.update"
     },
     {
          display: "Danh sách yêu thích",
          path: "/favorites",
          icon: <FaHeart style={{ fontSize: '1.2rem' }} />,
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