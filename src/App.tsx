import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/dashboard";
import Team from "./scenes/team";
import Performance from "./scenes/performance";
import Contacts from "./scenes/contacts/contacts";
import Form from "./scenes/form";
import Newfranchisor2 from "./scenes/newfranchisor2";
import Correspondance from "./scenes/correspondance/correspondance";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Expansion from "./scenes/expansion";
import Legal from "./scenes/legal";
import Authorization from "./scenes/signin/signin";
import { AuthProvider, useAuth } from "./components/AuthContext/AuthContext";
import SignUp from "./scenes/signup/SignUp";
import { useNavigate } from "react-router-dom";
import { StrictMode } from "react";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const { isAuthorized, signIn } = useAuth();
  // if (localStorage.getItem("token") !== null && !isAuthorized) {
  //   signIn(localStorage.getItem("token") as string);
  // }

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthorized) {
      navigate("./dashboard");
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthorized && <Sidebar isSidebar={isSidebar} />}
          {/* (isAuthenticated && <Sidebar isSidebar={isSidebar} />) */}
          <main className="content">
            {isAuthorized && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Authorization />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/franchisors" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/correspondance" element={<Correspondance />} />
              <Route path="/newfranchisor" element={<Form />} />
              <Route path="/newfranchisor2" element={<Newfranchisor2 />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/expansion" element={<Expansion />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
