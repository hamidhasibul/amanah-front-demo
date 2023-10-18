import { useEffect, useState } from "react";
export const UeducationW = ({ activestep, setActivestep }) => {
  const [activeid, setActiveid] = useState("");
  const [lasteduinfo, setLasteduinfo] = useState("");
  const [subject, setSubject] = useState("");
  const [institute, setInstitute] = useState("");
  const [occupation, setOccupation] = useState("");
  const [occupationinfo, setOccupationinfo] = useState("");

  function edusubmit() {
    if (activestep) {
      setActivestep("exbioif");
    }
    const data = new FormData();
    data.append("userid", activeid);
    data.append("lasteduinfo", lasteduinfo);
    data.append("subject", subject);
    data.append("institute", institute);
    data.append("occupation", occupation);
    data.append("occupationinfo", occupationinfo);
    fetch(`${import.meta.env.VITE_SERVER}/updateeduinfo`, {
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
        setActiveid(res.eduinfo[0].userid);
        setLasteduinfo(res.eduinfo[0].lasteduinfo);
        setSubject(res.eduinfo[0].subject);
        setInstitute(res.eduinfo[0].institute);
        setOccupation(res.eduinfo[0].occupation);
        setOccupationinfo(res.eduinfo[0].occupationinfo);
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
            শিক্ষা ও পেশা
          </p>
          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                সর্বশেষ শিক্ষাগত যোগ্যতা
              </label>
              <select
                onChange={(e) => {
                  setLasteduinfo(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>{lasteduinfo}</option>
                <option>নিম্নমাধ্যমিক</option>
                <option>এসএসসি/দাখিল</option>
                <option>এইচএসসি/আলিম</option>
                <option>ডিপ্লোমা</option>
                <option>স্নাতক/ফাজিল</option>
                <option>মাস্টার্স/কামিল</option>
                <option>এমফিল</option>
                <option>পিএইচডি</option>
                <option>কাওমী মাদ্রাসা</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                শিক্ষা প্রতিষ্ঠান
              </label>
              <select
                onChange={(e) => {
                  setInstitute(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>{institute}</option>
                {lasteduinfo === "স্নাতক/ফাজিল" && (
                  <>
                    <option>জাতীয় বিশ্ববিদ্যালয়</option>
                    <option>ইসলামী বিশ্ববিদ্যালয়</option>
                    <option>সরকারী বিশ্ববিদ্যালয়</option>
                    <option>প্রাইভেট বিশ্ববিদ্যালয়</option>
                    <option>বিদেশী বিশ্ববিদ্যালয়</option>
                    <option>মেডিকেল কলেজ</option>
                    <option>নার্সিং কলেজ</option>
                  </>
                )}
                {lasteduinfo === "মাস্টার্স/কামিল" && (
                  <>
                    <option>জাতীয় বিশ্ববিদ্যালয়</option>
                    <option>ইসলামী বিশ্ববিদ্যালয়</option>
                    <option>সরকারী বিশ্ববিদ্যালয়</option>
                    <option>প্রাইভেট বিশ্ববিদ্যালয়</option>
                    <option>বিদেশী বিশ্ববিদ্যালয়</option>
                    <option>মেডিকেল কলেজ</option>
                  </>
                )}
                {lasteduinfo === "এমফিল" && (
                  <>
                    <option>জাতীয় বিশ্ববিদ্যালয়</option>
                    <option>ইসলামী বিশ্ববিদ্যালয়</option>
                    <option>সরকারী বিশ্ববিদ্যালয়</option>
                    <option>প্রাইভেট বিশ্ববিদ্যালয়</option>
                    <option>বিদেশী বিশ্ববিদ্যালয়</option>
                    <option>মেডিকেল কলেজ</option>
                  </>
                )}
                {lasteduinfo === "পিএইচডি" && (
                  <>
                    <option>জাতীয় বিশ্ববিদ্যালয়</option>
                    <option>ইসলামী বিশ্ববিদ্যালয়</option>
                    <option>সরকারী বিশ্ববিদ্যালয়</option>
                    <option>প্রাইভেট বিশ্ববিদ্যালয়</option>
                    <option>বিদেশী বিশ্ববিদ্যালয়</option>
                    <option>মেডিকেল কলেজ</option>
                  </>
                )}
                {/* {lasteduinfo === "কাওমী মাদ্রাসা" && (
                  <>
                    <option>জাতীয় বিশ্ববিদ্যালয়</option>
                    <option>ইসলামী বিশ্ববিদ্যালয়</option>
                    <option>সরকারী বিশ্ববিদ্যালয়</option>
                    <option>প্রাইভেট বিশ্ববিদ্যালয়</option>
                    <option>বিদেশী বিশ্ববিদ্যালয়</option>
                    <option>মেডিকেল কলেজ</option>
                  </>
                )} */}
                {lasteduinfo == "ডিপ্লোমা" && (
                  <>
                    <option>পলিটেকনিক </option>
                    <option>ম্যাটস / IHT / ATI</option>
                    <option>নার্সিং কলেজ</option>
                  </>
                )}
              </select>
            </div>
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                বর্তমান পেশা
              </label>
              <select
                onChange={(e) => {
                  setOccupation(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>{occupation}</option>
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
          </div>
          <div className="col-12">
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                শিক্ষাগত বিষয়
              </label>
              <textarea
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                name=""
                class="form-control"
                id=""
                rows="2"
                placeholder="শিক্ষাগত বিষয়.."
                value={subject}
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="weight" class="form-label text-muted font-14">
                পেশার বিস্তারিত বিবরণ
              </label>
              <textarea
                onChange={(e) => {
                  setOccupationinfo(e.target.value);
                }}
                name=""
                class="form-control"
                id=""
                rows="2"
                placeholder="পেশার বিস্তারিত বিবরণ.."
                value={occupationinfo}
              ></textarea>
            </div>
          </div>

          <div className="my-2">
            <button
              type="submit"
              onClick={edusubmit}
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
