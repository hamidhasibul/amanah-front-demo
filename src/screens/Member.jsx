import React, { useEffect, useState } from "react";
// import { Navbar } from "../components/Navbar2";
import { AllMember } from "../components/AllMember";
import { MaleMember } from "../components/MaleMember";
import { FemaleMember } from "../components/FemaleMember";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";

export const Member = () => {
  const [allBiodata, setAllBiodata] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [datasort, setDatasort] = useState("");
  const [homeGenderFilter, setHomeGenderFilter] = useState("");
  const [load, setLoad] = useState(true);
  const [update, setUpdate] = useState([]);

  const getAllBiodata = () => {
    const data = new FormData();
    data.append("sort", datasort);
    fetch(`${import.meta.env.VITE_SERVER}/getAllbiodataTest`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setAllBiodata(res.msg);
        setLoad(false);
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

  useEffect(() => {
    getAllBiodata();
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
          <div className="container ">
            <div className="row pt-lg-4 pt-3 mb-0">
              <div className="col-lg-12">
                <p className="font-22 font-lal fw-600 mb-1">বায়োডাটা সমূহ</p>
              </div>
            </div>

            <div className="member-nav d-flex align-items-center justify-content-between">
              {/* Navigation Tabs */}
              <div className="moboff">
                <ul className="nav nav-tab" id="pills-tab" role="tablist">
                  <li className="nav-item pill-1" role="presentation">
                    <a
                      className="nav-link active fw-500 font-hind ps-0"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      সকল বায়োডাটা
                    </a>
                  </li>
                  <li className="nav-item pill-1" role="presentation">
                    <a
                      className="nav-link fw-500 font-hind"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      পাত্রের বায়োডাটা
                    </a>
                  </li>
                  <li className="nav-item pill-1" role="presentation">
                    <a
                      className="nav-link fw-500 font-hind"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      পাত্রীর বায়োডাটা
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                {/* Upper Filter */}

                <div className="d-flex justify-content-between">
                  <div className="col-lg-8 moboff">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text border-0 py-2 searchbtn_icon"
                          id="inputGroup-sizing"
                        >
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>

                      <input
                        type="text"
                        className="form-control selectmainss"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing"
                        placeholder="বায়োডাটা নং"
                        onChange={(e) => {
                          setSearchFilter(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 ps-3 moboff">
                    <select
                      className="form-select selectmain border"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setDatasort(e.target.value);
                      }}
                    >
                      <option selected value="DESC">
                        নতুন
                      </option>
                      <option value="ASC"> পুরাতন</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mobc align-items-center justify-content-between">
              {/* Navigation Tabs */}

              <ul
                className="nav nav-tab mobc d-flex col-12 member-nav2"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item pill-1" role="presentation">
                  <a
                    className="nav-link active fw-500 font-hind ps-0"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    style={{ fontSize: 13 }}
                  >
                    সকল বায়োডাটা
                  </a>
                </li>
                <li className="nav-item pill-1" role="presentation">
                  <a
                    className="nav-link fw-500 font-hind"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    style={{ fontSize: 13 }}
                  >
                    পাত্রের বায়োডাটা
                  </a>
                </li>
                <li className="nav-item pill-1" role="presentation">
                  <a
                    className="nav-link fw-500 font-hind"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    style={{ fontSize: 13 }}
                  >
                    পাত্রীর বায়োডাটা
                  </a>
                </li>
              </ul>
              <div>{/* Upper Filter */}</div>
            </div>
            {/* Tabs */}

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex="0"
              >
                <AllMember
                  allBiodata={allBiodata}
                  calcAge={calcAge}
                  searchFilter={searchFilter}
                />
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex="0"
              >
                <MaleMember
                  allBiodata={allBiodata}
                  calcAge={calcAge}
                  searchFilter={searchFilter}
                />
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabIndex="0"
              >
                <FemaleMember
                  allBiodata={allBiodata}
                  calcAge={calcAge}
                  searchFilter={searchFilter}
                />
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};
