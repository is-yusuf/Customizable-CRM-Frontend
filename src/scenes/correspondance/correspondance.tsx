import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useAuth } from "../../components/AuthContext/AuthContext";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Autocomplete from "@mui/material/Autocomplete";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Correspondance = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [initialValues, setInitialValues] = useState({
    company_name: "",
    communication_date: "",
    communication_summary: "",
    issues_raised: "",
    resolutions: "",
    contract_changes_agreed: "",
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const { token, signOut, isAuthorized, signIn } = useAuth();
  const isMounted = useRef(false); // Ref to track component's mount status
  const [isAdding, setIsAdding] = useState(false);
  const [franchisorslist, setFranchisorslist] = useState([
    {
      label: "Pizza cud",
    },
    { label: "ABC Burgers" },
  ]);
  const handleOpen = () => setIsAdding(true);
  const handleClose = () => {
    setIsAdding(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/communication_history",
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.data === "Not Authorized") {
          console.log("Not authorized");
        } else if (error.response && error.response.data === "Token Expired") {
          console.log("Token expired");
          signOut();
        }
      }
    };

    fetchData();
  }, [signOut]);

  const columns = [
    { field: "company_name", headerName: "Franchisor Name", flex: 1 },
    { field: "communication_date", headerName: "Communication Date", flex: 1 },
    {
      field: "communication_summary",
      headerName: "Communication Summary",
      flex: 1,
    },
    { field: "issues_raised", headerName: "Issues Raised", flex: 1 },
    { field: "resolutions", headerName: "Resolutions", flex: 1 },
    {
      field: "contract_changes_agreed",
      headerName: "Contract Changes Agreed",
      flex: 1,
    },
  ];

  const handleFormSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    console.log("sss");
    try {
      console.log(values);

      const response = isAuthorized
        ? await axios.post("http://localhost:8000/communication_history", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            values,
          })
        : null;
      response && setData(response.data);
    } catch (error) {
      if (error.response.data === "Not Authorized") {
        console.log(error);
      } else if (error.response.data === "Token Expired") {
        console.log("Token expired");
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="FRANCHISORS" subtitle="List of Franchisors With Details" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      
      </Box>
   
    <Box>
    <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen} // Calling your action function on click
        sx={{
          position: "absolute", // Position it absolutely
          bottom: "20px", // 20px from the bottom
          right: "350px", // 20px from the right
          backgroundColor: `${colors.blueAccent[100]}`,
        }}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={isAdding}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="ADD NEW RECORD"
            subtitle="Add a new communication history"
          />

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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                  sx={{
                    width: "80%", // Make modal wider
                    margin: "auto",
                  }}
                >
                  <Autocomplete
                    fullWidth
                    options={franchisorslist}
                    sx={{ gridColumn: "span 1" }}
                    onChange={(event, newValue) => {
                      setFieldValue(
                        "company_name",
                        newValue ? newValue.label : ""
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        type="text"
                        label="Franchisor Name"
                        onBlur={handleBlur}
                        name="company_name"
                        onChange={handleChange}
                      />
                    )}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Communication Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="communication_date"
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Communication Summary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="communication_summary"
                    multiline
                    rows={4}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Issues Raised"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="issues_raised"
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Resolutions"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="resolutions"
                    multiline
                    rows={4}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="contract_changes_agreed"
                      />
                    }
                    label="Contract Changes Agreed"
                    sx={{ gridColumn: "span 1" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    sx={{ width: "30%" }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
    
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  // company_name: yup.string().required("Franchisor Name is required"),
  // communication_date: yup.date().required("Communication Date is required"),
  // communication_summary: yup
  //   .string()
  //   .required("Communication Summary is required"),
  // issues_raised: yup.string().required("Issues Raised is required"),
  // resolutions: yup.string(),
  // contract_changes_agreed: yup
  //   .boolean()
  //   .required("is this issue resolved or not?"),
});

type FormValues = {
  company_name: string;
  communication_date: string;
  communication_summary: string;
  issues_raised: string;
  resolutions: string;
  contract_changes_agreed: string;
};

export default Correspondance;
