import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const ProfileSide = () => {
  let navigate = useNavigate();

  var url = window.location.pathname;
  url = url.replace("https://amanahmatrimony.com/", "");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="col-lg-3  py-4 moboff">
        <div
          className={
            url == "/profile" ? "py-3 px-3 mb-1 activepnav" : " py-3 px-3 mb-1"
          }
        >
          <Link
            to={"/profile"}
            className="d-flex align-items-center font-lal nonedeco"
          >
            <i className="fa-regular fa-circle-user font-22"></i>
            <p className="mb-0 ms-3 font-18">হোম</p>
          </Link>
        </div>

        <div
          className={
            url == "/biodata" ? "py-3 px-3 mb-1 activepnav" : " py-3 px-3 mb-1"
          }
        >
          <Link
            to={"/biodata"}
            className="d-flex align-items-center font-lal nonedeco"
          >
            <i className="fa-regular fa-address-card font-22"></i>
            <p className="mb-0 ms-3 font-18">বায়োডাটা</p>
          </Link>
        </div>

        <div
          className={
            url == "/favlist" ? "py-3 px-3 mb-1 activepnav" : " py-3 px-3 mb-1"
          }
        >
          <Link
            to={"/favlist"}
            className="d-flex align-items-center font-lal nonedeco"
          >
            <i className="fa-regular fa-heart font-22"></i>
            <p className="mb-0 ms-3 font-18">পছন্দের তালিকা</p>
          </Link>
        </div>

        <div
          className={
            url == "/contactprocess"
              ? "py-3 px-3 mb-1 activepnav"
              : " py-3 px-3 mb-1"
          }
        >
          <Link
            to={"/contactprocess"}
            className="d-flex align-items-center font-lal nonedeco"
          >
            <i className="fa-regular fa-paper-plane font-22"></i>
            <p className="mb-0 ms-3 font-18">প্রস্তাব পাঠান</p>
          </Link>
        </div>

        <div
          className={
            url == "/setting" ? "py-3 px-3 mb-1 activepnav" : " py-3 px-3 mb-1"
          }
        >
          <Link
            to={"/setting"}
            className="d-flex align-items-center font-lal nonedeco"
          >
            <i className="fa-solid fa-sliders font-22"></i>
            <p className="mb-0 ms-3 font-18">সেটিংস</p>
          </Link>
        </div>

        <div
          className={
            url == "/privacy" ? "py-3 px-3 mb-1 activepnav" : " py-3 px-3 mb-1"
          }
        >
          <Link
            to={"/privacy"}
            className="d-flex align-items-center font-lal nonedeco"
          >
            <i className="fa-regular fa-flag font-22"></i>
            <p className="mb-0 ms-3 font-18">তথ্য নিরাপত্তা</p>
          </Link>
        </div>

        <div className="d-flex align-items-center text-secondary font-lal px-3 py-3 mb-1">
          <i className="fa-solid fa-arrow-right-from-bracket font-22"></i>
          <p
            onClick={logoutHandler}
            style={{ cursor: "pointer" }}
            className="mb-0 ms-3 font-18"
          >
            লগআউট
          </p>
        </div>
      </div>

      <div className="col-lg-3 col-12 border-bottom py-1 mobc">
        <div className="d-flex pt-1 mx-0 flex-fill justify-content-between">
          <div
            className={
              url == "/profile" ? "py-1  mb-0  activepnav" : "py-1  mb-0"
            }
          >
            <Link to={"/profile"} className="font-lal  nonedeco">
              <p className="mb-0 font-18 px-2">হোম</p>
            </Link>
          </div>

          <div
            className={
              url == "/biodatamobile" ? "py-1  mb-0  activepnav" : "py-1  mb-0"
            }
          >
            <Link to={"/biodatamobile"} className="font-lal  nonedeco">
              <p className="mb-0 font-18 px-2">বায়োডাটা</p>
            </Link>
          </div>

          <div
            className={
              url == "/favlist" ? "py-1  mb-0  activepnav" : "py-1  mb-0"
            }
          >
            <Link to={"/favlist"} className="font-lal  nonedeco">
              <p className="mb-0 font-18 px-2">ফেভারিট</p>
            </Link>
          </div>

          {/* <Link
            to={"/contactprocess"}
            className={
              url == "/"
                ? "font-lal py-1 px-3 mb-1 nonedeco activepnav"
                : "font-lal py-1 px-3 mb-1 nonedeco"
            }
          >
            <p className="mb-0 ms-3 font-18">প্রস্তাব পাঠান</p>
          </Link> */}

          <div
            className={
              url == "/setting" ? "py-1  mb-0  activepnav" : "py-1  mb-0"
            }
          >
            <Link to={"/setting"} className="font-lal  nonedeco">
              <p className="mb-0 font-18 px-2">সেটিংস</p>
            </Link>
          </div>

          {/* <Link
            to={"/"}
            className={
              url == "/"
                ? "font-lal py-1 px-3 mb-1 nonedeco activepnav"
                : "font-lal py-1 px-3 mb-1 nonedeco"
            }
          >
            <p className="mb-0 ms-3 font-18">নিরাপত্তা</p>
          </Link> */}
          {/* <div className="text-secondary font-lal  py-1 mb-1">
            <p
              onClick={logoutHandler}
              style={{ cursor: "pointer" }}
              className="mb-0 ms-3 font-18"
            >
              লগআউট
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};
