import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Registration } from "./screens/Registration";
import { Member } from "./screens/Member";
import { Profile } from "./screens/Profile";
import { Biodata } from "./screens/Biodata";
import { BiodataView } from "./screens/BiodataView";
import { Favlist } from "./screens/favlist";
import { ContactProcess } from "./screens/contactprocess";
import { Payment } from "./screens/payment";
import { Privacy } from "./screens/privacy";
import { Setting } from "./screens/setting";
import { Forgetpass } from "./screens/forgerpass";
import { About } from "./screens/about";
import { Error } from "./screens/error";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import "../src/App.css";
import "../src/Responsive.css";
import { BiodataMobile } from "./screens/Mobile/BiodataMobile";
import { Navbar } from "./components/Navbar2";

import { useState } from "react";
import { useEffect } from "react";
import { NavbarHome } from "./components/NavbarHome";
import { Testsms } from "./screens/testsms";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Error />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <Navbar />
                <Registration />
              </>
            }
          />
          <Route
            path="/member"
            element={
              <>
                <Navbar />
                <Member />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
          <Route
            path="/biodata"
            element={
              <>
                <Navbar />
                <Biodata />
              </>
            }
          />
          <Route
            path="/biodatamobile"
            element={
              <>
                <Navbar />
                <BiodataMobile />
              </>
            }
          />
          <Route
            path="/favlist"
            element={
              <>
                <Navbar />
                <Favlist />
              </>
            }
          />
          <Route
            path="/contactprocess"
            element={
              <>
                <Navbar />
                <ContactProcess />
              </>
            }
          />
          <Route
            path="/biodataView/groom/:id"
            element={
              <>
                <Navbar />
                <BiodataView />
              </>
            }
          />
          <Route
            path="/biodataView/bride/:id"
            element={
              <>
                <Navbar />
                <BiodataView />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Navbar />
                <Payment />
              </>
            }
          />
          <Route
            path="/setting"
            element={
              <>
                <Navbar />
                <Setting />
              </>
            }
          />
          <Route
            path="/forgetpass"
            element={
              <>
                <Navbar />
                <Forgetpass />
              </>
            }
          />
          <Route
            path="/test-otp"
            element={
              <>
                <Navbar />
                <Testsms />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Navbar />
                <Privacy />
              </>
            }
          />
        </Routes>
      </Router>
      {/* <MessengerCustomerChat
        pageId="792357987510184"
        appId="3511755989099187"
      /> */}
    </>
  );
}

export default App;
