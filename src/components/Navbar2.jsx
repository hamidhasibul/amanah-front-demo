import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SideModal } from "./modal/SideModal";

export const Navbar = () => {
  const [userinfo, setUserInfo] = useState([]);
  const [logged, setLogged] = useState(false);
  const [load, setLoad] = useState(true);

  let url = window.location.pathname;

  const getUserInfo = () => {
    const data = new FormData();

    let token = localStorage.getItem("token");

    token === null ? setLogged(false) : setLogged(true);

    data.append("token", token);

    fetch(`${import.meta.env.VITE_SERVER}/getMemberBytoken`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res.message[0]);
        setLoad(false);
      })
      .catch((err) => navigate("*"));
  };

  useEffect(() => {
    getUserInfo();
  }, [localStorage.getItem("token")]);

  return (
    <>
      {!load && (
        <>
          <nav
            className={
              url === "/about"
                ? "navbar bg-white navbar-expand font-hind font-16 moboff"
                : "navbar bg-white navbar-expand shadow-sm font-hind font-16 moboff"
            }
          >
            <div className="container-lg py-0 align-items-center">
              <Link className="navbar-brand" to={"/"}>
                <img src={logo} className="main-logo" />
              </Link>
              <li className="d-flex">
                <Link className="nav-link me-5 my-auto text-c2" to={"/"}>
                  হোম
                </Link>
                <Link className="nav-link me-5 my-auto text-c2" to={"/member"}>
                  পাত্র-পাত্রী
                </Link>
                <Link className="nav-link me-5 my-auto text-c2" to={"/about"}>
                  আমাদের সম্পর্কে
                </Link>
                {logged ? (
                  <Link
                    className="btn font-16 fw-600 btn-signup text-white"
                    to={"/profile"}
                  >
                    {userinfo ? <>{userinfo.name}</> : <></>}
                  </Link>
                ) : (
                  <>
                    <Link className="btn font-16 btn-login me-4" to={"/login"}>
                      লগইন
                    </Link>
                    <Link
                      className="btn font-16 fw-600 btn-signup text-white"
                      to={"/registration"}
                    >
                      রেজিস্ট্রেশন
                    </Link>
                  </>
                )}
              </li>
            </div>
          </nav>

          {/* Mobile Section */}

          <nav className="navbar bg-white navbar-expand shadow-sm font-hind font-16 mobc">
            <div className="container-lg py-0 px-3 align-items-center">
              <Link className="navbar-brand" to={"/"}>
                <img src={logo} className="main-logo" />
              </Link>
              <button
                class="btn rounded "
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNav"
                aria-controls="offcanvas"
              >
                <i
                  class="fa-solid fa-bars font-22"
                  style={{ color: "#009933" }}
                ></i>
              </button>
            </div>
          </nav>
          <SideModal logged={logged} userinfo={userinfo} />
        </>
      )}
    </>
  );
};
