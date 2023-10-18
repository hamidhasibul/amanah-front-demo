import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { ProfileSide } from "../components/ProfileSide";
import { TagsInput } from "react-tag-input-component";
import N from "../assets/Nagad.png";
import B from "../assets/Bkash.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Payment = () => {
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("");
  const [payment, setPayment] = useState("");
  const [trxid, setTrxid] = useState("");

  function makepayment(e) {
    e.preventDefault();

    const data = new FormData();

    data.append("biodata", selected);
    data.append("name", name);
    data.append("phone", phone);
    data.append("method", method);
    data.append("pnumber", payment);
    data.append("trxid", trxid);
    fetch(`${import.meta.env.VITE_SERVER}/payment`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toast.success("ধন্যবাদ !", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });
        } else {
          alert(err);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row ">
          <div className="col-lg-8 pt-5 offset-2">
            <div className="login-card p-5 mb-5">
              <p className="text-c2 font-lal text-start font-22 fw-600">
                প্রস্তাব পাঁঠাতে বায়ডাটার যোগাযোগ তথ্য জানুন
              </p>

              {/* Registration Form Starts */}
              <form onSubmit={makepayment} className="row">
                <div className="col-3">
                  <label className="font-lal font-16 py-4">
                    বায়োডাটা নম্বর
                  </label>
                </div>
                <div className="col-9">
                  <div className="form-group my-3">
                    <TagsInput
                      value={selected}
                      onChange={setSelected}
                      name="বায়োডাটা নম্বর"
                      placeHolder="AM102"
                    />
                  </div>
                </div>
                <div className="col-3">
                  <label className="font-lal font-16 py-4">আপনার নাম</label>
                </div>
                <div className="col-9">
                  <div className="form-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mr. Kashem"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-3">
                  <label className="font-lal font-16 py-4">মোবাইল নম্বর</label>
                </div>
                <div className="col-9">
                  <div className="form-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="017XXXXXXXX"
                      min={11}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-3">
                  <label className="font-lal font-16 py-4">পেমেন্ট মেথড</label>
                </div>
                <div className="col-9">
                  <div className="form-group my-3 font-lal">
                    <ul
                      class="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <input
                          class="form-check-input d-none"
                          type="radio"
                          data-bs-toggle="pill"
                          data-bs-target="#bkash"
                          role="tab"
                          aria-controls="pills-home"
                          value="bkash"
                          checked={method === "bkash"}
                          onChange={(e) => {
                            setMethod(e.target.value);
                          }}
                          aria-selected="true"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label for="flexRadioDefault1">
                          <img src={B} alt="I'm sad" className="chk-img px-2" />
                        </label>
                      </li>
                      <li class="nav-item" role="presentation">
                        <input
                          class="form-check-input d-none"
                          type="radio"
                          data-bs-toggle="pill"
                          data-bs-target="#nogod"
                          role="tab"
                          aria-controls="pills-profile"
                          value="nogod"
                          checked={method === "nogod"}
                          onChange={(e) => {
                            setMethod(e.target.value);
                          }}
                          aria-selected="false"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label for="flexRadioDefault2">
                          <img
                            src={N}
                            alt="I'm sad"
                            className="chk-img px-2 ms-2"
                          />
                        </label>
                      </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="bkash"
                        role="tabpanel"
                        aria-labelledby="pills-bkash-tab"
                      >
                        <div className="row">
                          <div className="col-4">
                            <p class="placeholder-glow">
                              <span class="placeholder col-12 py-5 rounded bg-danger"></span>
                            </p>
                          </div>
                          <div className="col-4">
                            <p class="placeholder-glow">
                              <span class="placeholder col-12 py-5 rounded bg-danger"></span>
                            </p>
                          </div>
                          <div className="col-4">
                            <p class="placeholder-glow">
                              <span class="placeholder col-12 py-5 rounded bg-danger"></span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="nogod"
                        role="tabpanel"
                        aria-labelledby="pills-nogod-tab"
                      >
                        <div className="row">
                          <div className="col-4">
                            <p class="placeholder-glow">
                              <span class="placeholder col-12 py-5 rounded bg-warning"></span>
                            </p>
                          </div>
                          <div className="col-4">
                            <p class="placeholder-glow">
                              <span class="placeholder col-12 py-5 rounded bg-warning"></span>
                            </p>
                          </div>
                          <div className="col-4">
                            <p class="placeholder-glow ">
                              <span class="placeholder col-12 py-5 rounded bg-warning"></span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-3">
                  <label className="font-lal font-16 py-4">পেমেন্ট নম্বর</label>
                </div>
                <div className="col-4">
                  <div className="form-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="017XXXXXXXX"
                      onChange={(e) => {
                        setPayment(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-2">
                  <label className="font-lal font-16 py-4">TrX ID</label>
                </div>
                <div className="col-3">
                  <div className="form-group my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="66666AAAAA"
                      onChange={(e) => {
                        setTrxid(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-9 offset-3">
                  <button
                    type="submit"
                    className="btn btn-search w-100 text-white mt-1 font-18 font-lal"
                  >
                    সাবমিট করুণ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
