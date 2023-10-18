import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export const SideModal = ({ logged, userinfo }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div
        class="offcanvas mobc w-75 offcanvas-start"
        tabindex="-1"
        id="offcanvasNav"
        data-bs-scroll="true"
        aria-labelledby="offcanvasLabel"
      >
        <button
          type="button"
          class="btn-close"
          id="cls"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          style={{ display: "none" }}
        ></button>
        <div class="offcanvas-body text-start font-lal">
          <Link
            className="navbar-brand"
            onClick={() => {
              document.getElementById("cls").click();
            }}
          >
            <img src={logo} className="main-logo" />
          </Link>
          <div className="mt-4"></div>
          <Link
            className="nav-link me-5 my-3 text-c2"
            to={"/"}
            onClick={() => {
              document.getElementById("cls").click();
            }}
          >
            হোম
          </Link>
          <Link
            className="nav-link me-5 my-3 text-c2"
            to={"/member"}
            onClick={() => {
              document.getElementById("cls").click();
            }}
          >
            পাত্র-পাত্রী
          </Link>
          <Link
            className="nav-link me-5 my-3 text-c2"
            to={"/about"}
            onClick={() => {
              document.getElementById("cls").click();
            }}
          >
            আমাদের সম্পর্কে
          </Link>
          {logged ? (
            <>
              <Link
                className="btn font-16 fw-600 btn-signup text-white"
                to={"/profile"}
                onClick={() => {
                  document.getElementById("cls").click();
                }}
              >
                <i className="fa-solid fa-user me-2"></i>
                {userinfo ? <>{userinfo.name}</> : <></>}
              </Link>

              <div className="d-flex align-items-center text-muted font-lal py-3 mb-1">
                <div className="col-lg-2 text-center">
                  <i className="fa-solid fa-arrow-right-from-bracket font-14"></i>
                </div>

                <p
                  style={{ cursor: "pointer" }}
                  className="mb-0 ms-2 font-15"
                  onClick={() => {
                    document.getElementById("cls").click();
                    logoutHandler(  );
                  }}
                >
                  লগআউট
                </p>
              </div>
            </>
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
          <div style={{ position: "fixed", bottom: 5 }}>
            <p className="text-muted mb-0" style={{ fontSize: 10 }}>
              Amanah Matrimony © All rights reserved 2023
            </p>
            <p className="text-muted" style={{ fontSize: 10 }}>
              Assembled By mPair Technologies Ltd.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
