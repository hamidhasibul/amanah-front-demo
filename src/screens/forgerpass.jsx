import React from "react";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

export const Forgetpass = () => {
  const [phone, setPhone] = useState("");
  const [activeTab, setActivetab] = useState("phone");
  const [vericode, setVericode] = useState("");
  const [cvericode, setCvericode] = useState("");

  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  let navigate = useNavigate();

  function sendOtp(msg) {
    const data = new FormData();
    data.append("phone", phone);
    data.append("msg", msg);

    fetch(`${import.meta.env.VITE_SERVER}/send-otp`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  function submitHandle() {
    if (phone == "") {
      toast.dark("Phone is empty", {
        icon: "📧",
      });

      return false;
    }

    const data = new FormData();
    data.append("mobile", phone);

    fetch(`${import.meta.env.VITE_SERVER}/Otpmsg`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message != true) {
          toast.dark(res.message, {
            icon: "⚠️",
          });
        } else {
          setActivetab("verification");
          var otp = Math.floor(1000 + Math.random() * 9000);
          var msg = "আপনার আমানাহ মেট্রিমোনি ভেরিফিকেশন কোডটি হচ্ছে " + otp;
          setVericode(otp);
          sendOtp(msg);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleVerify() {
    if (vericode == cvericode) {
      setActivetab("cpass");
    } else {
      toast.dark("Invalid verification code", {
        icon: "⚠️",
      });
    }
  }

  function passHandle() {
    if (password != rpassword) {
      toast.dark("Password do not match", {
        icon: "⚠️",
      });
      return false;
    }

    const data = new FormData();
    data.append("password", password);
    data.append("phone", phone);

    fetch(`${import.meta.env.VITE_SERVER}/uppassOtp`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == null) {
          localStorage.setItem("token", res.token);
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer />
      <div class="container-fluid my-5 ">
        <div class="row px-0 mx-0">
          <center class="my-lg-5 my-3">
            <div class="col-lg-4 col-12">
              <div class="card rounded-0 py-3">
                {activeTab == "phone" ? (
                  <div class="card-body px-lg-5 px-3">
                    <small class="text-muted font-lal font-18">
                      আপনার মোবাইল নাম্বার লিখুন; আপনার মোবাইল নম্বরে একটি OTP
                      পাঠানো হবে।
                    </small>

                    <div class="col-lg-12 my-2 mb-3">
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        type="phone"
                        class="form-control log-f-border"
                        placeholder="01XXXXXXXXX"
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={submitHandle}
                      class="btn btn-success text-center w-100 fw-bold log-btn font-lal"
                    >
                      পরবর্তী ধাপ
                    </button>
                  </div>
                ) : null}

                {activeTab == "verification" ? (
                  <div class="card-body px-lg-5 px-3">
                    <p class="text-muted font-lal font-18">
                      আপনার মোবাইল নাম্বারে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।
                    </p>

                    <div class="col-lg-12 my-2 mb-3">
                      <input
                        onChange={(e) => setCvericode(e.target.value)}
                        type="text"
                        class="form-control log-f-border"
                        placeholder="* * * *"
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={handleVerify}
                      class="btn btn-success text-center w-100 fw-bold log-btn font-lal"
                    >
                      ভেরিফাই করুন
                    </button>
                  </div>
                ) : null}

                {activeTab == "cpass" ? (
                  <div class="card-body px-lg-5 px-3">
                    <p class="text-muted">পাসওয়ার্ড পরিবর্তন করুন </p>

                    <div class="col-lg-12 my-2">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        class="form-control log-f-border"
                        placeholder="নতুন পাসওয়ার্ড দিন"
                        aria-label="Your email"
                      />
                    </div>

                    <div class="col-lg-12 my-2 mb-3">
                      <input
                        onChange={(e) => setRpassword(e.target.value)}
                        type="password"
                        class="form-control log-f-border"
                        placeholder="পুনরায় লিখুন "
                        aria-label="Your email"
                      />
                    </div>

                    <button
                      onClick={passHandle}
                      class="btn btn-success text-center w-100 fw-bold log-btn font-lal"
                    >
                      পরিবর্তন করুন
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </center>
        </div>
      </div>
      <Footer />
    </>
  );
};
