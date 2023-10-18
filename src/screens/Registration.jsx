import React from "react";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

export const Registration = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActivetab] = useState("reg");
  const [vericode, setVericode] = useState("");
  const [cvericode, setCvericode] = useState("");

  let navigate = useNavigate();

  function handleVerify() {
    if (name == "") {
      toast.dark("নামের ঘর পূরণ করুন", {
        icon: "👤",
      });

      return false;
    }
    if (email == "") {
      toast.dark("ইমেইল লিখুন", {
        icon: "📧",
      });

      return false;
    }
    if (phone == "") {
      toast.dark("মোবাইল নাম্বার লিখুন", {
        icon: "📱",
      });

      return false;
    }
    if (password == "") {
      toast.dark("পাসওয়ার্ড দিন", {
        icon: "🔑",
      });

      return false;
    }
    if (password.length < 8) {
      toast.dark("কমপক্ষে ৮ অক্ষর বিশিষ্ট পাসওয়ার্ড ব্যবহার করুন", {
        icon: "🔑",
      });

      return false;
    }
    var otp = Math.floor(1000 + Math.random() * 9000);
    var msg = "আপনার আমানাহ মেট্রিমোনি ভেরিফিকেশন কোডটি হচ্ছে " + otp;
    setActivetab("verification");
    setVericode(otp);
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

  const registrationHandler = (e) => {
    e.preventDefault();
    if (vericode != cvericode) {
      toast.dark("Invalid verification code", {
        icon: "⚠️",
      });
      return false;
    }
    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("gender", gender);
    data.append("password", password);

    fetch(`${import.meta.env.VITE_SERVER}/adduser`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          localStorage.setItem("token", res.token);
          navigate("/profile");
        } else {
          toast.dark(res.alert, {
            icon: "⚠️",
          });
          setTimeout(() => {
            setActivetab("reg");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className="container p-lg-5 p-3">
        <div className="row px-lg-5 px-0 mt-3">
          <div className="col-lg-6 mx-auto px-lg-4 px-2">
            {activeTab == "reg" ? (
              <div className="login-card p-lg-5 p-3 mb-5">
                <p className="text-c2 font-lal text-center font-22 fw-600">
                  নতুন একাউন্ট তৈরি করুন
                </p>

                {/* Registration Form Starts */}

                <div className="form-group my-3">
                  <label className="font-lal font-16">আপনার নাম</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mr. Kashem"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group my-3">
                  <label className="font-lal font-16">আপনার ধরন</label>
                  <div className="d-flex">
                    <div className="form-check col-lg-6 col-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="male"
                        name="flexRadioDisabled"
                        id="flexRadioDisabled"
                        checked={gender === "male"}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      <label
                        className="form-check-label font-16 font-lal"
                        htmlFor="flexRadioDisabled"
                      >
                        পাত্র
                      </label>
                    </div>
                    <div className="form-check col-lg-6 col-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDisabled"
                        id="flexRadioCheckedDisabled"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      <label
                        className="form-check-label font-16 font-lal"
                        htmlFor="flexRadioCheckedDisabled"
                      >
                        পাত্রী
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group my-3">
                  <label className="font-lal font-16">ই-মেইল</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="mr.x@email.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

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
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <p className="font-14 font-lal py-2 mb-0">
                  সকল{" "}
                  <span>
                    <Link to={"/privacy"}>নীতিমালা এবং শর্তাদি</Link>
                  </span>{" "}
                  মেনে আমি একাউন্ট তৈরি করতে আগ্রহী
                </p>
                <button
                  type="submit"
                  onClick={handleVerify}
                  className="btn btn-search w-100 text-white mt-1 font-18 font-lal"
                >
                  একাউন্ট তৈরি করুন
                </button>

                {/* Registration Form Ends */}

                <div className="text-center my-4 mb-0 mx-5 border-top">
                  <p className="font-16 font-lal py-2 mb-0">
                    আপনার কি পূর্বের একাউন্ট আছে?
                  </p>
                </div>

                <Link to={"/login"}>
                  <button
                    type="submit"
                    className="btn btn-reg w-100 text-c2 mt-1 font-18 font-lal"
                  >
                    লগইন করুন
                  </button>
                </Link>
              </div>
            ) : null}
            {activeTab == "verification" ? (
              <div class="card-body row justify-content-center px-lg-5 px-3 pb-5 my-5">
                <div class="col-lg-12">
                  <small class="text-muted font-16 font-lal">
                    আপনার মোবাইল নম্বরে একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।
                    সঠিকভাবে ভেরিফিকেশন কোডটি প্রদান করুন।
                  </small>

                  <div class="col-lg-12 my-2">
                    <input
                      onChange={(e) => setCvericode(e.target.value)}
                      type="text"
                      class="form-control log-f-border"
                      placeholder="* * * *"
                      aria-label="Your email"
                    />
                  </div>

                  <button
                    onClick={registrationHandler}
                    class="btn btn-search text-white text-center w-100 log-btn font-lal"
                  >
                    ভেরিফাই করুন
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
