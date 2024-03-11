import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


const main = [
     {
          display: "Home",
          path: "/",
          state: "home"
     },
     {
          display: "About Us",
          path: "/aboutus",
          state: "aboutus"
     },
     {
          display: "Photographers",
          path: "/photos",
          state: "photos"
     },
];


const user = [
     {
          display: "favorites",
          path: "/favorites",
          icon: <FavoriteBorderOutlinedIcon />,
          state: "favorite"
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
          icon: <LockResetOutlinedIcon />,
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


const options =[
     {
          display: 'All', 
          
     }
]


const menuConfigs = { main, user, social };

export default menuConfigs;