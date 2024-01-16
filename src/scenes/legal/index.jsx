import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Legal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/legal_and_compliance",
          { withCredentials: true }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts

    // Note: You can add dependencies to the array below if needed
    // For example, if the API call depends on some props or state changes,
    // you can add them to the dependency array to trigger the API call when they change.
    // If you want the API call to run only once when the component mounts, leave the array empty.
  }, []);
  const columns = [
    { field: "company_name", headerName: "Franchisor name", flex: 1 },
    {
      field: "legal_issues_records",
      headerName: "Communication Date",
      flex: 1,
    },
    {
      field: "industry_compliance",
      headerName: "Communication Summary",
      flex: 1,
    },
  ];
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
    </Box>
  );
};

export default Legal;
