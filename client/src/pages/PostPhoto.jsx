import React, { Fragment, useState, useEffect, useCallback } from "react";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.config";
import {
  Box,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import PhotoUploader from "../components/common/PhotoUploader";
import ServicePackageGrid from "../components/common/ServicePackageGrid";
import servicesApi from "../api/modules/services.api";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import photoApi from "../api/modules/photo.api";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


const PostPhoto = () => {

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [photoState, setPhotoState] = useState({
    servicePackages: [],
    addedPhotos: [],
    title: '',
    descriptions: '',
    poster: '',
    isPostRequest: false,
    errorMessage: '',
    addedServices: [],
    isDataRetrieved: false,
    postId: {},
    photo: {},
  });

  const getPostPhoto = useCallback(async () => {
    const { response, err } = await photoApi.getPostByAuth(user.id);

    if (response && response.length > 0) {
      const { id, title, descriptions, poster, attachments, servicePackages } = response[0];
      setPhotoState(prevState => ({
        ...prevState,
        photo: response[0],
        postId: id,
        isDataRetrieved: true,
        title,
        descriptions,
        poster,
        addedPhotos: attachments,
        addedServices: servicePackages,
      }));

      postPhotoForm.setValues({
        title: title,
        descriptions: descriptions,
      });
    }
    if (err) {
      toast.error(err);
    }
  }, [user.id]);

  const getServices = useCallback(async () => {
    const { response, err } = await servicesApi.getList();
    if (!response) {
      return toast.error(err);
    }
    setPhotoState(prevState => ({ ...prevState, servicePackages: response }));
  }, []);

  useEffect(() => {
    getPostPhoto();
    getServices();
  }, [getPostPhoto, getServices]);

  const setAddedPhotos = (newPhotos) => {
    setPhotoState(prevState => ({ ...prevState, addedPhotos: newPhotos }));
  };

  const setAddedServices = (newServices) => {
    setPhotoState(prevState => ({ ...prevState, addedServices: newServices }));
  };


  const postPhotoForm = useFormik({
    initialValues: {
      title: photoState.photo.title,
      descriptions: photoState.photo.descriptions,
      poster: '',
      attachments: [],
      servicePackages: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(8, "Title at least 8 characters !")
        .required("Title is required !"),
      descriptions: Yup.string()
        .min(8, "Descriptions name at least 8 characters !")
        .required("Descriptions name is required !"),
    }),
    onSubmit: async (values) => {
      try {
        setPhotoState(prevState => ({ ...prevState, errorMessage: undefined, isPostRequest: true }));

        if (photoState.addedPhotos.length === 0 || photoState.addedServices.length === 0) {
          setPhotoState(prevState => ({ ...prevState, errorMessage: "Vui lòng thêm album của bạn và các gói dịch vụ!" }));
          return;
        }

        values.poster = photoState.addedPhotos[0].images[0];
        values.attachments = photoState.addedPhotos;
        values.servicePackages = photoState.addedServices;

        const validateResult = validateData(values);
        if (validateResult) {
          toast.error(`Một số trường chưa có thông tin vui lòng nhập thêm !`);
          setPhotoState(prevState => ({ ...prevState, isPostRequest: false }));
          return;
        }


        let response;
        if (photoState.isDataRetrieved) {
          console.log(values)
          response = await photoApi.updatePhotoByAuth(values);
          toast.success("Bài viết được cập nhật thành công!");
        } else {
          response = await photoApi.createPhoto(values);
          toast.success("Bài viết được tạo thành công!");
        }

        setPhotoState(prevState => ({ ...prevState, isPostRequest: false }));

        if (response) {
          postPhotoForm.resetForm();
          setPhotoState(prevState => ({ ...prevState, addedPhotos: [] }));
          setPhotoState(prevState => ({ ...prevState, addedServices: [] }));
          navigate(`/photos/${photoState.postId}`);

        } else {
          toast.error("Failed to create/update post.");
        }
      } catch (err) {
        setPhotoState(prevState => ({ ...prevState, isPostRequest: false }));
        toast.error(err.message);
      }
    },
  });


  const validateData = (values) => {
    const undefinedFields = Object.keys(values).filter((key) => {
      return (values[key] === undefined || values[key].length === 0);
    });
    return undefinedFields.length > 0 && undefinedFields;
  };


  const headerAndSubHeaderOfInput = (header, description) => {
    return (
      <Box sx={{ padding: "1rem 0" }}>
        <Typography
          sx={{
            ...uiConfigs.style.typoLines(1, "left"),
            color: "primary.main",
            textTransform: "capitalize",
          }}
          variant="h5"
        >
          {header}
        </Typography>
        <Typography
          sx={{ ...uiConfigs.style.typoLines(1, "left"), color: "secondary.subText" }}
          variant="p"
        >
          {description}
        </Typography>
      </Box>
    );
  };

  return (
    <Fragment>
      <Box
        sx={{
          position: "relative",
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box sx={{ padding: "10%", display: "flex" }}>
          <Container header={photoState.photo.length > 0 ? "Cập nhật bài viết" : "Tạo bài viết"} size={"3rem"}>
            <Box
              component={"form"}
              onSubmit={postPhotoForm.handleSubmit}
              sx={{
                width: { sx: "500px", md: "1000px" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {headerAndSubHeaderOfInput(
                "Tiêu đề",
                "Tiêu đề cho bức ảnh của bạn, nên ngắn gọn và hấp dẫn như trong quảng cáo"
              )}
              <TextField
                type="text"
                placeholder="Nhập tiêu đề của bạn"
                name="title"
                fullWidth
                value={postPhotoForm.values.title}
                onChange={postPhotoForm.handleChange}
                color="warning"
                error={
                  postPhotoForm.touched.title &&
                  postPhotoForm.errors.title !== undefined
                }
                helperText={
                  postPhotoForm.touched.title && postPhotoForm.errors.title
                }
              />

              {headerAndSubHeaderOfInput(
                "Mô tả",
                "Mô tả cho bức ảnh của bạn, nên ngắn gọn và hấp dẫn như trong quảng cáo"
              )}
              <TextField
                type="text"
                placeholder="Nhập mô tả của bạn"
                name="descriptions"
                fullWidth
                multiline
                rows={5}
                maxRows={10}
                value={postPhotoForm.values.descriptions}
                onChange={postPhotoForm.handleChange}
                color="warning"
                error={
                  postPhotoForm.touched.descriptions &&
                  postPhotoForm.errors.descriptions !== undefined
                }
                helperText={
                  postPhotoForm.touched.descriptions &&
                  postPhotoForm.errors.descriptions
                }
              />

              {headerAndSubHeaderOfInput("Bộ sưu tập ", "Tải ảnh của bạn lên đây nhé ")}
              <PhotoUploader
                addedPhotos={photoState.addedPhotos}
                onChange={setAddedPhotos}
              />

              {headerAndSubHeaderOfInput(
                "Gói Dịch Vụ ",
                "Chọn các gói dịch vụ phù hợp với bạn"
              )}

              <ServicePackageGrid
                servicePackages={photoState.servicePackages}
                handleCardAction={setAddedServices}
                addedServices={photoState.addedServices}
              />

              <LoadingButton
                loadingPosition="start"
                type="submit"
                fullWidth
                size="small"
                sx={{
                  marginTop: 4,
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "1rem",
                }}
                loading={photoState.isPostRequest}
              >
                {photoState.photo ? "Cập nhật" : "Đăng bài viết"}
              </LoadingButton>

              {photoState.errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                  <Alert severity="error" variant="outlined">
                    {photoState.errorMessage}
                  </Alert>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </Fragment>
  );
};

export default PostPhoto;