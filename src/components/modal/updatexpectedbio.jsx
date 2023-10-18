import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const marrOptions = [
  { value: "বিবাহিত", label: "বিবাহিত" },
  { value: "বিপত্নীক", label: "বিপত্নীক" },
  { value: "বিধবা", label: "বিধবা" },
  { value: "অবিবাহিত", label: "অবিবাহিত" },
  { value: "ডিভোর্সড", label: "ডিভোর্সড" },
];
export const Uexpectedbio = () => {
  const [activeid, setActiveid] = useState("");
  const [mstatus, setMstatus] = useState([]);
  const [exptyears, setExptyears] = useState("");
  const [minheight, setMinheight] = useState("");
  const [exptcolor, setExptcolor] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [district, setDistrict] = useState("");
  const [otherreq, setOtherreq] = useState("");

  function biosubmit() {
    const data = new FormData();
    data.append("userid", activeid);
    data.append(
      "mstatus",
      mstatus.map((item) => {
        return item.value;
      })
    );
    data.append("exptyears", exptyears);
    data.append("minheight", minheight);
    data.append("exptcolor", exptcolor);
    data.append("education", education);
    data.append("occupation", occupation);
    data.append("district", district);
    data.append("otherreq", otherreq);

    fetch(`${import.meta.env.VITE_SERVER}/updatebiodatainfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toast.success("প্রত্যাশিত জীবনসঙ্গী আপডেট করা হয়েছে", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
            icon: false,
          });
        } else {
          toast.error("Error Occured!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
            icon: false,
          });
        }
      })
      .catch((err) => console.log(err));
  }
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
        setActiveid(res.bio[0].userid);
        setMstatus(res.bio[0].mstatus);
        setExptyears(res.bio[0].exptyears);
        setMinheight(res.bio[0].minheight);
        setExptcolor(res.bio[0].exptcolor);
        setEducation(res.bio[0].education);
        setOccupation(res.bio[0].occupation);
        setDistrict(res.bio[0].district);
        setOtherreq(res.bio[0].otherreq);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  return (
    <>
      <div
        class="modal fade animate__animated animate__slideInUp"
        id="exif"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header font-lal">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                প্রত্যাশিত জীবনসঙ্গী
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body row font-lal">
              <div className="col-12">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    বৈবাহিক অবস্থা
                  </label>
                  <Select
                    className="font-hind"
                    defaultValue={mstatus}
                    placeholder={"বৈবাহিক অবস্থা"}
                    onChange={setMstatus}
                    options={marrOptions}
                    isMulti
                  />
                  {/* <select
                    onChange={(e) => {
                      setMstatus(e.target.value);
                    }}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>{mstatus}</option>
                    <option>বিবাহিত</option>
                    <option>বিপত্নীক</option>
                    <option>বিধবা</option>
                    <option>অবিবাহিত</option>
                    <option>ডিভোর্সড</option>
                  </select> */}
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    বয়সসীমা
                  </label>
                  <select
                    onChange={(e) => {
                      setExptyears(e.target.value);
                    }}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>{exptyears}</option>
                    <option>১৮-২০</option>
                    <option>২১-২৫</option>
                    <option>২৬-৩০</option>
                    <option>৩১-৩৫</option>
                    <option>৩৬-৪০</option>
                    <option>৪১-৪৬</option>
                    <option>৪৬-৫০</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    উচ্চতা
                  </label>
                  <select
                    onChange={(e) => {
                      setMinheight(e.target.value);
                    }}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>{minheight}</option>
                    <option>৪'৫" - ৪'১০"</option>
                    <option>৪'১১" - ৫'০"</option>
                    <option>৫'০" - ৫'২"</option>
                    <option>৫'২" - ৫'৪"</option>
                    <option>৫'৪" - ৫'৬"</option>
                    <option>৫'৬" - ৫'৮"</option>
                    <option>৫'৮" - ৬'০"</option>
                    <option>৬'১" - ৬'৫"</option>
                  </select>
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    গায়ের রং
                  </label>
                  <textarea
                    onChange={(e) => {
                      setExptcolor(e.target.value);
                    }}
                    name=""
                    class="form-control"
                    id=""
                    rows="1"
                    placeholder="color"
                    value={exptcolor}
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <textarea
                    onChange={(e) => {
                      setEducation(e.target.value);
                    }}
                    name=""
                    class="form-control"
                    id=""
                    rows="1"
                    placeholder="edu"
                    value={education}
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    পেশা
                  </label>
                  <textarea
                    onChange={(e) => {
                      setOccupation(e.target.value);
                    }}
                    name=""
                    class="form-control"
                    id=""
                    rows="1"
                    placeholder="ocu"
                    value={occupation}
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    জেলা
                  </label>
                  <textarea
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                    name=""
                    class="form-control"
                    id=""
                    rows="1"
                    placeholder="dis"
                    value={district}
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="weight" class="form-label text-muted font-14">
                    অন্যান্য প্রত্যাশা
                  </label>
                  <textarea
                    onChange={(e) => {
                      setOtherreq(e.target.value);
                    }}
                    name=""
                    class="form-control"
                    id=""
                    rows="2"
                    placeholder="other"
                    value={otherreq}
                  ></textarea>
                </div>
              </div>

              <div className="my-2">
                <button
                  type="submit"
                  onClick={biosubmit}
                  class="btn btn-search text-white w-100"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  আপডেট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
