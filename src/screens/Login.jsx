import React from "react";
import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("phone", phone);
    data.append("password", password);

    fetch(`${import.meta.env.VITE_SERVER}/login`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message != false) {
          localStorage.setItem("token", res.token);
          navigate("/profile");
        } else {
          toast.dark(res.alert, {
            icon: "⚠️",
          });
        }
      })
      .catch((err) => navigate("*"));
  };

  return (
    <>
      <ToastContainer />
      <div className="container p-lg-5 p-3">
        <div className="row px-lg-5 px-0 mt-3">
          <div className="col-lg-6 col-12 mx-auto px-lg-4 px-2">
            <div className="login-card p-lg-5 p-4 mb-5">
              <p className="text-c2 font-lal text-center font-22 fw-600">
                একাউন্ট লগইন করুন{" "}
              </p>

              {/* Login Form Starts */}

              <form onSubmit={loginHandler}>
                <div className="form-group my-3">
                  <label className="font-lal font-16">মোবাইল নম্বর</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="017XXXXXXXX"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group my-3">
                  <label className="font-lal font-16">পাসওয়ার্ড</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*****"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="text-end">
                  <Link className="font-14 font-lal" to={"/forgetpass"}>
                    পাসওয়ার্ড ভুলে গিয়েছেন?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-search  w-100 text-white mt-1 font-18 font-lal"
                >
                  লগইন করুন
                </button>
              </form>

              {/* Login Form Ends */}

              <div className="text-center my-4 mb-0 mx-5 border-top">
                <p className="font-16 font-lal py-2 mb-0">
                  আপনার কি একাউন্ট নেই?
                </p>
              </div>

              <Link to={"/registration"}>
                <button
                  type="submit"
                  className="btn btn-reg w-100 text-c2 mt-1 font-18 font-lal"
                >
                  রেজিস্ট্রেশন করুন
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
