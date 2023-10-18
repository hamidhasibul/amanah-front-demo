import React, { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { ProfileSide } from "../components/ProfileSide";
import { Personal } from "../components/biodataform/personalinfo";
import { Family } from "../components/biodataform/familyinfo";
import { Education } from "../components/biodataform/eduinfo";
import { Selfbio } from "../components/biodataform/expectedbio";
import { Contact } from "../components/biodataform/contactinfo";
import { Commetment } from "../components/biodataform/commetment";
import { Avater } from "../components/biodataform/avater";
import { Upersonal } from "../components/modal/updatepersonalinfo";
import { Ufamily } from "../components/modal/updateamily";
import { Ueducation } from "../components/modal/updateedu";
import { Uexpectedbio } from "../components/modal/updatexpectedbio";
import { Ucontact } from "../components/modal/updatecontact";
import { Uavater } from "../components/modal/updateavatar";
import BiodataS from "../assets/application.png";
import { UpersonalW } from "./Mobile/updateforms/updatepersonalinfoW";
import { UfamilyW } from "./Mobile/updateforms/updateamilyW";
import { UeducationW } from "./Mobile/updateforms/updateeduW";
import { UexpectedbioW } from "./Mobile/updateforms/updatexpectedbioW";
import { UcontactW } from "./Mobile/updateforms/updatecontactW";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

const marrOptions = [
  { value: "বিবাহিত", label: "বিবাহিত" },
  { value: "বিপত্নীক", label: "বিপত্নীক" },
  { value: "বিধবা", label: "বিধবা" },
  { value: "অবিবাহিত", label: "অবিবাহিত" },
  { value: "ডিভোর্সড", label: "ডিভোর্সড" },
];

export const Biodata = () => {
  const [userinfo, setUserInfo] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [familyInfo, setFamilyInfo] = useState([]);
  const [eduInfo, setEduInfo] = useState([]);
  const [bioInfo, setBioInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [commitmentInfo, setCommitmentInfo] = useState([]);
  const [avater, setAvater] = useState([]);
  const [load, setLoad] = useState(true);

  const [initActiveStatus, setInitActiveStatus] = useState("0");
  const [status, setStatus] = useState("0");
  const [update, setUpdate] = useState(0);

  const [activeTab, setActiveTab] = useState(false);

  const navigate = useNavigate();

  const getAllInfo = () => {
    let token = localStorage.getItem("token");
    const data = new FormData();
    data.append("token", token);
    fetch(`${import.meta.env.VITE_SERVER}/getbiodata`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setPersonalInfo(res.personalinfo[0]);
        setFamilyInfo(res.familyinfo[0]);
        setEduInfo(res.eduinfo[0]);
        setBioInfo(res.bio[0]);
        setContactInfo(res.contactinfo[0]);
        setCommitmentInfo(res.commitment[0]);
        setAvater(res.avater[0]);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  const getActiveStatus = () => {
    const data = new FormData();

    let token = localStorage.getItem("token");

    data.append("token", token);

    fetch(`${import.meta.env.VITE_SERVER}/getMemberBytoken`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setInitActiveStatus(res.message[0].appstatus);
        setStatus(res.message[0].status);
        setUserInfo(res.message[0]);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  const toggleStatus = () => {
    if (initActiveStatus === "0") {
      setStatus("1");
    } else {
      setStatus("0");
    }

    let token = localStorage.getItem("token");

    const data = new FormData();

    data.append("token", token);
    data.append("status", status);

    fetch(`${import.meta.env.VITE_SERVER}/updatestatus`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
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

  const formatDate = (dob) => {
    let date = new Date(dob);

    let day = date.getDate();

    if (day < 10) {
      day = "0" + day;
    }

    let month = date.getMonth() + 1;

    if (month < 10) {
      month = "0" + month;
    }
    let year = date.getFullYear();

    return `${Number(day).toLocaleString("bn-BD")}/${Number(
      month
    ).toLocaleString("bn-BD")}/${Number(year)
      .toLocaleString("bn-BD")
      .replace(",", "")}`;
  };

  const tabHandler = () => {
    setActiveTab(true);
    document.getElementById("hidechk").style.display = "none";
  };

  const auth = () => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getAllInfo();
    auth();
  }, []);
  useEffect(() => {
    getActiveStatus();
    getAllInfo();
  }, [update]);

  return (
    <>
      {/* Loader */}
      {load && (
        <>
          <Loader />
        </>
      )}

      {/* Content */}

      {!load && (
        <>
          <div className="container">
            <div className="row">
              <ProfileSide />

              <div className="col-lg-9">
                <div className="row p-4 my-5 mt-2 font-lal align-items-center">
                  <div className="col-lg-9">
                    <p className="font-22 text-c2 fw-700 font-bosonto mb-0">
                      আপনার বায়ডাটা তথ্য
                    </p>
                  </div>
                  {personalInfo || activeTab ? (
                    <>
                      {personalInfo?.draft == 0 &&
                        familyInfo?.draft == 0 &&
                        eduInfo?.draft == 0 &&
                        bioInfo?.draft == 0 &&
                        contactInfo?.draft == 0 &&
                        commitmentInfo?.draft == 0 &&
                        avater?.draft == 0 && (
                          <>
                            <div className="col-lg-3 d-flex align-items-center">
                              {userinfo.status == 1 && (
                                <>
                                  <p className="mb-0 me-2">
                                    বায়োডাটা স্ট্যাটাস
                                  </p>
                                  <div class="form-check form-switch">
                                    <input
                                      class="form-check-input form-check-success"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                      style={{ height: "17px", width: "40px" }}
                                      checked={
                                        initActiveStatus == 1 ? true : false
                                      }
                                      onClick={toggleStatus}
                                      disabled={
                                        personalInfo == null ? true : false
                                      }
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                            {userinfo.status == 0 && (
                              <div className="container">
                                <div class="statusbarp text-center mb-2">
                                  <p class="verifyp">
                                    আপনার বায়োডাটাটি ভেরিফিকেশন এর জন্য
                                    অপেক্ষমান রয়েছে
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                      <div className="col-lg-12">
                        {/* Tabs Section Starts */}

                        <ul
                          class="nav nav-tab mb-3 border-bottom"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link active fw-400 font-hind ps-0"
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              type="button"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              ব্যাক্তিগত
                            </a>
                          </li>
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link fw-400 font-hind"
                              id="pills-profile-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="pills-profile"
                              aria-selected="false"
                            >
                              পারিবারিক
                            </a>
                          </li>
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link fw-400 font-hind"
                              id="pills-edu-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-contact"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                            >
                              শিক্ষা ও পেশা
                            </a>
                          </li>
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link fw-400 font-hind"
                              id="pills-exbio-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-bio"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                            >
                              প্রত্যাশিত জীবনসঙ্গী
                            </a>
                          </li>
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link fw-400 font-hind"
                              id="pills-con-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-content"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                            >
                              যোগাযোগ
                            </a>
                          </li>
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link fw-400 font-hind"
                              id="pills-com-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-commetment"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                            >
                              অঙ্গীকারনামা
                            </a>
                          </li>
                          <li class="nav-item pill-2" role="presentation">
                            <a
                              class="nav-link fw-400 font-hind"
                              id="pills-avater-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-avater"
                              type="button"
                              role="tab"
                              aria-controls="pills-contact"
                              aria-selected="false"
                            >
                              প্রতিচ্ছবি
                            </a>
                          </li>
                        </ul>

                        {/* Tabs Section Ends */}

                        {/* Tab Content Starts */}

                        <div class="tab-content" id="pills-tabContent">
                          {/* Personal Info */}

                          {personalInfo == null ? (
                            <div
                              class="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabindex="0"
                            >
                              <Personal />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade show active "
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                              tabindex="0"
                            >
                              {personalInfo.draft == 1 ? (
                                <>
                                  <UpersonalW />
                                </>
                              ) : (
                                <>
                                  <div className="personalinfo">
                                    <div className="member_id_no border">
                                      <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                        <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                                          ব্যাক্তিগত তথ্য
                                        </p>
                                        <button
                                          type="button"
                                          class="btn edit-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#pif"
                                        >
                                          <i class="fa-solid fa-pen-to-square pe-2"></i>
                                          পরিবর্তন করুন{" "}
                                        </button>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            জন্মসাল
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {formatDate(personalInfo.dob)}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            উচ্চতা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {personalInfo.height}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            ওজন
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {Number(personalInfo.weight) ? (
                                              <>
                                                {Number(
                                                  personalInfo.weight
                                                ).toLocaleString("bn-BD")}{" "}
                                                কেজি
                                              </>
                                            ) : (
                                              <>{personalInfo.weight} কেজি </>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            গায়ের রং
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {personalInfo.color}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            বৈবাহিক অবস্থা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2 font-hind">
                                            {personalInfo.mstatus}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            রক্তের গ্রুপ
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {personalInfo.bloodgroup}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-end border-bottomc">
                                          <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                                            জেলা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0  font-16 font-lal px-3 py-2">
                                            {personalInfo.district}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-end border-bottomc">
                                          <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                                            বর্তমান ঠিকানা
                                          </p>
                                        </div>
                                        <div className="col-lg-8">
                                          <p className="mb-0  font-16 font-lal border-bottomc px-3 py-2">
                                            {personalInfo.presentaddress}
                                          </p>
                                        </div>
                                      </div>
                                      {userinfo.gender == "female" ? (
                                        <div className="d-flex">
                                          <div className="col-lg-4 border-bottomc border-end">
                                            <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                              পর্দার ধরন
                                            </p>
                                          </div>
                                          <div className="col-lg-8 border-bottomc">
                                            <p className="mb-0  font-16 font-lal px-3 py-2">
                                              {personalInfo.pordaType}
                                            </p>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="d-flex">
                                          <div className="col-lg-4 border-bottomc border-end">
                                            <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                                              দাঁড়ি আছে কিনা
                                            </p>
                                          </div>
                                          <div className="col-lg-8 border-bottomc">
                                            <p className="mb-0 font-16 font-lal px-3 py-2">
                                              {personalInfo.dari}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                                            মাজহাব / মানহাজ
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {personalInfo.mazhub}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                                            রাজনৈতিক দৃষ্টিভঙ্গি
                                          </p>
                                        </div>
                                        <div className="col-lg-8  border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {personalInfo.politics}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-end">
                                          <p className="mb-0  font-16 fw-600 font-lal px-3 py-2">
                                            নিজের সম্পর্কে
                                          </p>
                                        </div>
                                        <div className="col-lg-8">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {personalInfo.selfinfo}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Family Info */}
                          {familyInfo == null ? (
                            <div
                              class="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabindex="0"
                            >
                              <Family />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                              tabindex="0"
                            >
                              {familyInfo.draft == 1 ? (
                                <>
                                  <UfamilyW />
                                </>
                              ) : (
                                <>
                                  <div className="familyinfo">
                                    <div className="member_id_no border">
                                      <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                        <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                                          পারিবারিক তথ্য
                                        </p>
                                        <button
                                          type="button"
                                          class="btn edit-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#fif"
                                        >
                                          <i class="fa-solid fa-pen-to-square pe-2"></i>
                                          পরিবর্তন করুন{" "}
                                        </button>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            অর্থনৈতিক অবস্থা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {familyInfo.economyType}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            পিতার পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {familyInfo.fatherinfo}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            মায়ের পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {familyInfo.motherinfo}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            ভাইদের শিক্ষাগত যোগ্যতা / পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {familyInfo.brotherinfo}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            বোনদের শিক্ষাগত যোগ্যতা / পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {familyInfo.sisterinfo}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            চাচা মামাদের শিক্ষাগত যোগ্যতা / পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 ">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {familyInfo.uncleinfo}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Education Info */}

                          {eduInfo == null ? (
                            <div
                              class="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <Education />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              {eduInfo.draft == 1 ? (
                                <>
                                  <UeducationW />
                                </>
                              ) : (
                                <>
                                  <div className="eduinfo">
                                    <div className="member_id_no border">
                                      <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                        <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                                          শিক্ষাগত যোগ্যতা ও পেশা
                                        </p>
                                        <button
                                          type="button"
                                          class="btn edit-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#eif"
                                        >
                                          <i class="fa-solid fa-pen-to-square pe-2"></i>
                                          পরিবর্তন করুন{" "}
                                        </button>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            সর্বশেষ শিক্ষাগত যোগ্যতা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {eduInfo.lasteduinfo}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            শিক্ষাগত বিষয়
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {eduInfo.subject}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            শিক্ষা প্রতিষ্ঠান
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {eduInfo.institute}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            বর্তমান পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {eduInfo.occupation}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            পেশার বিস্তারিত বিবরণ
                                          </p>
                                        </div>
                                        <div className="col-lg-8 ">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {eduInfo.occupationinfo}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Bio Info */}

                          {bioInfo == null ? (
                            <div
                              class="tab-pane fade"
                              id="pills-bio"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <Selfbio />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade"
                              id="pills-bio"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              {bioInfo.draft == 1 ? (
                                <>
                                  <UexpectedbioW />
                                </>
                              ) : (
                                <>
                                  <div className="expected-bio">
                                    <div className="member_id_no border">
                                      <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                        <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                                          প্রত্যাশিত জীবনসঙ্গী
                                        </p>
                                        <button
                                          type="button"
                                          class="btn edit-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#exif"
                                        >
                                          <i class="fa-solid fa-pen-to-square pe-2"></i>
                                          পরিবর্তন করুন{" "}
                                        </button>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            বৈবাহিক অবস্থা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.mstatus}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            বয়সসীমা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.exptyears}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            উচ্চতা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.minheight}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            গায়ের রং
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.exptcolor}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            শিক্ষাগত যোগ্যতা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.education}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            পেশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.occupation}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            জেলা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.district}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            অন্যান্য প্রত্যাশা
                                          </p>
                                        </div>
                                        <div className="col-lg-8 ">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {bioInfo.otherreq}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Contact Info */}

                          {contactInfo == null ? (
                            <div
                              class="tab-pane fade"
                              id="pills-content"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <Contact />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade"
                              id="pills-content"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              {contactInfo.draft == 1 ? (
                                <>
                                  <UcontactW />
                                </>
                              ) : (
                                <>
                                  <div className="contact-bio">
                                    <div className="member_id_no border">
                                      <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                        <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3 ">
                                          যোগাযোগের তথ্য
                                        </p>
                                        <button
                                          type="button"
                                          class="btn edit-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#cif"
                                        >
                                          <i class="fa-solid fa-pen-to-square pe-2"></i>
                                          পরিবর্তন করুন{" "}
                                        </button>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            মোবাইল নাম্বার
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {contactInfo.phone}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            আভিভাবকের নাম্বার
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {contactInfo.gphone}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            আভিভাবকের সাথে সম্পর্ক
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {contactInfo.relation}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="d-flex">
                                        <div className="col-lg-4 border-bottomc border-end">
                                          <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                            ইমেইল
                                          </p>
                                        </div>
                                        <div className="col-lg-8 border-bottomc">
                                          <p className="mb-0 font-16 font-lal px-3 py-2">
                                            {contactInfo.email}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Commitment Section */}

                          {commitmentInfo == null ? (
                            <div
                              class="tab-pane fade"
                              id="pills-commetment"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <Commetment />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade"
                              id="pills-commetment"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <div className="commetment-info">
                                <div className="member_id_no border">
                                  <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                                      অঙ্গীকারনামা
                                    </p>
                                    {/* <i class="fa-solid fa-pen-to-square pe-2"></i>
                            পরিবর্তন করুন{" "} */}
                                  </div>
                                  <div className="d-flex">
                                    <div className="col-lg-8 border-bottomc border-end">
                                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                        আল্লহ'র শপথ নিয়ে সাক্ষ্য দিন, বায়োডাটাতে
                                        দেয়া তথ্যগুলো সব সত্য?
                                      </p>
                                    </div>
                                    <div className="col-lg-4 border-bottomc">
                                      <p className="mb-0 font-16 font-lal px-3 py-2">
                                        {commitmentInfo.question1}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="d-flex">
                                    <div className="col-lg-8 border-bottomc border-end">
                                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                        আমানাহ মেট্রিমোনি-তে অভিভাবক-কে জানিয়ে
                                        বায়োডাটা তৈরি করেছেন?
                                      </p>
                                    </div>
                                    <div className="col-lg-4 border-bottomc">
                                      <p className="mb-0 font-16 font-lal px-3 py-2">
                                        {commitmentInfo.question2}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="d-flex">
                                    <div className="col-lg-8 border-end">
                                      <p className="mb-0 font-16 fw-600 font-lal px-3 py-2">
                                        বায়োডাটাই মিথ্যা তথ্য প্রদান করলে আইনগত
                                        এবং আখিরাতের দায়ভার আমানাহ মেট্রিমোনি
                                        নিবেন না। আপনি কি সম্মত?
                                      </p>
                                    </div>
                                    <div className="col-lg-4">
                                      <p className="mb-0 font-16 font-lal px-3 py-2">
                                        {commitmentInfo.question3}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Avatar Section */}

                          {avater == null ? (
                            <div
                              class="tab-pane fade"
                              id="pills-avater"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <Avater update={update} setUpdate={setUpdate} />
                            </div>
                          ) : (
                            <div
                              class="tab-pane fade"
                              id="pills-avater"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                              tabindex="0"
                            >
                              <div className="commetment-info">
                                <div className="member_id_no border">
                                  <div className="border-bottom bg-bh bio_title d-flex justify-content-between align-items-center">
                                    <p className="font-lal font-20 fw-600 text-c2 mb-0 p-2 px-3">
                                      আপনার প্রতিচ্ছবি
                                    </p>
                                    <button
                                      type="button"
                                      class="btn edit-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#vif"
                                    >
                                      <i class="fa-solid fa-pen-to-square pe-2"></i>
                                      পরিবর্তন করুন{" "}
                                    </button>
                                  </div>
                                  <div className="d-flex">
                                    <div className="col-lg-12 text-center">
                                      <img
                                        src={
                                          `${import.meta.env.VITE_IMG}` +
                                          avater.avater +
                                          `.png`
                                        }
                                        className="img rounded-circle py-5"
                                        style={{
                                          height: 250,
                                          objectFit: "contain",
                                        }}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tab Content Ends */}
                      </div>
                    </>
                  ) : (
                    <>
                      <div id="hidechk" className="text-center pt-5">
                        <img src={BiodataS} class="biodataaddimg" />
                        <p className="font-16 pt-4">
                          আমানাহ মেট্রিমনিতে বায়োডাটা তৈরি করা খুবই সহজ।
                          <br />
                          সঠিক তথ্য প্রদান করে বায়োডাটা এড করতে নিচের বাটনে
                          ক্লিক করুন।
                        </p>

                        <button
                          onClick={tabHandler}
                          className="biobtn w-50 my-3"
                        >
                          বায়োডাটা তৈরি করুন
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <Upersonal />
          <Ufamily />
          <Ueducation />
          <Uexpectedbio />
          <Ucontact />
          <Uavater update={update} setUpdate={setUpdate} />
        </>
      )}
    </>
  );
};
