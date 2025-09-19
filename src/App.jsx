import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import HomePage from "./pages/User/HomePage";
import Footer from "./components/Layout/Footer";
import ContactPage from "./pages/User/ContactPage";
import AboutPage from "./pages/User/AboutPage";
import PrivacyPolicyPage from "./pages/User/PrivacyPolicyPage";
import TrackOrderPage from "./pages/User/TrackOrderPage";
import CareersPage from "./pages/User/CareersPage";
import ErrorPage from "./pages/User/ErrorPage";
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import ManageMenu from "./pages/Admin/ManageMenu";
import ManageUsers from "./pages/Admin/ManageUsers";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/SignIn";
import Cart from "./pages/User/Cart";
import Success from "./pages/User/Success";
import Cancel from "./pages/User/Cancel";
import ProofOfOrder from "./pages/User/ProofOfOrder";
import MyOrder from "./pages/User/MyOrder";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AuthProvider from "./auth/AuthProvider";
import UpdateOrder from "./pages/Admin/UpdateOrder";
import StartOver from "./pages/User/StartOver";
import LoginOrGuest from "./pages/User/LoginOrGuest";
import DeliveryAddress from "./pages/User/DeliveryAddress";


function Layout({ toggleTheme, darkMode }) {
  const location = useLocation();
  const hideNavbarFooter = location.pathname.startsWith('/admin')
  ||
  ["/login","/register","/","/login-or-guest"].includes(location.pathname);
  return (
    <>
      {!hideNavbarFooter && <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />}
      <Routes>
        {<Route path="/" element={<StartOver />} />}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login-or-guest" element={<LoginOrGuest />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/delivery-address" element={<DeliveryAddress />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/proof-of-order" element={<ProofOfOrder />} />
        <Route path="/my-order" element={
          <PrivateRoute>
            <MyOrder/>
          </PrivateRoute>
        }/>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage/>
          </PrivateRoute>
        }/>
        {/* route for admin panel */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="update" element={<UpdateOrder/>}/>
        </Route>
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
function App({ children }) {
    const [darkMode, setDarkMode] = useState(()=>{
    // load theme from localstorage
    return localStorage.getItem("theme")==="dark"
  })
  useEffect(()=>{
    if(darkMode){
      root.classList.add("dark");
      localStorage.setItem("theme", "dark")
    }else{
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  },[darkMode])

  return (
    <div className={`${darkMode ? 'dark':''} bg-white overflow-hidden`}>
      <BrowserRouter>
      <AuthProvider>
          <Layout toggleTheme={()=> setDarkMode(!darkMode)} darkMode={darkMode}/>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
