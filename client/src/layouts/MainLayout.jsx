import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/common/GlobalLoading";
import Footer from "../components/common/Footer";
import Topbar from "../components/common/Topbar";
import AuthModal from "../components/common/AuthModal";
import ReceiveVouchersModal from "../components/common/ReceiveVouchersModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import userApi from "../api/modules/user.api";
import Cookies from "js-cookie";
import ChatPopup from '../components/common/ChatPopup';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {

      const value = Cookies.get("user");
      if(value && value.startsWith("j:")){
        try {
          const parsedValue = JSON.parse(value.slice(2));
          console.log("Parsed cookie value:", parsedValue);
          dispatch(setUser(parsedValue));
        } catch (error) {
          console.error("Error parsing cookie value to JSON:", error);
        }
      }else{
        const { response, err } = await userApi.getInfo();
        if (response) dispatch(setUser({ ...response }));
        if (err) dispatch(setUser(null));
      }
    };
    authUser();
  }, [dispatch]);

  return (
    <div>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}

      {/*  <AuthModal />*/}
      <AuthModal />

               <ReceiveVouchersModal />
               {/* login modal */}
               <ChatPopup />

      <Box
        display="flex"
        minHeight="100vh"
        sx={{
          backgroundColor: "#f5f7fa",
          backgroundImage: `url(https://us-wn-g.gr-cdn.com/_next/static/media/bg3.d94446d2.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg1.0d1d3b37.svg), url(https://us-wn-g.gr-cdn.com/_next/static/media/bg2.ad4bd4bc.svg)`,
          backgroundPosition:
            "calc(50% - 418px) -30px, calc(50% - 357px) -370px, calc(50% + 570px) -170px",
          backgroundSize: "1742px 1742px,1210px 1210px,1665px 1665px",
        }}
      >
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>
      {/* footer */}
      <Footer />
      {/* footer */}
    </div>
  );
};

export default MainLayout;
