import React, { useState, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import menuConfigs from "../../configs/menu.config";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import UserMenu from "./UserMenu";
import uiConfigs from "../../configs/ui.config";
import Switch from '@mui/material/Switch';
import photographerApi from "../../api/modules/photographer.api";
import { toast } from 'react-toastify';


const ScrollAppBar = ({ children, window }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger ? "secondary.colorText" : "secondary.colorText",
      background: trigger ? "#f5f7fa" : "transparent",
    },
  });
};



const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);

  const [openSideBar, setOpenSideBar] = useState(false);

  const [isActive, setIsActive] = useState(true);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setOpenSideBar(!openSideBar);
  };

  const handleChangeAccountStatus = async (event) => {
    setIsActive(event.target.checked);
    const { response, err } = await photographerApi.updateStatus({ status: event.target.checked ? "AVAILABLE" : "INACTIVE" });
    if (response) {
      console.log(response);
      toast.success("Trang thái tài khoản đã được cập nhật!");
    }
    if (err) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  }

  return (
    <div>
      <SideBar open={openSideBar} toggleSideBar={toggleSidebar} />

      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 999 }}>
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: "1350px",
              marginX: "auto",
              width: "100%",
              paddingY: "1.6rem",

            }}
          >
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon></MenuIcon>
              </IconButton>

              <Box
                sx={{
                  display: { xs: "inline-block", md: "none" },
                  position: "relative",
                  left: { sm: "40%", sx: "40%" },
                }}
              >
                <Logo isHeader={true} />
              </Box>
            </Stack>

            {/*main menu */}
            <Box
              sx={{ marginRight: "30px", display: { xs: "none", md: "block" } }}
            >
              <Logo isHeader={true} />
            </Box>

            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
              justifyContent={"space-around"}
            >
              <Box>
                {menuConfigs.main.map((item, index) => {
                  if (!item.role || (user && item.role.includes("CUSTOMER") && user.role === "CUSTOMER")) {
                    return (
                      <Button
                        component={Link}
                        to={item.path}
                        key={index}
                        variant={
                          appState.includes(item.state) ? "outline" : "text"
                        }
                        sx={{
                          mr: 2,
                          fontFamily: '"Nunito", sans-serif',
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          color: appState.includes(item.state)
                            ? "primary.main"
                            : "inherit",
                          textShadow: "1px 1px 1px rgba(255,255,255,0.5)"
                        }}
                      >
                        {item.display}
                      </Button>
                    );
                  } else if (user && item.role === "PHOTOGRAPHER" && user.role === "PHOTOGRAPHER") {
                    return (<Button
                      component={Link}
                      to={item.path}
                      key={index}
                      variant={
                        appState.includes(item.state) ? "outline" : "text"
                      }
                      sx={{
                        mr: 2,
                        fontFamily: '"Nunito", sans-serif',
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: appState.includes(item.state)
                          ? "primary.main"
                          : "inherit",
                        textShadow: "1px 1px 1px rgba(255,255,255,0.5)"

                      }}
                    >
                      {item.display}
                    </Button>);
                  } else if (!user && item.role && !item.role.includes("PHOTOGRAPHER")) {
                    // Show items that don't require authentication and are not for photographers
                    return (
                      <Button
                        component={Link}
                        to={item.path}
                        key={index}
                        variant={
                          appState.includes(item.state) ? "outline" : "text"
                        }
                        sx={{
                          mr: 2,
                          fontFamily: '"Nunito", sans-serif',
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          color: appState.includes(item.state)
                            ? "primary.main"
                            : "inherit",
                          textShadow: "1px 1px 1px rgba(255,255,255,0.5)"

                        }}
                      >
                        {item.display}
                      </Button>
                    );
                  }
                  return null;
                })}
              </Box>
            </Box>

            {/*main menu */}

            {user && user.role === "PHOTOGRAPHER" &&
              (
                <Stack direction="row" alignItems="center" >
                  <Typography sx={{
                    ...uiConfigs.style.typoLines(1, 'left'),
                    color: isActive ? 'primary.main' : 'primary.headerColor',
                    textTransform: 'normal',
                    textShadow: '1px 1px 1px #222',
                  }}>{isActive ? "Đang Hoạt Động" : "Không Hoạt Động"}</Typography>
                  <Switch
                    checked={isActive}
                    onChange={handleChangeAccountStatus}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Stack>
              )
            }

            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: "0.8rem",
                    fontWeight: "500",
                  }}
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Login
                </Button>
              )}
            </Stack>
            
            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </div >
  );
};

export default Topbar;