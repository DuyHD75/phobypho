import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css"; // active css toastify 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import routes from "./routers/routes";
import PageWrapper from './components/common/PageWrapper';
import './style.css';
import themeConfigs from "./configs/them.config";
import ResetPassword from "./pages/ResetPassword";


function App() {


  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: "light" })} >
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={"dark"}
      />

      <CssBaseline
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />

              )
            ))}
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
