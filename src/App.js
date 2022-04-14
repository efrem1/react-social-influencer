import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SigninPage from "./pages/SigninPage";
import RegisterBrand from "./pages/RegisterBrand";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CampaignPage from "./pages/CampaignPage";
import ContentLibrary from "./pages/ContentLibraryPage";
import CreatorPage from "./pages/CreatorPage";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import ForgotPassword from "./pages/ForgetPassword";
import MyAccountPage from "./pages/MyAccountPage";
import BillingPage from "./pages/BillingPage";
import AdminPage from "./pages/AdminPage";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./auth";
import { lightTheme } from "./theme/lightTheme";
import "./i18n";

const user = localStorage.getItem("@user") ?? null;
const tokens = localStorage.getItem("@tokens") ?? null;
const WrapperComponent = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider
        user={user ? JSON.parse(user) : {}}
        tokens={tokens ? JSON.parse(tokens) : {}}
      >
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <WrapperComponent>
              <WelcomePage />
            </WrapperComponent>
          }
        />
        <Route
          path="/signin"
          element={
            <WrapperComponent>
              <SigninPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/signup"
          element={
            <WrapperComponent>
              <SignupPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/signup/step2"
          element={
            <WrapperComponent>
              <RegisterBrand />
            </WrapperComponent>
          }
        />
        <Route
          path="/home"
          element={
            <WrapperComponent>
              <HomePage />
            </WrapperComponent>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <WrapperComponent>
              <ForgotPassword />
            </WrapperComponent>
          }
        />
        <Route
          path="/campaign"
          element={
            <WrapperComponent>
              <CampaignPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/content-library"
          element={
            <WrapperComponent>
              <ContentLibrary />
            </WrapperComponent>
          }
        />
        <Route
          path="/creator"
          element={
            <WrapperComponent>
              <CreatorPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/create-campaign"
          element={
            <WrapperComponent>
              <CreateCampaignPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/billing"
          element={
            <WrapperComponent>
              <BillingPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/myaccount"
          element={
            <WrapperComponent>
              <MyAccountPage />
            </WrapperComponent>
          }
        />
        <Route
          path="/admin"
          element={
            <WrapperComponent>
              <AdminPage />
            </WrapperComponent>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
