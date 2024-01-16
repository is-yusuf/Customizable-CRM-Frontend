import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import {
  AuthProvider,
  useAuth,
} from "../../components/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const addEntry = () => {};
const Contacts = () => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const { token, signOut, isAuthorized, signIn } = useAuth();
  const [isAdding, setIsAdding] = React.useState(false);
  const handleOpen = () => setIsAdding(true);
  const handleClose = () => setIsAdding(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/franchisors", {
          withCredentials: true,
        });
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
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "company_name", headerName: "Company Name", flex: 1 },
    {
      field: "point_of_contact_name",
      headerName: "Point of Contact Name",
      flex: 1,
    },
    {
      field: "point_of_contact_position",
      headerName: "Point of Contact Position",
      flex: 1,
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "office_address", headerName: "Office Address", flex: 1 },
    { field: "website_url", headerName: "Website URL", flex: 1 },
  ];

  return (
    isAuthorized && (
      <Box m="20px">
        <Header
          title="FRANCHISORS"
          subtitle="List of Franchisors With Details"
        />
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </Box>
    )
  );
};
export default Contacts;
