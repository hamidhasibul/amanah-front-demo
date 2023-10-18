import { useState } from "react";
import Select from "react-select";

const marrOptions = [
  { value: "বিবাহিত", label: "বিবাহিত" },
  { value: "বিপত্নীক", label: "বিপত্নীক" },
  { value: "বিধবা", label: "বিধবা" },
  { value: "অবিবাহিত", label: "অবিবাহিত" },
  { value: "ডিভোর্সড", label: "ডিভোর্সড" },
];

export const Selfbio = ({ activestep, setActivestep }) => {
  const [mstatus, setMstatus] = useState([]);
  const [exptyears, setExptyears] = useState("");
  const [minheight, setMinheight] = useState("");
  const [exptcolor, setExptcolor] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [district, setDistrict] = useState("");
  const [otherreq, setOtherreq] = useState("");

  const biosubmit = (e) => {
    e.preventDefault();
    if (activestep) {
      setActivestep("conif");
    }

    let token = localStorage.getItem("token");
    const data = new FormData();
    data.append("token", token);
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

    fetch(`${import.meta.env.VITE_SERVER}/addbiodatainfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          document.getElementById("pills-con-tab").click();
          toast.success("Saved", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        } else {
          toast.success("Something is wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <form className="row" onSubmit={biosubmit}>
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            প্রত্যাশিত জীবনসঙ্গী
          </p>
          <div className="col-lg-4 col-12">
            <div class="mb-3 font-hind">
              <label for="weight" class="form-label text-muted font-14 m-0">
                বৈবাহিক অবস্থা
              </label>
              <Select
                placeholder={"বৈবাহিক অবস্থা"}
                onChange={setMstatus}
                options={marrOptions}
                isMulti
                className="font-hind"
              />
              {/* <select
                onChange={(e) => {
                  setMstatus(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বৈবাহিক অবস্থা
                </option>
                <option>বিবাহিত</option>
                <option>বিপত্নীক</option>
                <option>বিধবা</option>
                <option>অবিবাহিত</option>
                <option>ডিভোর্সড</option>
              </select> */}
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
                বয়সসীমা
              </label>
              <select
                onChange={(e) => {
                  setExptyears(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বাছাই করুন
                </option>
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
          <div className="col-lg-4 col-6">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
                উচ্চতা
              </label>
              <select
                onChange={(e) => {
                  setMinheight(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বাছাই করুন
                </option>
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
          <div className="col-lg-12 col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
                গায়ের রং
              </label>
              <input
                onChange={(e) => {
                  setExptcolor(e.target.value);
                }}
                name=""
                class="form-control control-size py-1"
                id=""
                rows="1"
                placeholder="গায়ের রং"
                required
              ></input>
            </div>
          </div>
          <div className="col-lg-12 col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
                শিক্ষাগত যোগ্যতা
              </label>
              <textarea
                onChange={(e) => {
                  setEducation(e.target.value);
                }}
                name=""
                class="form-control"
                id=""
                rows="2"
                placeholder="শিক্ষাগত যোগ্যতা"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-lg-12 col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
                পেশা
              </label>
              <textarea
                onChange={(e) => {
                  setOccupation(e.target.value);
                }}
                name=""
                class="form-control"
                id=""
                rows="2"
                placeholder="বিস্তারিত লিখুন"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-lg-12 col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
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
                placeholder="জেলা"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 m-0">
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
                placeholder="বিস্তারিত লিখুন"
                required
              ></textarea>
            </div>
          </div>

          <div className="col-lg-3 col-4 offset-lg-9 offset-8">
            <button type="submit" class="btn btn-search text-white w-100">
              পরবর্তী
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
