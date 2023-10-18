import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "../components/Footer";
import { ProfileSide } from "../components/ProfileSide";
import { Link, useNavigate } from "react-router-dom";

import { Loader } from "../components/Loader";

export const Favlist = () => {
  const [flist, setFlist] = useState([]);
  const [load, setLoad] = useState(true);
  const [update, setUpdate] = useState(0);

  const navigate = useNavigate();

  const calcAge = (dob) => {
    let date = new Date();
    let currentYear = date.getFullYear();

    let birthDate = new Date(dob);
    let birthYear = birthDate.getFullYear();

    return currentYear - birthYear;
  };

  const getfavlistitem = () => {
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_SERVER}/getfavlist`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setFlist(res.msg);
        setLoad(false);
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
    getfavlistitem();
    auth();
  }, [update]);

  function deletefavlist(e) {
    const data = new FormData();
    data.append("id", e);
    fetch(`${import.meta.env.VITE_SERVER}/dltfavlist`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == null) {
          toast.warning("রিমুভ করা হয়েছে", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        }
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {load && (
        <>
          <Loader />
        </>
      )}

      {!load && (
        <>
          <div className="container">
            <div className="row">
              <ProfileSide />
              <div className="col-lg-9">
                <div className="row p-lg-4 p-2 my-5 mt-2 font-lal">
                  <div className="col-lg-12 mb-3">
                    <p className="font-22 text-c2 mb-1 fw-700 font-bosonto">
                      পছন্দের বায়োডাটা সমূহ
                    </p>
                    <small className="font-16 moboff">
                      আপনার পছন্দের বায়োডাটা গুলো এখানে সংরক্ষণ করুন। পরবর্তী
                      প্রয়োজনে সঠিকভাবে ব্যাক্তিগত ভাবে বায়োডাটার তথ্য যাচাই এবং
                      বিস্তারিত খোঁজ খবর নিন।
                    </small>
                    <small className="font-12 text-muted mobc">
                      আপনার পছন্দের বায়োডাটা গুলো এখানে সংরক্ষণ করুন। পরবর্তী
                      প্রয়োজনে সঠিকভাবে ব্যাক্তিগত ভাবে বায়োডাটার তথ্য যাচাই এবং
                      বিস্তারিত খোঁজ খবর নিন।
                    </small>
                  </div>

                  {flist.length == 0 ? (
                    <>
                      <div className="container moboff">
                        <div class="statusbarp text-center mb-2">
                          <p class="verifyp">সংরক্ষিত বায়োডাটা নেই</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="col-lg-12 bg-light rounded moboff">
                        <div className="row fw-600 text-center border-bottom py-1">
                          <div className="col-lg-3 col-3">বায়োডাটা আইডি</div>
                          <div className="col-lg-1 col-1">বয়স</div>
                          <div className="col-lg-3 col-3">পেশা</div>
                          <div className="col-lg-2 col-2">জেলা</div>
                          <div className="col-lg-3 col-3">আপডেট</div>
                        </div>
                        {flist.map((bio) => (
                          <div
                            className=" rounded my-2 shadow-sm mx-0 bg-white"
                            key={bio.lpid}
                          >
                            <div className="row text-center py-1 align-items-center">
                              <div className="col-lg-3 justify-content-center d-flex align-items-center">
                                <img
                                  src={
                                    `${import.meta.env.VITE_IMG}` +
                                    bio.avater +
                                    `.png`
                                  }
                                  class="member_img2"
                                />
                                <small className="m-0 ms-3 rounded-pill bg-light shadow-sm px-3">
                                  AM{bio.lpid}
                                </small>
                              </div>
                              <div className="col-lg-1">
                                {" "}
                                {calcAge(bio.dob).toLocaleString("bn-BD")}
                              </div>
                              <div className="col-lg-3">{bio.occupation}</div>
                              <div className="col-lg-2">{bio.district}</div>
                              <div className="col-lg-3 d-flex justify-content-center align-items-center">
                                <Link
                                  className="btn rounded-pill bg-light shadow-sm font-lal"
                                  to={`/biodataview/${bio.lpid}`}
                                >
                                  <i class="fa-solid fa-eye text-c2"></i> দেখুন
                                </Link>
                                <i
                                  class="fa-solid fa-trash text-secondary ms-3"
                                  onClick={(e) => {
                                    deletefavlist(bio.id);
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Mobile View */}

                  {flist.length == 0 ? (
                    <>
                      <div className="container mobc">
                        <div class="statusbarp text-center mb-2">
                          <p class="verifyp">সংরক্ষিত বায়োডাটা নেই</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="col-lg-12  mobc">
                        {flist.map((bio) => (
                          <div
                            className="container rounded my-2 border py-1 mx-0 bg-white"
                            key={bio.lpid}
                          >
                            <div className="row text-center py-1 align-items-center">
                              <div className="col-3 justify-content-center">
                                <img
                                  src={
                                    `${import.meta.env.VITE_IMG}` +
                                    bio.avater +
                                    `.png`
                                  }
                                  class="member_img2"
                                />
                                <small className="m-0 rounded-pill bg-light shadow-sm px-3">
                                  AM{bio.lpid}
                                </small>
                              </div>
                              <div className="col-6 text-start">
                                <p className="mb-0 font-14">
                                  <span className="text-secondary">বয়সঃ </span>
                                  {calcAge(bio.dob).toLocaleString("bn-BD")} বছর
                                </p>
                                <p className="mb-0 font-14">
                                  <span className="text-secondary">পেশাঃ </span>
                                  {bio.occupation}
                                </p>
                                <p className="mb-0">
                                  {" "}
                                  <span className="text-secondary">জেলাঃ </span>
                                  {bio.district}
                                </p>
                              </div>
                              <div className="col-2 d-flex align-items-center">
                                <Link
                                  className="btn rounded-pill bg-light shadow-sm font-lal"
                                  to={`/biodataview/${bio.lpid}`}
                                >
                                  <i class="fa-solid fa-eye text-c2 font-14"></i>
                                </Link>
                                <i
                                  class="fa-solid fa-trash font-12 ms-2 text-secondary"
                                  onClick={(e) => {
                                    deletefavlist(bio.id);
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
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
