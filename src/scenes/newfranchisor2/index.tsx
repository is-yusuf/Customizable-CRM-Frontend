import { Box, Button, TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
type FormValues = {
  startdate: string;
  enddate: string;
  franchise_fee?: string;
  royality_fee?: string;
  advertising_fee?: string;
  contract_agreement?: string;
  geo_markets?: string;
  outlet_locations?: string;
};

const Newfranchisor2 = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    alert("Thanks, submitted");
    navigate("/dashboard");
  };

  return (
    <Box m="20px">
      <Header title="MORE DETAILS" subtitle="Add More Franchisor Details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  gridColumn: "span 4",
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="Start Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startdate}
                  name="firstName"
                  // error={!!touched.firstName && !!errors.firstName}
                  // helperText={touched.firstName && errors.firstName}
                  // required
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="date"
                  label="End Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.enddate}
                  name="lastName"
                  // error={!!touched.lastName && !!errors.lastName}
                  // helperText={touched.lastName && errors.lastName}
                  // required
                  sx={{ gridColumn: "span 1" }}
                />
              </Box>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Franchise Fee"
                onBlur={handleBlur}
                onChange={handleChange}
                name="franchise_fee"
                // required
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Royality Fee"
                onBlur={handleBlur}
                onChange={handleChange}
                name="contact"
                // required
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Advertising Fee"
                onBlur={handleBlur}
                onChange={handleChange}
                name="address1"
                // required
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contractual Agreements"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.contract_agreement}
                name="contract_agreement"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                // required
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Geographic Markets"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.geo_markets}
                name="geo_markets"
                // required
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Outlet Locations"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.address2}
                name="address2"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                // required
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  // firstName: yup.string().required("required"),
  // lastName: yup.string().required("required"),
  // email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues: FormValues = {
  startdate: "",
  enddate: "",
};

export default Newfranchisor2;
