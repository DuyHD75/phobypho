import React, { Fragment, useState, useEffect } from "react";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.config";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
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

  const [servicePackages, setServicePackages] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [poster, setPoster] = useState('');
  const [isPostRequest, setIsPostRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [addedServices, setAddedServices] = useState([]);
  const [isDataRetrieved, setIsDataRetrieved] = useState(false)
  const [postId, setPostId] = useState({});
  const [photo, setPhoto] = useState({});

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();


  useEffect(() => {
    const getPostPhoto = async () => {
      const { response, err } = await photoApi.getPostByAuth(user.id);

      if (response && response.length > 0) {

        const { id, title, descriptions, poster, attachments, servicePackages } = response[0];
        setPhoto(response[0]);
        setPostId(id);
        setIsDataRetrieved(true);
        setTitle(title);
        setDescriptions(descriptions);
        setPoster(poster);
        setAddedPhotos(attachments);
        setAddedServices(servicePackages);

        postPhotoForm.setValues({
          title: title,
          descriptions: descriptions,
        })
      }
      if (err) {
        toast.error(err);
      }
    }

    getPostPhoto();
  }, [])

  const postPhotoForm = useFormik({
    initialValues: {
      title: photo.title,
      descriptions: photo.descriptions,
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
        setErrorMessage(undefined);
        setIsPostRequest(true);

        if (addedPhotos.length === 0 || addedServices.length === 0) {
          setErrorMessage("Vui lòng thêm album của bạn và các gói dịch vụ!");
          return;
        }

        values.poster = addedPhotos[0].images[0];
        values.attachments = addedPhotos;
        values.servicePackages = addedServices;

        const validateResult = validateData(values);
        if (validateResult) {
          toast.error(`Một số trường chưa có thông tin vui lòng nhập thêm !`);
          setIsPostRequest(false);
          return;
        }

        let response;
        if (isDataRetrieved) {
          response = await photoApi.updatePhotoByAuth(values);
        } else {
          response = await photoApi.createPhoto(values);
        }

        setIsPostRequest(false);

        if (response) {
          postPhotoForm.resetForm();
          setAddedPhotos([]);
          setAddedServices([]);
          navigate(`/photos/${postId}`);
          toast.success("Post created successfully !");
        } else {
          toast.error("Failed to create/update post.");
        }
      } catch (err) {
        setIsPostRequest(false);
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

  useEffect(() => {
    const getServices = async () => {
      const { response, err } = await servicesApi.getList();
      if (!response) {
        return toast.error(err);
      }
      setServicePackages(response);
    };
    getServices();
  }, []);

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
          <Container header={photo.length > 0 ? "Cập nhật bài viết" : "Tạo bài viết"} size={"3rem"}>
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
                addedPhotos={addedPhotos}
                onChange={setAddedPhotos}
              />

              {headerAndSubHeaderOfInput(
                "Gói Dịch Vụ ",
                "Chọn các gói dịch vụ phù hợp với bạn"
              )}

              <ServicePackageGrid
                servicePackages={servicePackages}
                handleCardAction={setAddedServices}
                addedServices={addedServices}
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
                loading={isPostRequest}
              >
                {photo ? "Cập nhật" : "Đăng bài viết"}
              </LoadingButton>

              {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                  <Alert severity="error" variant="outlined">
                    {errorMessage}
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
