import { Footer } from "../components/Footer";
import profile from "../assets/profile.png";
import vp from "../assets/verified.png";
import sp from "../assets/searchp.png";
// import cple from "../assets/cple.png";
import appUI from "../assets/phone_14.png";
// import secure from "../assets/secure.png";
// import verify from "../assets/verify.png";
import google from "../assets/Googlep.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarHome } from "../components/NavbarHome";
import { Loader } from "../components/Loader";
export const Home = () => {
  const [wedinfo, setWedInfo] = useState([]);
  const [logininfo, setLoginInfo] = useState([]);
  // const [content, setContent] = useState([]);
  const [total, setTotal] = useState([]);
  const [ftotal, setFtotal] = useState([]);
  const [mtotal, setMtotal] = useState([]);
  const [division, setDivision] = useState("");
  const [load, setLoad] = useState(true);

  const [homeDistrictFilter, setHomeDistrictFilter] = useState("");
  const [homeGenderFilter, setHomeGenderFilter] = useState("");
  const [homeMaritialFilter, setHomeMaritialFilter] = useState("");
  let navigate = useNavigate();
  const getWedInfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getwedding`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setWedInfo(res.message[0].swed);
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
        if (res.message.length == 0) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setLoginInfo(res.message[0]);
          setLoad(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const gettotal = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getusercount`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setTotal(res.tuser);
        setFtotal(res.fuser);
        setMtotal(res.muser);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWedInfo();
    gettotal();
    getLoginInfo();
  }, []);

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
          <div className="landing-header">
            <NavbarHome />

            <div className="container-lg">
              {/* Home Header Content Starts */}
              <div className="row header-content pt-2">
                <div className="col-lg-10 mx-auto pt-lg-5 homemain">
                  <p className="text-center fw-bold pt-lg-0 pt-5 font-bosonto htext1">
                    আমানাহ মেট্রিমোনি
                  </p>
                  <div className="font-hind mb-5 text-c2 text-center">
                    <p className="font-20  font-lal">
                      ২০১৫ সাল থেকে বাংলাদেশী এবং বাংলাদেশী বংশোদ্ভূত <br />{" "}
                      মুসলিম নাগরিকদের কাছে অন্যতম নির্ভরযোগ্য অনলাইন মেট্রিমোনি
                      সার্ভিস
                    </p>
                  </div>
                  <div className="filter-section  p-lg-4 mt-lg-5 moboff">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-3 px-2">
                        <p className="mb-2 font-18 font-lal fw-400 text-white">
                          আমি খুঁজছি
                        </p>
                        <select
                          className="form-select selectsm font-hind"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setHomeGenderFilter(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            সকল
                          </option>
                          <option value="male">ছেলের বায়োডাটা</option>
                          <option value="female">মেয়ের বায়োডাটা</option>
                        </select>
                      </div>
                      <div className="col-lg-3 px-2">
                        <p className="mb-2 font-18 font-lal fw-400 text-white">
                          বৈবাহিক অবস্থা
                        </p>
                        <select
                          className="form-select selectsm font-hind"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setHomeMaritialFilter(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            সকল
                          </option>
                          <option>বিবাহিত</option>
                          <option>অবিবাহিত</option>
                          <option>ডিভোর্সড</option>
                          <option>বিপত্নীক</option>
                          <option>বিধবা</option>
                        </select>
                      </div>
                      <div className="col-lg-3 px-2">
                        <p className="mb-2 font-18 font-lal fw-400 text-white">
                          জেলা
                        </p>
                        <select
                          value={division}
                          className="form-select selectsm font-hind"
                          onChange={(e) => {
                            setDivision(e.target.value);
                          }}
                        >
                          <option value={""}>পুরো দেশ</option>
                          <option>কুমিল্লা</option>
                          <option>ফেনী</option>
                          <option>ব্রাহ্মণবাড়িয়া</option>
                          <option>রাঙ্গামাটি</option>
                          <option>নোয়াখালী</option>
                          <option>চাঁদপুর</option>
                          <option>লক্ষ্মীপুর</option>
                          <option>চট্টগ্রাম</option>
                          <option>কক্সবাজার</option>
                          <option>খাগড়াছড়ি</option>
                          <option>বান্দরবন</option>
                          <option>সিরাজগঞ্জ</option>
                          <option>পাবনা</option>
                          <option>বগুড়া</option>
                          <option>রাজশাহী</option>
                          <option>নাটোর</option>
                          <option>জয়পুরহাট</option>
                          <option>চাঁপাইনবাবগঞ্জ</option>
                          <option>নওগাাঁ</option>
                          <option>যশোর</option>
                          <option>সাতক্ষীরা</option>
                          <option>মেহেরপুর</option>
                          <option>নড়াইল</option>
                          <option>চুয়াডাঙ্গা</option>
                          <option>কুষ্টিয়া</option>
                          <option>মাগুরা</option>
                          <option>খুলনা</option>
                          <option>বাগেরহাট</option>
                          <option>ঝিনাইদহ</option>
                          <option>ঝালকাঠি</option>
                          <option>পটুয়াখালী</option>
                          <option>পিরোজপুর</option>
                          <option>বরিশাল</option>
                          <option>বরিশাল</option>
                          <option>ভোলা</option>
                          <option>বরগুনা</option>
                          <option>সিলেট</option>
                          <option>মৌলভীবাজার</option>
                          <option>হবিগঞ্জ</option>
                          <option>সুনামগঞ্জ</option>
                          <option>নরসিংদী</option>
                          <option>গাজীপুর</option>
                          <option>শরীয়তপুর</option>
                          <option>নারায়ণগঞ্জ</option>
                          <option>টাঙ্গাইল</option>
                          <option>কিশোরগঞ্জ</option>
                          <option>মনিকগঞ্জ</option>
                          <option>ঢাকা</option>
                          <option>মুন্সিগঞ্জ</option>
                          <option>রাজবাড়ী</option>
                          <option>মাদারীপুর</option>
                          <option>গোপালগঞ্জ</option>
                          <option>ফরিদপুর</option>
                          <option>পঞ্চগ়ড়</option>
                          <option>দিনজপুর</option>
                          <option>লালমনিরহাট</option>
                          <option>নীলফামারী</option>
                          <option>গাইবান্ধা</option>
                          <option>ঠাকুরগাঁও</option>
                          <option>রংপুর</option>
                          <option>কুড়িগ্রাম</option>
                          <option>শেরপুর</option>
                          <option>ময়মনসিংহ</option>
                          <option>জামালপুর</option>
                          <option>নেত্রকোণা</option>
                        </select>
                        {/* {division == "" && (
                      <>
                        <select
                          className="form-select selectsm"
                          onChange={(e) => {
                            setDivision(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            জেলা নির্বাচন করুন
                          </option>
                          <option>চট্টগ্রাম</option>
                          <option>ঢাকা</option>
                          <option>সিলেট</option>
                        </select>
                      </>
                    )}
                    {division !== "" && (
                      <select
                        className="form-select selectsm"
                        onChange={(e) => {
                          setHomeDistrictFilter(e.target.value);
                        }}
                      >
                        {division == "চট্টগ্রাম" && (
                          <>
                            <option value={""}>উপজেলা নির্বাচন করুন</option>
                            <option>চট্টগ্রাম</option>
                            <option>Shatkaniya</option>
                            <option>Ranguniya</option>
                          </>
                        )}
                        {division == "ঢাকা" && (
                          <>
                            <option value={""}>উপজেলা নির্বাচন করুন</option>
                            <option>ঢাকা City</option>
                            <option>Narayanganj</option>
                            <option>Tongi</option>
                          </>
                        )}
                        {division == "সিলেট" && (
                          <>
                            <option value={""}>উপজেলা নির্বাচন করুন</option>
                            <option>Moulobhibazar</option>
                          </>
                        )}
                      </select>
                    )} */}
                      </div>
                      <div className="col-lg-3 px-2">
                        <Link
                          to={"/member"}
                          state={{
                            homeGenderFilter: homeGenderFilter,
                            homeMaritialFilter: homeMaritialFilter,
                            homeDistrictFilter: homeDistrictFilter,
                            homeDivision: division,
                          }}
                          className="btn btn-search border-0 font-18 text-white font-lal fw-500 w-100 sm-lg py-2"
                        >
                          জীবনসঙ্গী খুঁজুন
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="filter-section container p-lg-4 mt-lg-5 mobc">
                    <div className="row p-3">
                      <div className="col-lg-3 col-6 px-2 mb-2">
                        <p className="mb-1 font-18 font-lal fw-400 text-white">
                          আমি খুঁজছি
                        </p>
                        <select
                          className="form-select selectsm "
                          aria-label="Default select example"
                          onChange={(e) => {
                            setHomeGenderFilter(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            সকল
                          </option>
                          <option value="male">ছেলের বায়োডাটা</option>
                          <option value="female">মেয়ের বায়োডাটা</option>
                        </select>
                      </div>
                      <div className="col-lg-3 col-6 px-2 mb-2">
                        <p className="mb-1 font-18 font-lal fw-400 text-white">
                          বৈবাহিক অবস্থা
                        </p>
                        <select
                          className="form-select selectsm"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setHomeMaritialFilter(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            সকল
                          </option>
                          <option>বিবাহিত</option>
                          <option>অবিবাহিত</option>
                          <option>ডিভোর্সড</option>
                          <option>বিপত্নীক</option>
                          <option>বিধবা</option>
                        </select>
                      </div>
                      <div className="col-lg-3 col-6 px-2">
                        <p className="mb-1 font-18 font-lal fw-400 text-white">
                          জেলা
                        </p>
                        <select
                          value={division}
                          className="form-select selectsm"
                          onChange={(e) => {
                            setDivision(e.target.value);
                          }}
                        >
                          <option value={""}>পুরো দেশ</option>
                          <option>কুমিল্লা</option>
                          <option>ফেনী</option>
                          <option>ব্রাহ্মণবাড়িয়া</option>
                          <option>রাঙ্গামাটি</option>
                          <option>নোয়াখালী</option>
                          <option>চাঁদপুর</option>
                          <option>লক্ষ্মীপুর</option>
                          <option>চট্টগ্রাম</option>
                          <option>কক্সবাজার</option>
                          <option>খাগড়াছড়ি</option>
                          <option>বান্দরবন</option>
                          <option>সিরাজগঞ্জ</option>
                          <option>পাবনা</option>
                          <option>বগুড়া</option>
                          <option>রাজশাহী</option>
                          <option>নাটোর</option>
                          <option>জয়পুরহাট</option>
                          <option>চাঁপাইনবাবগঞ্জ</option>
                          <option>নওগাাঁ</option>
                          <option>যশোর</option>
                          <option>সাতক্ষীরা</option>
                          <option>মেহেরপুর</option>
                          <option>নড়াইল</option>
                          <option>চুয়াডাঙ্গা</option>
                          <option>কুষ্টিয়া</option>
                          <option>মাগুরা</option>
                          <option>খুলনা</option>
                          <option>বাগেরহাট</option>
                          <option>ঝিনাইদহ</option>
                          <option>ঝালকাঠি</option>
                          <option>পটুয়াখালী</option>
                          <option>পিরোজপুর</option>
                          <option>বরিশাল</option>
                          <option>বরিশাল</option>
                          <option>ভোলা</option>
                          <option>বরগুনা</option>
                          <option>সিলেট</option>
                          <option>মৌলভীবাজার</option>
                          <option>হবিগঞ্জ</option>
                          <option>সুনামগঞ্জ</option>
                          <option>নরসিংদী</option>
                          <option>গাজীপুর</option>
                          <option>শরীয়তপুর</option>
                          <option>নারায়ণগঞ্জ</option>
                          <option>টাঙ্গাইল</option>
                          <option>কিশোরগঞ্জ</option>
                          <option>মনিকগঞ্জ</option>
                          <option>ঢাকা</option>
                          <option>মুন্সিগঞ্জ</option>
                          <option>রাজবাড়ী</option>
                          <option>মাদারীপুর</option>
                          <option>গোপালগঞ্জ</option>
                          <option>ফরিদপুর</option>
                          <option>পঞ্চগ়ড়</option>
                          <option>দিনজপুর</option>
                          <option>লালমনিরহাট</option>
                          <option>নীলফামারী</option>
                          <option>গাইবান্ধা</option>
                          <option>ঠাকুরগাঁও</option>
                          <option>রংপুর</option>
                          <option>কুড়িগ্রাম</option>
                          <option>শেরপুর</option>
                          <option>ময়মনসিংহ</option>
                          <option>জামালপুর</option>
                          <option>নেত্রকোণা</option>
                        </select>
                        {/* {division == "" && (
                      <>
                        <select
                          className="form-select selectsm"
                          onChange={(e) => {
                            setDivision(e.target.value);
                          }}
                        >
                          <option selected value={""}>
                            জেলা নির্বাচন করুন
                          </option>
                          <option>চট্টগ্রাম</option>
                          <option>ঢাকা</option>
                          <option>সিলেট</option>
                        </select>
                      </>
                    )}
                    {division !== "" && (
                      <select
                        className="form-select selectsm"
                        onChange={(e) => {
                          setHomeDistrictFilter(e.target.value);
                        }}
                      >
                        {division == "চট্টগ্রাম" && (
                          <>
                            <option value={""}>উপজেলা নির্বাচন করুন</option>
                            <option>চট্টগ্রাম</option>
                            <option>Shatkaniya</option>
                            <option>Ranguniya</option>
                          </>
                        )}
                        {division == "ঢাকা" && (
                          <>
                            <option value={""}>উপজেলা নির্বাচন করুন</option>
                            <option>ঢাকা City</option>
                            <option>Narayanganj</option>
                            <option>Tongi</option>
                          </>
                        )}
                        {division == "সিলেট" && (
                          <>
                            <option value={""}>উপজেলা নির্বাচন করুন</option>
                            <option>Moulobhibazar</option>
                          </>
                        )}
                      </select>
                    )} */}
                      </div>
                      <div className="col-lg-3 col-6 px-2">
                        <Link
                          to={"/member"}
                          state={{
                            homeGenderFilter: homeGenderFilter,
                            homeMaritialFilter: homeMaritialFilter,
                            homeDistrictFilter: homeDistrictFilter,
                            homeDivision: division,
                          }}
                          className="btn btn-search border-0 font-18 text-white font-lal fw-500 w-100 sm-lg py-2"
                        >
                          জীবনসঙ্গী খুঁজুন
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Header Content Ends */}
            </div>
          </div>

          {/* Steps Section Starts */}
          <div className="container">
            <div className="row my-lg-3 px-lg-5 px-3 ">
              <div className="col-lg-12 text-center my-lg-5">
                <p className="heading2 fw-700 font-lal mb-1 mt-lg-0 mt-4">
                  আপনার বায়োডাটা জমা দিতে চান?
                </p>
                <p className="font-22 fw-400 font-lal">
                  মাত্র ৩টি ধাপে খুব সহজে বায়োডাটা প্রকাশিত হবে আমাদের ওয়েবসাইটে
                </p>
              </div>
              <div className="col-lg-4 mt-3 px-4 text-center">
                <img src={profile} className="step1-img mb-3" />
                <p className="font-16 fw-400 font-hind">
                  রেজিস্ট্রেশন সম্পূর্ন করে বায়োডাটা তৈরি করুন অপশনে গিয়ে আপনার
                  ব্যাক্তিগত ও পারিবারিক তথ্য দিয়ে সাবমিট করুন।
                </p>
              </div>

              <div className="col-lg-4 mt-3 px-4 text-center">
                <img src={vp} className="step1-img mb-3" />
                <p className="font-16 fw-400 font-hind">
                  আমাদের এডমিন টিমের পক্ষ থেকে একজন আপনার তথ্যগুলো যাচাই বাছাই
                  পুর্বক রিভিউ করে সাইটে প্রকাশ করবে।
                </p>
              </div>

              <div className="col-lg-4 mt-3 px-4 text-center">
                <img src={sp} className="step1-img mb-3" />
                <p className="font-16 fw-400 font-hind">
                  আপনার বায়োডাটা প্রকাশিত হবার সাথে সাথে আপনি রেজিঃ করে
                  পাত্র/পাত্রীপক্ষে যোগাযোগ তথ্য নিতে পারবেন।
                </p>
              </div>
            </div>
          </div>

          {/* Steps Section Ends */}

          {/* Stats Section Starts */}

          <div className="container py-3 mb-5">
            <div className="row my-3 justify-content-center px-3">
              <div className="col-lg-12 text-center ">
                <p className="fw-600 font-lal my-3 text-c2 heading3">
                  আমানাহ মেট্রিমোনিতে মোট নিবন্ধিত
                </p>
              </div>
              <div className="col-lg-9 col-12 counterback mx-auto">
                <div className="row countbg py-3 moboff">
                  <div className="d-flex justify-content-between">
                    <div className="col-lg-3 text-center">
                      <p className="fw-700 font-lal mb-0 font-love font-count">
                        {Number(wedinfo).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400 font-lal">সফল বিবাহ</p>
                    </div>

                    <div className="col-lg-3  text-center">
                      <p className="fw-700 font-lal mb-0 font-love font-count">
                        {Number(mtotal).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400 font-lal">সর্বমোট পাত্র</p>
                    </div>

                    <div className="col-lg-3  text-center">
                      <p className="fw-700 font-lal mb-0 font-love font-count">
                        {Number(ftotal).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400 font-lal">সর্বমোট পাত্রী</p>
                    </div>

                    <div className="col-lg-3 text-center">
                      <p className="fw-700 font-lal font-love mb-0 font-count">
                        {Number(total).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400  font-lal">
                        সর্বমোট মেম্বার
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row countbg py-3 mobc">
                  <div className="row justify-content-between">
                    <div className="col-lg-3 col-6  text-center">
                      <p className="fw-700 font-lal mb-0 font-love font-count">
                        {Number(wedinfo).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400 font-lal">সফল বিবাহ</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                      <p className="fw-700 font-lal font-love mb-0 font-count">
                        {Number(total).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400  font-lal">
                        সর্বমোট মেম্বার
                      </p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                      <p className="fw-700 font-lal mb-0 font-love font-count">
                        {Number(mtotal).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400 font-lal">সর্বমোট পাত্র</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                      <p className="fw-700 font-lal mb-0 font-love font-count">
                        {Number(ftotal).toLocaleString("bn-BD")}
                      </p>
                      <p className="font-18 fw-400 font-lal">সর্বমোট পাত্রী</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section Ends */}

          {/* Mobile App Section Starts */}

          <div className="container-fluid mobileAppf" id="banner">
            <div className="row px-lg-5">
              <div className="col-lg-6 col-6 text-end pe-lg-5 py-5 moboff">
                <img src={appUI} className="uiimg" />
              </div>

              <div className="col-lg-6 col-5 text-center py-5 mobc">
                <img src={appUI} className="uiimg" />
              </div>
              <div className="col-lg-6 col-6 py-5 moboff">
                <p className="heading2 fw-700 pt-5 font-lal">
                  ডাউনলোড করুন <br />
                  আমানাহ মেট্রিমোনি অ্যাপ
                </p>
                <p className="font-lal fw-400 font-18">
                  বায়োডাটা দেখুন ও সাবমিট করুন খুব সহজে আমানাহ মেট্রিমোনি এপস
                  ব্যবহার করে।
                  <br /> এপসটি ডাউনলোড করতে প্লেস্টোরে সার্চ করুন Amanah
                  Matrimony লিখে অথবা ক্লিক করুন নীচের লিংকে।
                </p>
                <Link to="https://play.google.com/store/search?q=amanah+matrimony&c=apps">
                  <img src={google} className="plays mt-2" />
                </Link>
              </div>

              <div className="col-lg-6 col-7 py-5 mobc">
                <p className="heading2 fw-700 pt-2 font-lal">
                  ডাউনলোড করুন <br />
                  আমানাহ মেট্রিমোনি অ্যাপ
                </p>
                <p className="font-lal fw-400 font-12">
                  বায়োডাটা দেখুন ও সাবমিট করুন খুব সহজে আমানাহ মেট্রিমোনি এপস
                  ব্যবহার করে।
                  <br /> এপসটি ডাউনলোড করতে প্লেস্টোরে সার্চ করুন Amanah
                  Matrimony লিখে অথবা ক্লিক করুন নীচের লিংকে।
                </p>
                <Link to="https://play.google.com/store/search?q=amanah+matrimony&c=apps">
                  <img src={google} className="plays mt-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile App Section Ends */}

          {/* Features headline Section Starts */}

          {/* <div className="container p-5 moboff">
            <div className="row mx-5">
              <div className="col-lg-12 px-5 text-center mt-4">
                <p className="f_featureh font-lal mb-0 font-20 border-bottom pb-2 fw-600 text-c2">
                  শতভাগ বিশ্বস্ত পথচলা{" "}
                </p>
              </div>
            </div>
            <div className="d-flex mx-5 px-5 py-3 my-3 justify-content-between">
              <div className="px-5 text-center">
                <div className="d-flex align-items-center">
                  <img src={cple} className="f_feature_icon" />
                  <p className="mb-0 font-18 font-hind fw-500 ms-2">
                    উপযুক্ত সম্বন্ধ
                  </p>
                </div>
              </div>
              <div className="px-5 text-center">
                <div className="d-flex align-items-center">
                  <img src={verify} className="f_feature_icon" />
                  <p className="mb-0 font-18 font-hind fw-500 ms-2">
                    ভেরিফাইড প্রোফাইল{" "}
                  </p>
                </div>
              </div>
              <div className="px-5 text-center">
                <div className="d-flex align-items-center">
                  <img src={secure} className="f_feature_icon" />
                  <p className="mb-0 font-18 font-hind fw-500 ms-2">
                    তথ্য নিরাপত্তা
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Features headline Section Ends */}
          <Footer />
        </>
      )}
    </>
  );
};
