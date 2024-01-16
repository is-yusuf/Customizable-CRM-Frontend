import React, { useState, useEffect, useContext } from "react";
import { Box, useTheme, Button, TextField, Alert } from "@mui/material";
import { Formik, Form, Field, ErrorMessage , FormikHelpers} from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";

interface Values {
  email: string;
  password: string;
  username: string;
  profileImage: File | null;
}

const SignUp: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { isAuthorized, signIn } = useAuth();
  const handleSignIn = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const registerUser = async (
      username: string,
      password: string,
      email: string,
      image: File | null
    ) => {
      try {
        const response = await axios.post("http://localhost:8000/register", {
          username,
          password,
          email,
        });

        // Create a FormData object and append the profile image
        const formData = new FormData();
        formData.append("image", image);
        formData.append("email", email);

        await axios.put("http://localhost:8000/updateProfileImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data; // assuming you want to return the data from the response
      } catch (error) {
        // console.error("Error fetching data:", error);
        throw error;
      }
    };

    try {
      await registerUser(
        values.username,
        values.password,
        values.email,
        values.profileImage
      );
    } catch (error) {
      alert(error.response.data);
      navigate("/");
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    profileImage: yup.mixed().required("Profile image is required"),
  });

  const initialValues: Values = {
    email: "",
    password: "",
    username: "",
    profileImage: null,
  };

  return (
    <Box
      m="20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Header title="SIGN UP" subtitle="Please enter the details below" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form>
            <Box m={2}>
              <Field
                as={TextField}
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
              />
            </Box>
            <Box m={2}>
              <Field
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
              />
              <ErrorMessage name="email" component="div" />
            </Box>
            <Box m={2}>
              <Field
                as={TextField}
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
              />
              <ErrorMessage name="password" component="div" />
            </Box>
            <Box m={2}>
              {/* @ts-ignore */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Box>
            <Field name="profileImage">
              {({ field, form }: { field: any; form: any }) => (
                <input
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      form.setFieldValue("profileImage", file);
                    }
                  }}
                />
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUp;
