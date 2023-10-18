import React, { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { ProfileSide } from "../components/ProfileSide";
import { useNavigate } from "react-router-dom";
// import bioicon from "../assets/dossier.png";
// import wishicon from "../assets/wish-list.png";
// import mmail from "../assets/mmail.png";
// import dsecure from "../assets/dsecure.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../components/Loader";

export const Setting = () => {
  const [loginfo, setLoginInfo] = useState([]);
  const [activeTab, setActivetab] = useState("setting");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  const getLoginInfo = () => {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    fetch(`${import.meta.env.VITE_SERVER}/getMemberBytoken`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoginInfo(res.message[0]);
        setName(res.message[0].name);
        setEmail(res.message[0].email);
        setPhone(res.message[0].phone);
        setLoad(false);
        if (res.message[0].deactivate == 1) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const auth = () => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getLoginInfo();
    auth();
  }, []);

  function disablebtn() {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("password", password);
    fetch(`${import.meta.env.VITE_SERVER}/chkupdatepassandupdateuserinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setActivetab("setting");
          toast.dark("Your Account is Disabled", {
            icon: "⚠️",
          });
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.dark("Invalid Password ", {
            icon: "⚠️",
          });
          return false;
        }
      })
      .catch((err) => console.log(err));
  }

  function disableaccount() {
    document.getElementById("modalclick").click();
  }
  function godisable() {
    setActivetab("disableaccount");
  }
  function changename() {
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

    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    fetch(`${import.meta.env.VITE_SERVER}/updateuserdata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setActivetab("setting");
        } else {
          setActivetab("chgname");
          toast.dark("Something is wrong", {
            icon: "⚠️",
          });
          return false;
        }
      })
      .catch((err) => console.log(err));
  }
  function chkpassword() {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("password", password);
    fetch(`${import.meta.env.VITE_SERVER}/chkupdatepass`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setActivetab("chgname");
        } else {
          setActivetab("chkpass");
          toast.dark("Invalid Password ", {
            icon: "⚠️",
          });
          return false;
        }
      })
      .catch((err) => console.log(err));
    setActivetab("chkpass");
  }
  function chkchangepass() {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("password", password);
    fetch(`${import.meta.env.VITE_SERVER}/chkupdatepass`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          setActivetab("cpass");
        } else {
          setActivetab("chkchangepasstab");
          toast.dark("Invalid Password ", {
            icon: "⚠️",
          });
          return false;
        }
      })
      .catch((err) => console.log(err));
    setActivetab("chkchangepasstab");
  }
  function passHandle() {
    if (cpassword != rpassword) {
      toast.dark("Password do not match", {
        icon: "⚠️",
      });
      return false;
    }
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("password", cpassword);

    fetch(`${import.meta.env.VITE_SERVER}/uppassword`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message == null) {
          setActivetab("setting");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {load && <Loader />}

      {!load && (
        <>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            type="button"
            id="modalclick"
            style={{ display: "none" }}
          >
            Launch demo modal
          </button>
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog font-lal">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    অ্যাকাউন্ট ডিলিট
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body ">
                  আপনি কি অ্যাকাউন্ট ডিলিট করতে চান ?
                </div>
                <div class="modal-footer border-0">
                  <button
                    type="button"
                    class="btn w-25 btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    না
                  </button>
                  <button
                    type="button"
                    class="btn btn-search w-25 text-white mt-1 font-18 font-lal"
                    data-bs-dismiss="modal"
                    onClick={godisable}
                  >
                    হ্যাঁ
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
          <div className="container">
            <div className="row">
              <ProfileSide />
              <div className="col-lg-9 font-bosonto">
                <div className="row p-lg-4 p-2 my-5 mt-2 font-lal">
                  {activeTab == "chkpass" ? (
                    <div className="col-lg-6 col-12 login-card p-lg-5 p-3 my-5 mx-auto">
                      <p className="text-c2 font-lal text-center font-22 fw-600">
                        আপনার সত্যতা নিশ্চিত করুন
                      </p>
                      <small className="font-lal tex-muted">
                        ব্যক্তিগত রেজিস্ট্রেশন তথ্য পরিবর্তন করতে আপনার
                        পাসওয়ার্ড প্রদান করুন{" "}
                      </small>
                      <div className="form-group my-3">
                        <label className="font-lal font-16">পাসওয়ার্ড</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="********"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={chkpassword}
                        className="btn btn-search w-100 text-white mt-1 font-18 font-lal"
                      >
                        ভেরিফাই করুন
                      </button>
                    </div>
                  ) : null}
                  {activeTab == "chkchangepasstab" ? (
                    <div className="col-lg-6 col-12 login-card p-lg-5 p-3 my-5 mx-auto">
                      <p className="text-c2 font-lal text-center font-22 fw-600">
                        আপনার সত্যতা নিশ্চিত করুন
                      </p>
                      <small className="font-lal tex-muted">
                        ব্যক্তিগত রেজিস্ট্রেশন তথ্য পরিবর্তন করতে আপনার
                        পাসওয়ার্ড প্রদান করুন{" "}
                      </small>
                      <div className="form-group my-3">
                        <label className="font-lal font-16">পাসওয়ার্ড</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="********"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={chkchangepass}
                        className="btn btn-search w-100 text-white mt-1 font-18 font-lal"
                      >
                        ভেরিফাই করুন
                      </button>
                    </div>
                  ) : null}
                  {activeTab == "cpass" ? (
                    <div class="col-lg-6 col-12 login-card p-lg-5 p-3 my-5 mx-auto">
                      <p class="text-c2 font-lal text-center font-22 fw-600">
                        পাসওয়ার্ড পরিবর্তন করুন{" "}
                      </p>

                      <div class="col-lg-12 my-2">
                        <input
                          onChange={(e) => setCPassword(e.target.value)}
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
                        class="btn btn-search text-white text-center w-100 fw-bold log-btn font-lal"
                      >
                        পরিবর্তন করুন
                      </button>
                    </div>
                  ) : null}

                  {activeTab == "chgname" ? (
                    <div className="col-lg-6 col-12 login-card p-lg-5 p-3 my-5 mx-auto">
                      <p className="text-c2 font-lal text-center font-22 fw-600">
                        তথ্য পরিবর্তন করুন
                      </p>
                      <div className="form-group my-3">
                        <label className="font-lal font-16">আপনার নাম</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mr. Kashem"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          value={name}
                        />
                      </div>
                      <div className="form-group my-3">
                        <label className="font-lal font-16">আপনার ইমেইল</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Kashem@gmail.com"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                        />
                      </div>
                      <div className="form-group my-3">
                        <label className="font-lal font-16">
                          মোবাইল নাম্বার
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="+8801XXXXXXXXX"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={changename}
                        className="btn btn-search w-100 text-white mt-1 font-18 font-lal"
                      >
                        পরিবর্তন করুন
                      </button>
                    </div>
                  ) : null}

                  {activeTab == "setting" ? (
                    <>
                      <div class="col-lg-12 mb-3 ">
                        <p class="font-22 text-c2 mb-1 fw-700 font-bosonto">
                          ব্যক্তিগত তথ্য
                        </p>
                        <small className="font-16 moboff">
                          আপনার রেজিস্ট্রেশন তথ্য রয়েছে এখানে। সতর্কতা অবলম্বন
                          পূর্বক আপনার তথ্য পরিবর্তন করুন।
                        </small>
                        <small className="font-12 text-muted mobc">
                          আপনার রেজিস্ট্রেশন তথ্য রয়েছে এখানে। সতর্কতা অবলম্বন
                          পূর্বক আপনার তথ্য পরিবর্তন করুন।
                        </small>
                        <table class="table table-hover mt-3">
                          <tbody>
                            <tr>
                              <td
                                class="m-0 align-middle font-lal py-2 text-ass"
                                scope="row"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                আপনার নাম
                              </td>
                              <td>
                                <p
                                  class="m-0 align-middle text-dark py-2"
                                  style={{ fontSize: "16px" }}
                                >
                                  {loginfo.name}
                                </p>
                              </td>
                              <td
                                class="align-middle py-2"
                                onClick={chkpassword}
                                style={{ cursor: "pointer" }}
                              >
                                <i class="fas fa-chevron-right float-right text-dark"></i>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="m-0 align-middle font-lal py-2  text-ass"
                                scope="row"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                আপনার ইমেইল
                              </td>
                              <td>
                                <p
                                  class="m-0 align-middle text-dark py-2"
                                  style={{ fontSize: "16px" }}
                                >
                                  {loginfo.email}
                                </p>
                              </td>
                              <td class="align-middle py-2"></td>
                            </tr>
                            <tr>
                              <td
                                class="m-0 align-middle font-lal py-2  text-ass"
                                scope="row"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                মোবাইল নাম্বার
                              </td>
                              <td>
                                <p
                                  class="m-0 align-middle text-dark py-2"
                                  style={{ fontSize: "16px" }}
                                >
                                  {loginfo.phone}
                                </p>
                              </td>
                              <td class="align-middle py-2"></td>
                            </tr>
                            <tr style={{ border: "0px solid #fff" }}>
                              <td
                                class="m-0 align-middle font-lal py-2  text-ass"
                                scope="row"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                পাসকোড
                              </td>
                              <td>
                                <p
                                  class="m-0 align-middle text-dark py-2"
                                  style={{ fontSize: "16px" }}
                                >
                                  ***********
                                </p>
                              </td>
                              <td
                                class="align-middle py-2"
                                onClick={chkchangepass}
                                style={{ cursor: "pointer" }}
                              >
                                <i class="fas fa-chevron-right float-right text-dark"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-12">
                        <div className="border-0 rounded cproc_card p-3 d-flex justify-content-between align-items-start">
                          <div className="me-autoi">
                            <p class="font-lal font-18 mb-0 fw-600 text-c2 ">
                              অ্যাকাউন্ট ডিলিট করুন
                            </p>
                            <small>
                              আপনি যদি ১৫ দিনের মধ্যে লগইন না করেন তবে আপনার
                              অ্যাকাউন্ট মুছে ফেলা হবে
                            </small>
                          </div>

                          <button
                            className="btn font-16 fw-600 btn-danger font-lal text-white"
                            onClick={disableaccount}
                          >
                            ডিলিট অ্যাকাউন্ট
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {activeTab == "disableaccount" ? (
                    <>
                      <div className="col-lg-6 col-12 login-card p-lg-5 p-3 my-5 mx-auto">
                        <p className="text-c2 font-lal text-center font-22 fw-600">
                          আপনার সত্যতা নিশ্চিত করুন
                        </p>
                        <small className="font-lal tex-muted">
                          আপনি যদি ১৫ দিনের মধ্যে লগইন না করেন তবে আপনার
                          অ্যাকাউন্ট মুছে ফেলা হবে
                        </small>
                        <div className="form-group my-3">
                          <label className="font-lal font-16">পাসওয়ার্ড</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          onClick={disablebtn}
                          className="btn btn-search w-100 text-white mt-1 font-18 font-lal"
                        >
                          ভেরিফাই করুন
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};
