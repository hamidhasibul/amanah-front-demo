import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Family = ({ activestep, setActivestep }) => {
  const [economyType, setEconomyType] = useState("");
  const [fatherinfo, setFatherinfo] = useState("");
  const [motherinfo, setMotherinfo] = useState("");
  const [brotherinfo, setBrotherinfo] = useState("");
  const [sisterinfo, setSisterinfo] = useState("");
  const [uncleinfo, setUncleinfo] = useState("");

  const familysubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (activestep) {
      setActivestep("eif");
    }

    const data = new FormData();

    data.append("token", token);
    data.append("economyType", economyType);
    data.append("fatherinfo", fatherinfo);
    data.append("motherinfo", motherinfo);
    data.append("brotherinfo", brotherinfo);
    data.append("sisterinfo", sisterinfo);
    data.append("uncleinfo", uncleinfo);

    fetch(`${import.meta.env.VITE_SERVER}/addfamlilyinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          document.getElementById("pills-edu-tab").click();
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
        <form className="row" onSubmit={familysubmit}>
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            পারিবারিক তথ্য
          </p>

          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14 ">
                অর্থনৈতিক অবস্থা
              </label>
              <select
                onChange={(e) => {
                  setEconomyType(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
                required
              >
                <option selected disabled value="">
                  বাছাই করুন
                </option>
                <option>নিম্নবিত্ত </option>
                <option>নিম্নমধ্যবিত্ত </option>
                <option>মধ্যবিত্ত </option>
                <option>উচ্চ মধ্যবিত্ত</option>
                <option>উচ্চবিত্ত</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14 " required>
              পিতার পেশা
            </label>
            <textarea
              onChange={(e) => {
                setFatherinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14 " required>
              মায়ের পেশা
            </label>
            <textarea
              onChange={(e) => {
                setMotherinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label
              for="weight"
              class="form-label text-muted font-14 float-start"
              required
            >
              ভাইদের শিক্ষাগত যোগ্যতা / পেশা
            </label>
            <div class="dropdown float-end">
              <button
                class="btn border-0 p-0 mx-2 font-12 text-primary "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-circle-question me-1"></i>উদাহরণ দেখুন
              </button>
              <div
                style={{ color: "#333", width: "18rem", paddingTop: "5px" }}
                className="font-12 text-wrap dropdown-menu shadow border-primary text-muted p-2"
              >
                বড় ভাই: মাস্টার্স, কলেজ শিক্ষক{" "}
                <br style={{ lineHeight: "40vh" }} />
                মেঝ ভাই: এইচএসসি পরীক্ষার্থী{" "}
                <br style={{ lineHeight: "40vh" }} />
                ছোট ভাই: নবম শ্রেনী, ক্যাডেট কলেজ
              </div>
            </div>
            <textarea
              onChange={(e) => {
                setBrotherinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              required
              placeholder=""
            ></textarea>
          </div>
          <div class="mb-3">
            <label
              for="weight"
              class="form-label text-muted font-14  float-start"
              required
            >
              বোনদের শিক্ষাগত যোগ্যতা / পেশা
            </label>
            <div class="dropdown float-end">
              <button
                class="btn border-0 p-0 mx-2 font-12 text-primary "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-circle-question me-1"></i>উদাহরণ দেখুন
              </button>
              <div
                style={{ color: "#333", width: "18rem", paddingTop: "5px" }}
                className="font-12 text-wrap dropdown-menu shadow border-primary text-muted p-2"
              >
                বড় বোন: মাস্টার্স, গৃহীনি <br style={{ lineHeight: "40vh" }} />
                মেঝ বোন: এইচএসসি পরীক্ষার্থী{" "}
                <br style={{ lineHeight: "40vh" }} />
                ছোট বোন: দাখিল শিক্ষার্থী
              </div>
            </div>
            <textarea
              onChange={(e) => {
                setSisterinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label
              for="weight"
              class="form-label text-muted font-14 float-start"
              required
            >
              চাচা মামাদের শিক্ষাগত যোগ্যতা / পেশা
            </label>{" "}
            <div class="dropdown float-end">
              <button
                class="btn border-0 p-0 mx-2 font-12 text-primary "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa-solid fa-circle-question me-1"></i>উদাহরণ দেখুন
              </button>
              <div
                style={{ color: "#333", width: "18rem", paddingTop: "5px" }}
                className="font-12 text-wrap dropdown-menu shadow border-primary text-muted p-2"
              >
                চাচা ১: জিএম, সরকারি কোম্পানি{" "}
                <br style={{ lineHeight: "40vh" }} />
                চাচা ২: অফিসার, নৌবাহিনী <br style={{ lineHeight: "40vh" }} />
                মামা ১: কামিল, মাদ্রাসা শিক্ষক
                <br style={{ lineHeight: "40vh" }} />
                মামা ২: মুফতি, মসজিদের ইমাম
              </div>
            </div>
            <textarea
              onChange={(e) => {
                setUncleinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              required
            ></textarea>
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
