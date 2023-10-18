import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { ProfileSide } from "../components/ProfileSide";
import { Link, useNavigate } from "react-router-dom";
import bioicon from "../assets/dossier.png";
import wishicon from "../assets/wish-list.png";
import mmail from "../assets/mmail.png";
import dsecure from "../assets/dsecure.png";
import { Loader } from "../components/Loader";

export const Profile = () => {
  const [loginfo, setLoginInfo] = useState([]);
  const [personalinfo, setPersonalinfo] = useState([]);
  const [familyinfo, setFamilyinfo] = useState([]);
  const [eduinfo, setEduinfo] = useState([]);
  const [bio, setBio] = useState([]);
  const [contactinfo, setContactinfo] = useState([]);
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  const getInfo = () => {
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_SERVER}/getbiodata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setPersonalinfo(res.personalinfo[0]);
        setFamilyinfo(res.familyinfo[0]);
        setEduinfo(res.eduinfo[0]);
        setBio(res.bio[0]);
        setContactinfo(res.contactinfo[0]);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

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
    getInfo();
    getLoginInfo();
    auth();
  }, []);

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
                <div className="row p-lg-4 p-2 my-5 mt-lg-5 mt-3">
                  <div className="col-lg-12 text-center mx-auto">
                    <p className="font-22 text-c2 fw-700 font-bosonto">
                      স্বাগতম, {loginfo.name}
                    </p>
                  </div>
                  <div className="col-lg-6 mt-4 moboff">
                    <div className="phcard">
                      <div className="d-flex ">
                        <div className="col-lg-9 p-3">
                          <p className="font-22 text-c2 font-hind fw-500 mb-0">
                            বায়োডাটা
                          </p>
                          <small className="font-hind font-16">
                            নির্ভুল এবং সঠিক তথ্য দিয়ে আপনার বায়োডাটা তৈরি কিংবা
                            আপডেট করুন।
                          </small>
                          <br />
                          <Link to={"/biodata"}>
                            <small className="font-hind font-16">
                              বিস্তারিত
                            </small>
                          </Link>
                        </div>
                        <div className="col-lg-3 text-center mt-4">
                          <img src={bioicon} className="phicon" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-4 mobc">
                    <div className="phcard">
                      <div className="d-flex ">
                        <div className="col-lg-9 p-3">
                          <p className="font-22 text-c2 font-hind fw-500 mb-0">
                            বায়োডাটা
                          </p>
                          <small className="font-hind font-16">
                            নির্ভুল এবং সঠিক তথ্য দিয়ে আপনার বায়োডাটা তৈরি কিংবা
                            আপডেট করুন।
                          </small>
                          <br />
                          <Link to={"/biodatamobile"}>
                            <small className="font-hind font-16">
                              বিস্তারিত
                            </small>
                          </Link>
                        </div>
                        <div className="col-lg-3 text-center mt-4">
                          <img src={bioicon} className="phicon" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-4">
                    <div className="phcard">
                      <div className="d-flex ">
                        <div className="col-lg-9 p-3">
                          <p className="font-22 text-c2 font-hind fw-500 mb-0">
                            পছন্দের পাত্র/পাত্রী
                          </p>
                          <small className="font-hind font-16">
                            পছন্দের তালিকা গুলো যাচাই করে নিজের জীবনসঙ্গী বাছাই
                            করুন।
                          </small>
                          <br />
                          <Link to={"/favlist"}>
                            <small className="font-hind font-16">
                              বিস্তারিত
                            </small>
                          </Link>
                        </div>
                        <div className="col-lg-3 text-center mt-4">
                          <img src={wishicon} className="phicon" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mt-4">
                    <div className="phcard">
                      <div className="d-flex ">
                        <div className="col-lg-9 p-3">
                          <p className="font-22 text-c2 font-hind fw-500 mb-0">
                            প্রস্তাব পাঠান
                          </p>
                          <small className="font-hind font-16">
                            পছন্দের পাত্র/পাত্রীর সাথে যোগাযোগ করতে আমানাহ
                            মেট্রিমোনির সহায়তা নিন।
                          </small>
                          <br />
                          <Link to={"/contactprocess"}>
                            <small className="font-hind font-16">
                              বিস্তারিত
                            </small>
                          </Link>
                        </div>
                        <div className="col-lg-3 text-center mt-4">
                          <img src={mmail} className="phicon" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mt-4">
                    <div className="phcard">
                      <div className="d-flex ">
                        <div className="col-lg-9 p-3">
                          <p className="font-22 text-c2 font-hind fw-500 mb-0">
                            তথ্য নিরাপত্তা
                          </p>
                          <small className="font-hind font-16">
                            আপনার তথ্য গুলোর শতভাগ নিরাপত্তা প্রদানে আমানাহ
                            মেট্রিমোনি অঙ্গীকারবদ্ধ।
                          </small>
                          <br />
                          <Link to={"/privacy"}>
                            <small className="font-hind font-16">
                              বিস্তারিত
                            </small>
                          </Link>
                        </div>
                        <div className="col-lg-3 text-center mt-4">
                          <img src={dsecure} className="phicon" />
                        </div>
                      </div>
                    </div>
                  </div>
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
