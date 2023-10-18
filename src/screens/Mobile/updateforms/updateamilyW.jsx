import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const UfamilyW = ({ activestep, setActivestep }) => {
  const [activeid, setActiveid] = useState("");
  const [economyType, setEconomyType] = useState("");
  const [fatherinfo, setFatherinfo] = useState("");
  const [motherinfo, setMotherinfo] = useState("");
  const [brotherinfo, setBrotherinfo] = useState("");
  const [sisterinfo, setSisterinfo] = useState("");
  const [uncleinfo, setUncleinfo] = useState("");

  function familysubmit() {
    if (activestep) {
      setActivestep("eif");
    }
    const data = new FormData();
    data.append("userid", activeid);
    data.append("economyType", economyType);
    data.append("fatherinfo", fatherinfo);
    data.append("motherinfo", motherinfo);
    data.append("brotherinfo", brotherinfo);
    data.append("sisterinfo", sisterinfo);
    data.append("uncleinfo", uncleinfo);

    fetch(`${import.meta.env.VITE_SERVER}/updatefamlilyinfo`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
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
        setActiveid(res.familyinfo[0].userid);
        setEconomyType(res.familyinfo[0].economyType);
        setFatherinfo(res.familyinfo[0].fatherinfo);
        setMotherinfo(res.familyinfo[0].motherinfo);
        setBrotherinfo(res.familyinfo[0].brotherinfo);
        setSisterinfo(res.familyinfo[0].sisterinfo);
        setUncleinfo(res.familyinfo[0].uncleinfo);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllInfo();
  }, []);

  return (
    <>
      <div className="container">
        <div class="row font-lal">
          <p className="mobc font-lal font-20 border-bottom fw-600 text-muted">
            পারিবারিক তথ্য
          </p>

          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                অর্থনৈতিক অবস্থা
              </label>
              <select
                onChange={(e) => {
                  setEconomyType(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>{economyType}</option>
                <option>নিম্নবিত্ত </option>
                <option>নিম্নমধ্যবিত্ত </option>
                <option>মধ্যবিত্ত </option>
                <option>উচ্চ মধ্যবিত্ত</option>
                <option>উচ্চবিত্ত</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14">
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
              value={fatherinfo}
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14">
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
              value={motherinfo}
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14">
              ভাইদের শিক্ষাগত যোগ্যতা / পেশা
            </label>
            <textarea
              onChange={(e) => {
                setBrotherinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              value={brotherinfo}
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14">
              বোনদের শিক্ষাগত যোগ্যতা / পেশা
            </label>
            <textarea
              onChange={(e) => {
                setSisterinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              value={sisterinfo}
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label text-muted font-14">
              চাচা মামাদের শিক্ষাগত যোগ্যতা / পেশা
            </label>
            <textarea
              onChange={(e) => {
                setUncleinfo(e.target.value);
              }}
              name=""
              class="form-control"
              id=""
              rows="2"
              value={uncleinfo}
            ></textarea>
          </div>

          <div className="my-2">
            <button
              type="submit"
              onClick={familysubmit}
              class="btn btn-search text-white w-100"
            >
              আপডেট করুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
