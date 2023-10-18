import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "react-range-slider-input/dist/style.css";
import MultiRangeSlider from "multi-range-slider-react";
import "react-range-slider-input/dist/style.css";
import verified from "../assets/approved.png";
// import filter from "../assets/filter.png";
// import nolove from "../assets/nolove.png";
import ReactPaginate from "react-paginate";

export const AllMember = ({ allBiodata, calcAge, searchFilter }) => {
  const [genderFilter, setGenderFilter] = useState("");
  // const [userid, setUserid] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [majhubFilter, setMajhubFilter] = useState("");
  const [maritialFilter, setMaritialFilter] = useState("");
  const [division, setDivision] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  // const [userInfo, setUserInfo] = useState([]);
  const [likedList, setLikedList] = useState([]);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValueMob, setMinValueMob] = useState(0);
  const [maxValueMob, setMaxValueMob] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const profilesPerPage = 9;
  const pagesVisited = pageNumber * profilesPerPage;

  const pageCount = Math.ceil(
    allBiodata?.filter((item) => {
      if (
        (!genderFilter ||
          item.gender.toLowerCase().toLocaleString() ===
            genderFilter.toLowerCase().toLocaleString()) &&
        (!jobFilter ||
          item.occupation
            .toLocaleString()
            .includes(jobFilter.toLocaleString())) &&
        item.id.toLocaleString().includes(searchFilter) &&
        (!majhubFilter ||
          item.mazhub
            .toLocaleString()
            .includes(majhubFilter.toLocaleString())) &&
        (!maritialFilter ||
          item.mstatus.toLocaleString() === maritialFilter.toLocaleString()) &&
        (!division ||
          item.district.toLocaleString() === division.toLocaleString()) &&
        (calcAge(item.dob) === minValue || calcAge(item.dob) > minValue) &&
        (calcAge(item.dob) === maxValue || calcAge(item.dob) < maxValue)
      ) {
        return item;
      }
    }).length / profilesPerPage
  );

  const location = useLocation();

  const {
    homeGenderFilter,
    homeMaritialFilter,
    homeDistrictFilter,
    homeDivision,
  } = location.state || {};

  function favusersub(id) {
    const data = new FormData();
    let token = localStorage.getItem("token");
    data.append("token", token);
    data.append("favuser", id);
    fetch(`${import.meta.env.VITE_SERVER}/addlike`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  const getLikedList = () => {
    let token = localStorage.getItem("token");

    const data = new FormData();

    data.append("token", token);

    fetch(`${import.meta.env.VITE_SERVER}/getlikedList`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLikedList(res.message);
      })
      .catch((err) => console.log(err));
  };

  const handlerPageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getLikedList();
    setGenderFilter(homeGenderFilter);
    setMaritialFilter(homeMaritialFilter);
    setDistrictFilter(homeDistrictFilter);
    setDivision(homeDivision || "");

    return () => {
      setGenderFilter("");
      setMaritialFilter("");
    };
  }, []);

  console.log(minValue, maxValue);

  return (
    <>
      {/* Filters */}
      <div className="row header-content pt-2">
        <div className="col-lg-12">
          <div className="mobc">
            <div className="row">
              <div className="col-9 d-flex justify-content-between">
                <div className="col-8">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text border-0 searchbtn_icon"
                        id="inputGroup-sizing"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                    </div>

                    <input
                      type="text"
                      className="form-control  selectmainss"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing"
                      placeholder="বায়োডাটা নং"
                      onChange={(e) => {
                        setSearchFilter(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-4 ps-2">
                  <select
                    className="form-select text-secondary selectmain "
                    aria-label="Default example"
                  >
                    <option selected value="1">
                      নতুন
                    </option>
                    <option value="2"> পুরাতন</option>
                  </select>
                </div>
              </div>
              <div className="col-3 ps-1">
                <button
                  class="btn w-100 selectmain rounded "
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <p className="font-lal text-secondary font-12 mb-0">
                    ফিল্টার
                    <span>
                      <i class="fa-solid fa-filter ms-2"></i>
                    </span>
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div
            class="offcanvas mobc w-50 offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div class="offcanvas-body">
              <div className="">
                <div className="col-lg-2 col-12 py-2">
                  <p className="mb-2 font-16 font-lal fw-400 text-c2">
                    বায়োডাটার ধরন
                  </p>
                  <select
                    className="form-select selectmain font-hind"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setGenderFilter(e.target.value);
                    }}
                    value={genderFilter}
                  >
                    <option value="">সকল</option>
                    <option value="male">ছেলের বায়োডাটা</option>
                    <option value="female">মেয়ের বায়োডাটা</option>
                  </select>
                </div>
                <div className="col-lg-2 col-12 py-2">
                  <p className="mb-2 font-16 font-lal fw-400 text-c2">বয়স</p>
                  <MultiRangeSlider
                    min={18}
                    max={60}
                    minValue={18}
                    ruler={false}
                    label={false}
                    step={1}
                    style={{ border: "none", boxShadow: "none" }}
                    className=" py-1 pb-2 "
                    onInput={(e) => {
                      setMinValueMob(e.minValue);
                      setMaxValueMob(e.maxValue);
                    }}
                    onChange={(e) => {
                      setMinValueMob(e.minValue);
                      setMaxValueMob(e.maxValue);
                    }}
                  ></MultiRangeSlider>
                </div>
                <div className="col-lg-2 col-12 py-2">
                  <p className="mb-2 font-16 font-lal fw-400 text-c2">
                    মাজহাব / মানহাজ
                  </p>
                  <select
                    className="form-select selectmain font-hind"
                    aria-label="Default select example"
                    value={majhubFilter}
                    onChange={(e) => {
                      setMajhubFilter(e.target.value);
                    }}
                  >
                    <option value={""}>সকল</option>
                    <option>হানাফী</option>
                    <option>তাবলীগি</option>
                    <option>সালাফী</option>
                    <option>আহলে হাদীস</option>
                    <option>সুন্নী</option>
                  </select>
                </div>
                <div className="col-lg-2 col-12 py-2">
                  <p className="mb-2 font-16 font-lal fw-400 text-c2">পেশা</p>
                  <select
                    className="form-select selectmain font-hind"
                    aria-label="Default select example"
                    value={jobFilter}
                    onChange={(e) => {
                      setJobFilter(e.target.value);
                    }}
                  >
                    <option selected value={""}>
                      সকল
                    </option>
                    <option>শিক্ষক </option>
                    <option>ব্যাবসায়ী</option>
                    <option>বেসরকারী চাকুরীজীবী</option>
                    <option>সরকারি চাকুরীজীবী</option>
                    <option>ইঞ্জিনিয়ার</option>
                    <option>ডাক্তার</option>
                    <option>ফ্রিল্যান্সার</option>
                    <option>কৃষিকাজ</option>
                    <option>শিক্ষার্থী</option>
                  </select>
                </div>
                <div className="col-lg-2 col-12 py-2">
                  <p className="mb-2 font-16 font-lal fw-400 text-c2">
                    বৈবাহিক অবস্থা
                  </p>
                  <select
                    className="form-select selectmain font-hind"
                    aria-label="Default select example"
                    value={maritialFilter}
                    onChange={(e) => {
                      setMaritialFilter(e.target.value);
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

                <div className="col-lg-2 col-12 py-2">
                  <p className="mb-2 font-16 font-lal fw-400 text-c2">জেলা</p>
                  <select
                    value={division}
                    className="form-select selectmain font-hind"
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
                      value={division}
                      className="form-select selectmain"
                      onChange={(e) => {
                        setDivision(e.target.value);
                      }}
                    >
                      <option value={""}>পুরো দেশ</option>
                      <option>চট্টগ্রাম</option>
                      <option>ঢাকা</option>
                      <option>সিলেট</option>
                    </select>
                  </>
                )}
                {division !== "" && (
                  <select
                    value={districtFilter}
                    className=" form-select selectmain"
                    onChange={(e) => {
                      setDistrictFilter(e.target.value);
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
              </div>
            </div>
          </div>

          {/* Desktop Section */}

          <div className="filter-section2 p-lg-2 moboff">
            <div className="d-flex justify-content-between">
              <div className="col-lg-2  col-12 px-2">
                <p className="mb-2 font-16 font-lal fw-400 text-c2">
                  বায়োডাটার ধরন
                </p>
                <select
                  className="form-select selectmain font-hind"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setGenderFilter(e.target.value);
                  }}
                  value={genderFilter}
                >
                  <option value="">সকল</option>
                  <option value="male">ছেলের বায়োডাটা</option>
                  <option value="female">মেয়ের বায়োডাটা</option>
                </select>
              </div>
              <div className="col-lg-2  col-12 px-2">
                <p className="mb-2 font-16 font-lal fw-400 text-c2">বয়স</p>
                <MultiRangeSlider
                  min={18}
                  max={60}
                  minValue={18}
                  ruler={false}
                  label={false}
                  step={1}
                  style={{ border: "none", boxShadow: "none" }}
                  className="pt-3 pb-0"
                  onInput={(e) => {
                    setMinValue(e.minValue);
                    setMaxValue(e.maxValue);
                  }}
                  onChange={(e) => {
                    setMinValue(e.minValue);
                    setMaxValue(e.maxValue);
                  }}
                ></MultiRangeSlider>
              </div>
              <div className="col-lg-2  col-12 px-2">
                <p className="mb-2 font-16 font-lal fw-400 text-c2">
                  মাজহাব / মানহাজ
                </p>
                <select
                  className="form-select selectmain font-hind"
                  aria-label="Default select example"
                  value={majhubFilter}
                  onChange={(e) => {
                    setMajhubFilter(e.target.value);
                  }}
                >
                  <option value={""}>সকল</option>
                  <option>হানাফী</option>
                  <option>তাবলীগি</option>
                  <option>সালাফী</option>
                  <option>আহলে হাদীস</option>
                  <option>সুন্নী</option>
                </select>
              </div>
              <div className="col-lg-2  col-12 px-2">
                <p className="mb-2 font-16 font-lal fw-400 text-c2">পেশা</p>
                <select
                  className="form-select selectmain font-hind"
                  aria-label="Default select example"
                  value={jobFilter}
                  onChange={(e) => {
                    setJobFilter(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    সকল
                  </option>
                  <option>শিক্ষক</option>
                  <option>ব্যবসায়ী</option>
                  <option>বেসরকারী চাকুরীজীবী</option>
                  <option>সরকারী চাকুরীজীবী</option>
                  <option>ডাক্তার</option>
                  <option>ইঞ্জিনিয়ার</option>
                  <option>ফ্রিল্যান্সার</option>
                  <option>কৃষিকাজ</option>
                  <option>শিক্ষার্থী</option>
                  <option>আইনজীবি</option>
                  <option>প্রবাসী</option>
                  <option>ডিজাইনার</option>
                </select>
              </div>
              <div className="col-lg-2  col-12 px-2">
                <p className="mb-2 font-16 font-lal fw-400 text-c2">
                  বৈবাহিক অবস্থা
                </p>
                <select
                  className="form-select selectmain font-hind"
                  aria-label="Default select example"
                  value={maritialFilter}
                  onChange={(e) => {
                    setMaritialFilter(e.target.value);
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

              <div className="col-lg-2  col-12 px-2">
                <p className="mb-2 font-16 font-lal fw-400 text-c2">জেলা</p>
                <select
                  value={division}
                  className="form-select selectmain font-hind"
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
                      value={division}
                      className="form-select selectmain"
                      onChange={(e) => {
                        setDivision(e.target.value);
                      }}
                    >
                      <option value={""}>পুরো দেশ</option>
                      <option>চট্টগ্রাম</option>
                      <option>ঢাকা</option>
                      <option>সিলেট</option>
                    </select>
                  </>
                )}
                {division !== "" && (
                  <select
                    value={districtFilter}
                    className=" form-select selectmain"
                    onChange={(e) => {
                      setDistrictFilter(e.target.value);
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
            </div>
          </div>
        </div>
      </div>

      {/* All Member Cards */}

      <div className="row mb-4 mt-lg-4 mt-5">
        {allBiodata
          ?.filter((item) => {
            if (
              (!genderFilter ||
                item.gender.toLowerCase().toLocaleString() ===
                  genderFilter.toLowerCase().toLocaleString()) &&
              (!jobFilter ||
                item.occupation
                  .toLocaleString()
                  .includes(jobFilter.toLocaleString())) &&
              item.id
                .toLowerCase()
                .toLocaleString()
                .includes(searchFilter.toLowerCase()) &&
              (!majhubFilter ||
                item.mazhub
                  .toLocaleString()
                  .includes(majhubFilter.toLocaleString())) &&
              (!maritialFilter ||
                item.mstatus.toLocaleString() ===
                  maritialFilter.toLocaleString()) &&
              (!division ||
                item.district.toLocaleString() === division.toLocaleString()) &&
              (calcAge(item.dob) === minValue ||
                calcAge(item.dob) > minValue) &&
              (calcAge(item.dob) === maxValue ||
                calcAge(item.dob) < maxValue) &&
              (calcAge(item.dob) === minValueMob ||
                calcAge(item.dob) > minValueMob) &&
              (calcAge(item.dob) === maxValueMob ||
                calcAge(item.dob) < maxValueMob)
            ) {
              return item;
            }
          })
          .slice(pagesVisited, pagesVisited + profilesPerPage)
          .map((bio) => (
            <div className="col-lg-4 col-12 my-5" key={bio.id}>
              <div className="member-card position-relative pt-5 pb-2">
                <div className="d-flex member_main">
                  <div className="text-center">
                    {bio.avater == "" ? (
                      <>
                        {bio.gender == "male" ? (
                          <>
                            <img
                              src={`${import.meta.env.VITE_IMG}` + `4.png`}
                              className="member_img"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={`${import.meta.env.VITE_IMG}` + `1.png`}
                              className="member_img"
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <img
                          src={
                            `${import.meta.env.VITE_IMG}` + bio.avater + `.png`
                          }
                          className="member_img"
                        />
                      </>
                    )}
                  </div>
                  <div className="p-2 meber_id_pos">
                    <div className="d-flex align-items-center">
                      {bio.vstatus === "1" && (
                        <p className="verybatch mb-0">
                          <img src={verified} className="f_icon2 pb-1" />{" "}
                          Verified
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="m-3 px-3 py-2 member_id_no">
                  <p className="mb-0 text-c2 font-16 font-bosonto fw-500">
                    আইডিঃ <span className="fw-bold">{bio.id}</span>
                  </p>
                </div>

                <div className="member_id_no m-3 px-2">
                  <div className="d-flex">
                    <div className="col-lg-4 col-4 border-bottomc border-end">
                      <p className="mb-0 font-15 fw-600 font-hind px-3 py-1">
                        বয়স
                      </p>
                    </div>
                    <div className="col-lg-8 col-8 border-bottomc">
                      <p className="mb-0 font-15 font-lal px-3 py-1">
                        {calcAge(bio.dob).toLocaleString("bn-BD")}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-4 border-bottomc border-end">
                      <p className="mb-0 font-15 fw-600 font-hind px-3 py-1">
                        উচ্চতা
                      </p>
                    </div>
                    <div className="col-lg-8 col-8 border-bottomc">
                      <p className="mb-0 font-15 font-lal px-3 py-1">
                        {bio.height}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-4 border-bottomc border-end">
                      <p className="mb-0 font-15 fw-600 font-hind px-3 py-1">
                        শিক্ষা
                      </p>
                    </div>
                    <div className="col-lg-8 col-8 border-bottomc">
                      <p className="mb-0  font-15 font-lal px-3 py-1">
                        {bio.lasteduinfo}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-4 border-bottomc border-end">
                      <p className="mb-0  font-15 fw-600 font-hind px-3 py-1">
                        পেশা
                      </p>
                    </div>
                    <div className="col-lg-8 col-8 border-bottomc">
                      <p className="mb-0 font-15 font-lal px-3 py-1">
                        {bio.occupation}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-lg-4 col-4 border-end">
                      <p className="mb-0  font-16 fw-600 font-hind px-3 py-1">
                        জেলা
                      </p>
                    </div>
                    <div className="col-lg-8 col-8">
                      <p className="mb-0  font-15 font-lal px-3 py-1">
                        {bio.district}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mx-3 mb-2">
                  {bio.gender == "male" ? (
                    <>
                      <Link
                        className="btn font-16 fw-600 btn-biodata w-100 font-lal text-white"
                        to={`/biodataview/groom/${bio.id}`}
                        target="_blank"
                      >
                        বায়োডাটা দেখুন
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className="btn font-16 fw-600 btn-biodata w-100 font-lal text-white"
                        to={`/biodataview/bride/${bio.id}`}
                        target="_blank"
                      >
                        বায়োডাটা দেখুন
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row mb-4">
        <ReactPaginate
          className="pagination d-flex justify-content-center"
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlerPageClick}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          disabledClassName={"disabled"}
        />
      </div>
    </>
  );
};
