import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import nolove from "../assets/nolove.png";
import loveadd from "../assets/loveadd.png";
import verified from "../assets/approved.png";
import CopyToClipboardButton from "../components/copyurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BiodataView = () => {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [familyInfo, setFamilyInfo] = useState([]);
  const [eduInfo, setEduInfo] = useState([]);
  const [bioInfo, setBioInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [commitmentInfo, setCommitmentInfo] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [flist, setFlist] = useState([]);
  const [verifiedList, setVerifiedList] = useState([]);
  const [felist, setFelist] = useState([]);
  const [update, setUpdate] = useState(0);
  const [userinfo, setUserInfo] = useState([]);
  const params = useParams();
  const { id } = params;
  let navigate = useNavigate();

  {
    userinfo.gender == "female" ? (
      <>AF{personalInfo.userid}</>
    ) : (
      <>AM{personalInfo.userid}</>
    );
  }

  const title = ` ${
    userinfo.gender === "male"
      ? `পাত্র আইডিঃ AM${personalInfo.userid}`
      : `পাত্রী আইডিঃ AF${personalInfo.userid}`
  } | আমানাহ মেট্রিমোনি । বাংলাদেশী মুসলিম ম্যারেজ মিডিয়া `;

  const useTitle = () => {
    useEffect(() => {
      document.title = `${title} `;
    }, [title]);
  };

  useTitle();

  const newId = id.slice(2);

  const getAllInfo = () => {
    const data = new FormData();

    data.append("id", newId);

    fetch(`${import.meta.env.VITE_SERVER}/getsinglebiodata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg == false) {
          navigate("*");
        } else {
          setPersonalInfo(res.personalinfo[0]);
          setFamilyInfo(res.familyinfo[0]);
          setEduInfo(res.eduinfo[0]);
          setBioInfo(res.bio[0]);
          setContactInfo(res.contactinfo[0]);
          setCommitmentInfo(res.commitment[0]);
          setAvatar(res.avater[0]);
        }
      })
      .catch((err) => console.log(err));
  };
  const calcAge = (dob) => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let birthDate = new Date(dob);
    let birthYear = birthDate.getFullYear();

    return currentYear - birthYear;
  };
  const getflist = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getfbio`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFelist(res.msg);
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (dob) => {
    let currentDate = new Date(dob);
    let day = currentDate.getDate();

    let month = currentDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let year = currentDate.getFullYear();

    return `${Number(year).toLocaleString("bn-BD").replace(",", "")}`;
  };

  const getverifiedlist = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getverifiedbio`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setVerifiedList(res.msg);
      })
      .catch((err) => console.log(err));
  };

  const getlikeinfo = () => {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("lid", newId);
    data.append("token", token);

    fetch(`${import.meta.env.VITE_SERVER}/getliked`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setFlist(res.message[0]);
      })
      .catch((err) => console.log(err));
  };

  const getUserInfo = () => {
    const data = new FormData();
    data.append("id", newId);
    fetch(`${import.meta.env.VITE_SERVER}/getMemberByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res.message[0]);
      })
      .catch((err) => console.log(err));
  };

  const viewHandler = () => {
    setUpdate(update + 1);
  };

  useEffect(() => {
    getUserInfo();
    getAllInfo();
    getlikeinfo();
    getflist();
    getverifiedlist();
  }, [update]);

  function deletefavlist() {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("lpid", newId);
    fetch(`${import.meta.env.VITE_SERVER}/dltfavlistbio`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == null) {
          toast.warning("আনফলো করা হয়েছে", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });
        } else {
          console.log(err);
        }
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }

  function favusersub(e) {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (!token) {
      toast.success("You Must Login First ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return false;
    }
    const data = new FormData();

    data.append("token", token);
    data.append("favuser", newId);
    fetch(`${import.meta.env.VITE_SERVER}/addlike`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          toast.success("ফলো করা হয়েছে ", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });
        }

        setUpdate(update + 1);
        setload(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="container">
        <div className="row pt-3 pt-lg-5">
          <div className="col-lg-9 my-lg-5 mt-0">
            <div className="member-cardb position-relative pt-lg-5 pt-0 pb-2">
              {/* Desktop Version */}

              <div className="moboff">
                <div className="d-flex member_main">
                  <div className="text-center">
                    {avatar == null ? null : (
                      <>
                        {avatar.avater != "" ? (
                          <>
                            <img
                              src={
                                `${import.meta.env.VITE_IMG}` +
                                avatar.avater +
                                `.png`
                              }
                              className="member_imgLG"
                              alt=""
                            />
                          </>
                        ) : (
                          <>
                            {userinfo.gender == "male" ? (
                              <>
                                <img
                                  src={`${import.meta.env.VITE_IMG}` + `4.png`}
                                  className="member_imgLG"
                                  alt=""
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src={`${import.meta.env.VITE_IMG}` + `1.png`}
                                  className="member_imgLG"
                                  alt=""
                                />
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="p-2 meber_id_pos">
                    <div className="d-flex align-items-center justify-content-between">
                      {userinfo?.vstatus === "1" && (
                        <p className="verybatch mb-0">
                          <i className="fa-solid fa-shield font-12"></i>{" "}
                          Verified
                        </p>
                      )}
                    </div>
                    <div className="px-3 mt-2 py-1 member_id_no2">
                      <p className="mb-0 font-16 font-bosonto fw-500">
                        {userinfo.gender === "male" ? "পাত্র" : "পাত্রী"} আইডিঃ{" "}
                        <span className="fw-bold">
                          {userinfo.gender == "female" ? (
                            <>AF{personalInfo.userid}</>
                          ) : (
                            <>AM{personalInfo.userid}</>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="favoritePosition d-flex">
                  {flist == null ? (
                    <img
                      src={nolove}
                      className="fovorite ms-3 pointer"
                      onClick={favusersub}
                    />
                  ) : flist.lpid === personalInfo.userid ? (
                    <>
                      <img
                        src={loveadd}
                        className="fovorite ms-3  pointer"
                        onClick={deletefavlist}
                      />
                    </>
                  ) : (
                    <img
                      src={nolove}
                      className="fovorite ms-3 pointer"
                      onClick={favusersub}
                    />
                  )}

                  <CopyToClipboardButton />
                </div>
              </div>

              {/* Mobile Version  */}

              <div className="mobc">
                <div className="d-flex p-3">
                  <div className="text-center">
                    {avatar == null ? (
                      <></>
                    ) : (
                      <img
                        src={
                          `${import.meta.env.VITE_IMG}` + avatar.avater + `.png`
                        }
                        className="member_imgLG"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="p-2">
                    <div className="mt-1">
                      <div className="d-flex align-items-center justify-content-between">
                        {userinfo?.vstatus === "1" && (
                          <p className="verybatch mb-1">
                            <img src={verified} className="f_icon me-1" />
                            Verified
                          </p>
                        )}
                      </div>
                      <div className="px-3 py-1 member_id_no2">
                        <p className="mb-0 font-16 font-bosonto fw-500">
                          আইডিঃ{" "}
                          <span className="fw-bold">
                            {userinfo.gender == "female" ? (
                              <>AF{personalInfo.userid}</>
                            ) : (
                              <>AM{personalInfo.userid}</>
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex pt-2 align-items-center">
                      <div className="pt-0">
                        {flist == null ? (
                          <div className="rounded-pill btn-down2  py-1 shadow-sm bg-white">
                            <img
                              src={nolove}
                              className="fovorite px-1 pointer"
                              onClick={favusersub}
                            />
                          </div>
                        ) : flist.lpid === personalInfo.userid ? (
                          <>
                            <div className="rounded-pill btn-down2  py-1 shadow-sm bg-white">
                              <img
                                src={loveadd}
                                className="fovorite px-1 pointer"
                                onClick={deletefavlist}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="d-flex  rounded btn-down2  pt-1  px-2 shadow-sm bg-white">
                            <p className="mb-0">ফলো করুন</p>
                            <img
                              src={nolove}
                              className="fovorite ms-3 pointer"
                              onClick={favusersub}
                            />
                          </div>
                        )}
                      </div>
                      <div className=" ms-2">
                        <CopyToClipboardButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info Section */}

              <div className="pt-lg-4 pt-1">
                <div className="member_id_no border m-3 mt-lg-5 mt-2">
                  <div className="border-bottom bg-bh bio_title">
                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                      ব্যাক্তিগত তথ্য
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        জন্মসাল
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {formatDate(personalInfo.dob)}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        উচ্চতা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {personalInfo.height}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        ওজন
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {Number(personalInfo.weight) ? (
                          <>
                            {Number(personalInfo.weight).toLocaleString(
                              "bn-BD"
                            )}
                            কেজি
                          </>
                        ) : (
                          <>{personalInfo.weight} কেজি </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        গায়ের রং
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {personalInfo.color}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        বৈবাহিক অবস্থা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2 font-hind">
                        {personalInfo.mstatus}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        রক্তের গ্রুপ
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {personalInfo.bloodgroup}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-end border-bottomc">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        জেলা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0  font-16 font-lal px-3 py-2">
                        {personalInfo.district}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-end border-bottomc">
                      <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                        বর্তমান ঠিকানা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7">
                      <p className="mb-0  font-16 font-lal border-bottomc px-3 py-2">
                        {personalInfo.presentaddress}
                      </p>
                    </div>
                  </div>
                  {userinfo.gender == "female" ? (
                    <div className="d-flex">
                      <div className="col-lg-4 col-5 border-bottomc border-end">
                        <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                          পর্দার ধরন
                        </p>
                      </div>
                      <div className="col-lg-8 col-7 border-bottomc">
                        <p className="mb-0  font-16 font-lal px-3 py-2">
                          {personalInfo.pordaType}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <div className="col-lg-4 col-5 border-bottomc border-end">
                        <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                          দাঁড়ি আছে কিনা
                        </p>
                      </div>
                      <div className="col-lg-8 col-7 border-bottomc">
                        <p className="mb-0 font-16 font-lal px-3 py-2">
                          {personalInfo.dari}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                        মাজহাব / মানহাজ
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {personalInfo.mazhub}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                        রাজনৈতিক দৃষ্টিভঙ্গি
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {personalInfo.politics}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-end">
                      <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                        নিজের সম্পর্কে
                      </p>
                    </div>
                    <div className="col-lg-8">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {personalInfo.selfinfo}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Info Section */}

              <div className="pt-1">
                <div className="member_id_no border m-3">
                  <div className="border-bottom bg-bh bio_title">
                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                      শিক্ষাগত যোগ্যতা ও পেশা
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        সর্বশেষ শিক্ষাগত যোগ্যতা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {eduInfo.lasteduinfo}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        শিক্ষাগত বিষয়
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {eduInfo.subject}
                        </div>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        শিক্ষা প্রতিষ্ঠান
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {eduInfo.institute}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        বর্তমান পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {eduInfo.occupation}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        পেশার বিস্তারিত বিবরণ
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 ">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {eduInfo.occupationinfo}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Family Info Section */}

              <div className="pt-1">
                <div className="member_id_no border m-3">
                  <div className="border-bottom bg-bh bio_title">
                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                      পারিবারিক তথ্য
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        অর্থনৈতিক অবস্থা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {familyInfo.economyType}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        পিতার পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {familyInfo.fatherinfo}
                        </div>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        মায়ের পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {familyInfo.motherinfo}
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        ভাইদের শিক্ষাগত যোগ্যতা / পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {familyInfo.brotherinfo}
                        </div>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        বোনদের শিক্ষাগত যোগ্যতা / পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {familyInfo.sisterinfo}
                        </div>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        চাচা মামাদের শিক্ষাগত যোগ্যতা / পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {familyInfo.uncleinfo}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expected Spouse Section */}

              <div className="pt-1">
                <div className="member_id_no border m-3">
                  <div className="border-bottom bg-bh bio_title">
                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                      প্রত্যাশিত জীবনসঙ্গী
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        বৈবাহিক অবস্থা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.mstatus}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        বয়সসীমা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.exptyears}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        উচ্চতা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.minheight}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        গায়ের রং
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.exptcolor}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        শিক্ষাগত যোগ্যতা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.education}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.occupation}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-bottomc border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        জেলা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 border-bottomc">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {bioInfo.district}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-5 border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        অন্যান্য প্রত্যাশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-7">
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                          {bioInfo.otherreq}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact info */}

              <div className="pt-1">
                <div className="member_id_no border m-3">
                  <div className="border-bottom bg-bh bio_title">
                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                      যোগাযোগের তথ্য
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className="col-lg-12 col-5 border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2 border-bottomc">
                        ই-মেইল
                      </p>
                      <p className="mb-0 font-16 font-lal px-3 py-2">
                        {contactInfo.email}
                      </p>
                    </div>
                    {/* <div className="col-lg-8 col-7 col-2">
                      <div className="scrollable-content">
                        <p className="mb-0 font-16 font-lal px-3 py-2">
                          {contactInfo.email}
                        </p>
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="d-flex">
                    <div className="col-lg-4 col-5  border-end">
                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                        মোবাইল নম্বর
                      </p>
                    </div>
                    <div className="col-lg-8 col-7 col-2 ">
                      <p className="mb-0 font-16 font-lal px-3 py-2">গোপনীয়</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Bottom Note Section */}

            <div className="mt-3 p-3 noteb">
              <p className="mb-0 font-lal text-c2 font-22">
                সতর্কতাঃ বিয়ের সিদ্ধান্ত নেওয়ার পূর্বে স্থানীয়ভাবে খোঁজ নিয়ে
                বায়োডাটার সকল তথ্য যাচাই করুন।
              </p>
            </div>

            {/* <Link
              to={"/payment"}
              className="btn btn-down py-3 mt-3 w-100 fw-700 text-white font-lal font-20"
            >
              যোগাযোগের তথ্য জানুন
            </Link> */}
          </div>

          {/* Featured Card Section */}

          <div className="col-lg-3 my-5">
            <div className="featurecard mb-4">
              <div className="bio_title">
                <p className="font-lal font-20 fw-600 text-c2 mb-0 px-1">
                  ফিচার্ড বায়োডাটা
                </p>
              </div>
              {felist == false ? (
                <>
                  <div className="alert font-lal">কোন তথ্য নেই </div>
                </>
              ) : (
                <>
                  {felist
                    .sort(() => Math.random() - 0.5)
                    .slice(-6)
                    .filter((item) => {
                      if (userinfo.gender === "male") {
                        return item.gender === "male";
                      } else {
                        return item.gender === "female";
                      }
                    })
                    .map((item) => (
                      <>
                        {item.gender == "male" ? (
                          <Link
                            to={`/biodataview/groom/${item.id}`}
                            className={"nav-link"}
                            onClick={viewHandler}
                          >
                            <div className="d-flex p-2 my-1 fmember-card">
                              <div className="position-relative">
                                <div className="text-center">
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG}` +
                                      item.avater +
                                      `.png`
                                    }
                                    className="member_imgs"
                                    alt=""
                                  />
                                </div>
                                <div className="featuredicon">
                                  {item.vstatus == "1" && (
                                    <img src={verified} className="f_icon" />
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  <b>{item.occupation}</b>
                                </p>
                                <p className="mb-0 font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  বয়সঃ{" "}
                                  {calcAge(item.dob).toLocaleString("bn-BD")}
                                </p>
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  জেলাঃ {item.district}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            to={`/biodataview/bride/${item.id}`}
                            className={"nav-link"}
                            onClick={viewHandler}
                          >
                            <div className="d-flex p-2 my-1 fmember-card">
                              <div className="position-relative">
                                <div className="text-center">
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG}` +
                                      item.avater +
                                      `.png`
                                    }
                                    className="member_imgs"
                                    alt=""
                                  />
                                </div>
                                <div className="featuredicon">
                                  {item.vstatus == "1" && (
                                    <img src={verified} className="f_icon" />
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  <b>{item.occupation}</b>
                                </p>
                                <p className="mb-0 font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  বয়সঃ{" "}
                                  {calcAge(item.dob).toLocaleString("bn-BD")}
                                </p>
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  জেলাঃ {item.district}
                                </p>
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    ))}
                </>
              )}
            </div>

            {/* Verified Card Section */}

            <div className="featurecard">
              <div className="bio_title">
                <p className="font-lal font-20 fw-600 text-c2 mb-0 px-1">
                  ভেরিফাইড বায়োডাটা
                </p>
              </div>
              {verifiedList ? (
                <>
                  <div className="alert font-lal">কোন তথ্য নেই </div>
                </>
              ) : (
                <>
                  {verifiedList
                    .sort(() => Math.random() - 0.5)
                    .slice(-6)
                    .filter((item) => {
                      if (userinfo.gender === "male") {
                        return item.gender === "male";
                      } else {
                        return item.gender === "female";
                      }
                    })
                    .map((item) => (
                      <>
                        {item.gender == "male" ? (
                          <Link
                            to={`/biodataview/groom/${item.id}`}
                            className={"nav-link"}
                            onClick={viewHandler}
                          >
                            <div className="d-flex p-2 my-1 fmember-card">
                              <div className="position-relative">
                                <div className="text-center">
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG}` +
                                      item.avater +
                                      `.png`
                                    }
                                    className="member_imgs"
                                    alt=""
                                  />
                                </div>
                                <div className="featuredicon">
                                  {item.vstatus == "1" && (
                                    <img src={verified} className="f_icon" />
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  <b>{item.occupation}</b>
                                </p>
                                <p className="mb-0 font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  বয়সঃ{" "}
                                  {calcAge(item.dob).toLocaleString("bn-BD")}
                                </p>
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  জেলাঃ {item.district}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            to={`/biodataview/bride/${item.id}`}
                            className={"nav-link"}
                            onClick={viewHandler}
                          >
                            <div className="d-flex p-2 my-1 fmember-card">
                              <div className="position-relative">
                                <div className="text-center">
                                  <img
                                    src={
                                      `${import.meta.env.VITE_IMG}` +
                                      item.avater +
                                      `.png`
                                    }
                                    className="member_imgs"
                                    alt=""
                                  />
                                </div>
                                <div className="featuredicon">
                                  {item.vstatus == "1" && (
                                    <img src={verified} className="f_icon" />
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  <b>{item.occupation}</b>
                                </p>
                                <p className="mb-0 font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  বয়সঃ{" "}
                                  {calcAge(item.dob).toLocaleString("bn-BD")}
                                </p>
                                <p className="mb-0  font-14 fw-500 font-lal px-3 py-1 pb-0">
                                  জেলাঃ {item.district}
                                </p>
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
