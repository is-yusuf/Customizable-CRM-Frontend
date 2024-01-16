import React, { useState, useEffect, useContext } from "react";
import { Box, useTheme, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";

interface Values {
  email: string;
  password: string;
}

const Authorization: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { isAuthorized, signIn } = useAuth();
  const handleSignIn = async (values: Values) => {
    const checkUser = async (email: string, password: string) => {
      email = email.toLowerCase();
      try {
        const response = await axios.post(
          "http://localhost:8000/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        return response; // assuming you want to return the data from the response
      } catch (error) {
        // throw error;
        // TODO: FOR TESTING ONLY
        return {
          cookie: "dump",
          data: {
            username: "Yusuf",
            profileImageUrl:
              "https://media.licdn.com/dms/image/D4E03AQEN0trSPUwP6A/profile-displayphoto-shrink_800_800/0/1689297872058?e=2147483647&v=beta&t=jw1vafpKzoYlSmVYRmugif2Efd5-HUPlIJaM1O8xkAc",
          },
        };
      }
    };

    try {
      const res: any = await checkUser(values.email, values.password);
      signIn(
        res.cookie,
        res.data.username,
        values.email,
        res.data.profileImageUrl
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        "Failed to authenticate. Please check your credentials and try again."
      );
    }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const initialValues: Values = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate("./dashboard");
    }
  }, [isAuthorized]);

  return (
    <Box
      m="20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Header title="SIGN IN" subtitle="For signing up, contact devs" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
                type="submit"
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Box>
            <Box m={2}>
              <Button variant="text" color="primary">
                Forgot Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Authorization;
